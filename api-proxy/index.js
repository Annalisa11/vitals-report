const express = require('express');
const cors = require('cors');
const { PORT, USE_DUMMY_DATA, FRONTEND_URL } = require('./config');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const contentRoutes = require('./routes/contentRoutes');

const app = express();

const corsOptions = {
  origin: FRONTEND_URL,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};

app.use(cors(corsOptions));
app.use(express.json());

app.use(authRoutes);
app.use(userRoutes);
app.use(contentRoutes);

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Api proxy is running on port ${PORT}`);
  console.log(`> Dummy Data in use: ${USE_DUMMY_DATA === true}`);
});

module.exports = app;
