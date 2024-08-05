const express = require('express');
const axios = require('axios');
const OpenAI = require('openai');
const cors = require('cors');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const nodemailer = require('nodemailer');

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
app.use(bodyParser.json());

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Configure nodemailer
const transporter = nodemailer.createTransport({
  service: 'hotmail',
  auth: {
    user: 'annalisa.comin@hotmail.com',
    pass: process.env.EMAIL_PASSWORD,
  },
});

// Admin creates an account
// rights = string[]
app.post('/create-account', (req, res) => {
  const { email, rights } = req.body;
  const token = jwt.sign({ email, rights }, 'secret-key', { expiresIn: '1h' });

  const mailOptions = {
    from: 'annalisa.comin@hotmail.com',
    to: email,
    subject: 'Complete your registration',
    text: `Click the link to complete your registration: http://localhost:5173/register?token=${token}`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return res.status(500).send(error.toString(), info);
    }
    res.send('Email sent: ' + info.response);
  });
});

// User registers
app.post('/register', (req, res) => {
  const { token, username, password } = req.body;
  try {
    const decoded = jwt.verify(token, 'secret-key');
    const hashedPassword = bcrypt.hashSync(password, 8);

    const user = {
      email: decoded.email,
      username,
      password: hashedPassword,
      rights: decoded.rights,
    };

    store.union('users', user);
    res.send('Registration successful');
  } catch (err) {
    console.log('ERROR', err);
    res.status(500).send('Invalid token or token expired');
  }
});

// User login
app.post('/login', (req, res) => {
  const { username, password } = req.body;
  const users = store.get('users');
  const user = users.filter((user) => user.username === username).pop();

  if (!user) {
    return res.status(404).send('User not found');
  }

  const passwordIsValid = bcrypt.compareSync(password, user.password);
  if (!passwordIsValid) {
    return res.status(401).send('Invalid password');
  }

  const token = jwt.sign({ id: user.id, rights: user.rights }, 'secret-key', {
    expiresIn: '1h',
  });
  console.log('user', user);
  res.send({ token, user: { ...user } });
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

app.post('/guess', async (req, res) => {
  try {
    const { value } = req.body;
    const history = store.get('history');
    const realValue = history[history.length - 1].Value;
    const message = getGuessFeedback(value, realValue);

    res.send(message);
  } catch (error) {
    console.log(error);
    res.status(500).send('Error while guessing');
  }
});

//TODO: check for permission?
app.post('/admin', async (req, res) => {
  try {
    const users = store.get('users');

    res.send(users);
  } catch (error) {
    console.log(error);
    res.status(500).send('Error while requesting admin information');
  }
});

//user: {email: string, username: string, password: string, rights: string[]}

app.put('/admin/rights/:username', async (req, res) => {
  try {
    const username = req.params.username;
    const newRights = req.body.rights;
    const users = store.get('users');

    const filteredUsers = users.filter((user) => user.username === username);
    store.set('users', [...filteredUsers]);
    res.send(usersData);
  } catch (error) {
    console.log(error);
    res.status(500).send('Error while requesting admin information');
  }
});

app.delete('/admin/:username', async (req, res) => {
  try {
    const username = req.params.username;
    const users = store.get('users');

    const filteredUsers = users.filter((user) => user.username !== username);
    store.set('users', [...filteredUsers]);

    res.send(204);
  } catch (error) {
    console.log(error);
    res.status(500).send('Error while deleting user ');
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

function getGuessFeedback(guessedValue, realValue) {
  const difference = Math.abs(guessedValue - realValue);
  let feedback = '';

  if (difference === 0) {
    feedback = '🏆 Exact Match!'; // Exact match
  } else if (difference <= 2) {
    feedback = '🔥🔥🔥🔥'; // Very close
  } else if (difference <= 5) {
    feedback = '🔥🔥🔥'; // Close
  } else if (difference <= 10) {
    feedback = '🔥🔥'; // Not too far
  } else if (difference <= 20) {
    feedback = '🔥'; // Not too far
  } else if (difference <= 30) {
    feedback = '❄️'; // Not too far
  } else if (difference <= 60) {
    feedback = '❄️❄️'; // Not too far
  } else {
    feedback = '❄️❄️❄️❄️'; // Far
  }

  return feedback;
}
