const axios = require('axios');
const {
  sendError,
  getGlucoseRanges,
  getGuessFeedback,
} = require('../utils/misc.js');
const { logInfo, logError, logSuccess } = require('../logger.js');
const dummyData = require('../dummyData');
const fakeData = require('../fakeData.json');
const OpenAI = require('openai');
const { OPENAI_API_KEY, API_URL, USE_DUMMY_DATA, store } = require('../config');
const systemValuesService = require('../services/systemValuesService.js');

const openai = new OpenAI({ apiKey: OPENAI_API_KEY });

const getVitals = async (req, res) => {
  logInfo('Fetching vitals...');
  const guesses = await systemValuesService.getGuesses();

  if (USE_DUMMY_DATA === true) {
    logSuccess('Using dummy data for vitals.');
    return res.send({ ...dummyData.vitals, guesses });
  }

  try {
    const response = await axios.get(`${API_URL}/cgm?type=current`);
    logSuccess('Fetched vitals from API.');
    res.send({ ...response.data, guesses });
  } catch (error) {
    logError('Error fetching vitals from API.');
    sendError(res, error, 'Error fetching vitals');
  }
};

const getHistory = async (req, res) => {
  logInfo('Fetching glucose history...');

  if (USE_DUMMY_DATA === true) {
    logSuccess('Using dummy data for history.');
    return res.send(fakeData.history[0]);
  }

  try {
    const response = await axios.get(`${API_URL}/cgm?type=graph`);
    store.set('history', response.data);
    logSuccess('Fetched glucose history from API.');
    res.send(response.data);
  } catch (error) {
    logError('Error fetching glucose history.');
    sendError(res, error, 'Error fetching history');
  }
};

const getGlucoseScore = (req, res) => {
  logInfo('Calculating glucose score...');

  if (USE_DUMMY_DATA === true) {
    logSuccess('Using dummy data for glucose score.');
    const response = getGlucoseRanges(fakeData.history[0]);
    return res.send(response);
  }

  try {
    const history = store.get('history');
    const response = getGlucoseRanges(history);
    logSuccess('Calculated glucose score successfully.');
    res.send(response);
  } catch (error) {
    logError('Error fetching glucose score.');
    sendError(res, error, 'Error fetching glucose score');
  }
};

const openAi = async (req, res) => {
  logInfo('Fetching AI response...');

  if (USE_DUMMY_DATA === true) {
    logSuccess('Using dummy data for AI response.');
    return res.send(dummyData.openai);
  }

  try {
    const { prompt } = req.body;
    const completion = await openai.chat.completions.create({
      messages: [{ role: 'system', content: prompt }],
      model: 'gpt-3.5-turbo-1106',
      temperature: 1.5,
    });

    const message = completion.choices[0]?.message?.content || '';
    logSuccess('AI response fetched successfully.');
    res.send({ message });
  } catch (error) {
    logError('Error fetching AI response.');
    sendError(res, error, 'Error fetching AI completion');
  }
};

const guess = async (req, res) => {
  logInfo('Processing user guess...');

  if (USE_DUMMY_DATA === true) {
    logSuccess('Using dummy data for guess feedback.');
    const { value } = req.body;
    const realValue = dummyData.vitals.Value;
    const message = getGuessFeedback(value, realValue);
    return res.send(message);
  }

  try {
    const { value } = req.body;
    const response = await axios.get(`${API_URL}/cgm?type=current`);
    const realValue = response.data.Value;
    const message = getGuessFeedback(value, realValue);

    logSuccess('Processed user guess successfully.');
    res.send(message);
  } catch (error) {
    logError('Error processing user guess.');
    sendError(res, error, 'Error while checking guess');
  }
};

const getGuesses = async (req, res) => {
  try {
    logInfo('Getting stored guesses number...');

    const guesses = await systemValuesService.getGuesses();
    return res.send({ value: guesses });
  } catch (e) {
    logError('Error getting stored guesses.', e);
  }
};

const setGuessesNumber = async (req, res) => {
  logInfo('Updating guesses number...');
  await systemValuesService.saveGuesses(req.body.guesses);
  logSuccess(`Guesses number updated to: ${req.body.guesses}`);
  res.sendStatus(200);
};

module.exports = {
  getVitals,
  getHistory,
  getGlucoseScore,
  openAi,
  guess,
  setGuessesNumber,
  getGuesses,
};
