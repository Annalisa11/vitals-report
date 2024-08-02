const express = require('express');
const axios = require('axios');
const OpenAI = require('openai');
const cors = require('cors');
require('dotenv').config();
const store = require('data-store')({ path: process.cwd() + '/store.json' });

const dummyData = require('./dummyData');
// { history: History[][] }
const fakeData = require('./fakeData.json');

const app = express();
const PORT = process.env.PORT || 5000;
const USE_DUMMY_DATA = process.env.USE_DUMMY_DATA === 'true' ?? true;

app.use(cors());
app.use(express.json());

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

app.get('/vitals', async (req, res) => {
  if (USE_DUMMY_DATA === true) {
    res.send(dummyData.vitals);
  } else {
    try {
      const response = await axios.get(
        `${process.env.API_URL}/cgm?type=current`
      );
      res.send(response.data);
    } catch (error) {
      console.error('Error fetching vitals:', error);
      res.status(500).send('Error fetching vitals');
    }
  }
});

app.get('/history', async (req, res) => {
  try {
    const response = await axios.get(`${process.env.API_URL}/cgm?type=graph`);
    store.set({ history: response.data });
    res.send(response.data);
  } catch (error) {
    console.error('Error fetching history:', error);
    res.status(500).send('Error fetching history');
  }
});

app.post('/openai', async (req, res) => {
  if (USE_DUMMY_DATA === true) {
    res.send(dummyData.openai);
  } else {
    try {
      const { prompt } = req.body;
      console.log('Prompt received:', prompt);

      const completion = await openai.chat.completions.create({
        messages: [{ role: 'system', content: prompt }],
        model: 'gpt-3.5-turbo-1106',
        temperature: 1.5,
      });

      const message = completion.choices[0]?.message?.content || '';
      res.send({ message });
    } catch (error) {
      console.error('Error generating completion:', error);
      res.status(500).send('Error fetching ai completion');
    }
  }
});

app.get('/glucose-score', async (req, res) => {
  if (USE_DUMMY_DATA === true) {
    const response = getGlucoseRanges(fakeData.history[0]);
    res.send(response);
  } else {
    try {
      const history = store.get('history');
      const response = getGlucoseRanges(history);
      res.send(response);
    } catch (error) {
      console.error('Error generating glucose score:', error);
      res.status(500).send('Error fetching glucose score:' + error.message);
    }
  }
});

app.listen(PORT, () => {
  console.log(`Api proxy is running on port ${PORT}`);
  console.log(`> Dummy Data in use: ${USE_DUMMY_DATA === true}`);
});

const getGlucoseRanges = (data) => {
  const totalEntries = data.length;
  const inRange = data.filter(
    (d) => d.ValueInMgPerDl >= 70 && d.ValueInMgPerDl <= 180
  ).length;
  const belowRange = data.filter((d) => d.ValueInMgPerDl < 70).length;
  const aboveRange = data.filter((d) => d.ValueInMgPerDl > 180).length;
  const ranges = [
    { name: 'In Range', value: (inRange / totalEntries) * 100 },
    { name: 'Below Range', value: (belowRange / totalEntries) * 100 },
    { name: 'Above Range', value: (aboveRange / totalEntries) * 100 },
  ];

  return {
    ranges: ranges,
    emoji: getEmoji(ranges),
  };
};

const getEmoji = (data) => {
  if (data[0].value > 97) {
    return 0;
  } else if (data[0].value > 85) {
    return 1;
  } else if (data[0].value > 70) {
    return 2;
  } else if (data[0].value > 55) {
    return 3;
  } else {
    return 4;
  }
};
