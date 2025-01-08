const mongoose = require('mongoose');
const { MONGODB_URI } = require('./config');

const connectDB = async () => {
  try {
    await mongoose
      .connect(MONGODB_URI)
      .then(() => console.log('database connected!'));
  } catch (e) {
    console.error('Error connecting database: ', e);
  }
};

module.exports = connectDB;
