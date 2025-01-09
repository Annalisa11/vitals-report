const mongoose = require('mongoose');
const { MONGODB_URI } = require('./config');
const c = require('yoctocolors-cjs');

const connectDB = async () => {
  try {
    await mongoose
      .connect(MONGODB_URI)
      .then(() => console.log(c.green('Database connected: ✅')));
  } catch (e) {
    console.error(c.green('Database connected: ❌'), e);
  }
};

module.exports = connectDB;
