const axios = require('axios');
const {
  sendError,
  getGlucoseRanges,
  getGuessFeedback,
} = require('../utils/misc.js');
const dummyData = require('../dummyData');
// { history: History[][] }
const fakeData = require('../fakeData.json');
const OpenAI = require('openai');
const { OPENAI_API_KEY, API_URL, USE_DUMMY_DATA, store } = require('../config');

const openai = new OpenAI({ apiKey: OPENAI_API_KEY });

const getVitals = async (req, res) => {
  console.log('vitals header', req.headers);
  console.log('vitals Origin:', req.headers.origin);

  // TODO: write middleware for dummy data?
  const guesses = store.get('guesses') ?? 5;
  console.log('STORE', guesses);

  console.log('use dummy data', USE_DUMMY_DATA, USE_DUMMY_DATA === true);
  if (USE_DUMMY_DATA === true) {
    console.log('response: ', { ...dummyData.vitals, guesses });
    return res.send({ ...dummyData.vitals, guesses });
  }
  try {
    const response = await axios.get(`${API_URL}/cgm?type=current`);
    res.send({ ...response.data, guesses });
  } catch (error) {
    sendError(res, error, 'Error fetching vitals');
  }
};

const getHistory = async (req, res) => {
  if (USE_DUMMY_DATA === true) {
    return res.send(fakeData.history[0]);
  }
  try {
    const response = await axios.get(`${API_URL}/cgm?type=graph`);
    store.set('history', response.data);
    res.send(response.data);
  } catch (error) {
    sendError(res, error, 'Error fetching history');
  }
};

const getGlucoseScore = (req, res) => {
  console.log('get glucose score');
  if (USE_DUMMY_DATA === true) {
    const response = getGlucoseRanges(fakeData.history[0]);
    return res.send(response);
  }
  try {
    const history = store.get('history');
    const response = getGlucoseRanges(history);
    res.send(response);
  } catch (error) {
    sendError(res, error, `Error fetching glucose score: ${error.message}`);
  }
};

const openAi = async (req, res) => {
  if (USE_DUMMY_DATA === true) {
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
    res.send({ message });
  } catch (error) {
    sendError(res, error, 'Error fetching AI completion');
  }
};

const guess = async (req, res) => {
  try {
    const { value } = req.body;
    const history = store.get('history');
    const realValue = history[history.length - 1].Value;
    const message = getGuessFeedback(value, realValue);

    res.send(message);
  } catch (error) {
    sendError(res, error, 'Error while checking guess');
  }
};

const setGuessesNumber = (req, res) => {
  console.log('set guesses', req.body);
  store.set('guesses', req.body.guesses);
  res.send(200);
};

module.exports = {
  getVitals,
  getHistory,
  getGlucoseScore,
  openAi,
  guess,
  setGuessesNumber,
};
