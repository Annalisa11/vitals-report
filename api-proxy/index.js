var express = require('express');
var axios = require('axios');
var app = express();
var OpenAI = require('openai');
var cors = require('cors');
require('dotenv').config();

app.use(cors());
app.use(express.json());

var openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

app.get('/vitals', async function (req, res) {
  try {
    const response = await axios.get(process.env.API_URL);
    res.send(response.data);
  } catch (error) {
    console.error(error);
  }
});

app.post('/openai', async function (req, res) {
  try {
    console.log(req.body);
    const completion = await openai.chat.completions.create({
      messages: [{ role: 'system', content: req.body.prompt }],
      model: 'gpt-3.5-turbo-1106',
    });

    const message = completion.choices[0].message.content ?? '';
    res.send({ message: message });
  } catch (error) {
    console.log(error);
    res.send({ error: true });
  }
});

var server = app.listen(5000);
