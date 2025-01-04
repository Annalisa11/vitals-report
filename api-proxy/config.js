require('dotenv').config();

const store = require('data-store')({ path: `${process.cwd()}/store.json` });

module.exports = {
  // env
  PORT: process.env.PORT || 5000,
  USE_DUMMY_DATA: process.env.USE_DUMMY_DATA === 'true' ?? true,
  JWT_SECRET: process.env.JWT_SECRET,
  EMAIL_SERVICE: process.env.EMAIL_SERVICE,
  EMAIL_USER: process.env.EMAIL_USER,
  EMAIL_PASSWORD: process.env.EMAIL_PASSWORD,
  OPENAI_API_KEY: process.env.OPENAI_API_KEY,
  API_URL: process.env.API_URL,
  FRONTEND_URL: process.env.FRONTEND_URL,

  // other
  store,
};
