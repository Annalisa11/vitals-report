const express = require('express');
const axios = require('axios');
const OpenAI = require('openai');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

app.get('/vitals', async (req, res) => {
  try {
    const response = await axios.get(process.env.API_URL);
    res.send(response.data);
  } catch (error) {
    console.error('Error fetching vitals:', error);
    res.status(500).send('Error fetching vitals');
  }
});

app.post('/openai', async (req, res) => {
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
    res.status(500).send({ error: true });
  }
});

app.listen(PORT, () => {
  console.log(`Api proxy is running on port ${PORT}`);
});
