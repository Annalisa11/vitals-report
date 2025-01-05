require('dotenv').config();
const fs = require('fs');
const path = require('path');
const bcrypt = require('bcryptjs');

const store = require('data-store')({ path: `${process.cwd()}/store.json` });

const createStoreFile = () => {
  const storePath = path.resolve(process.cwd(), 'store.json');

  if (!fs.existsSync(storePath)) {
    fs.writeFileSync(storePath, JSON.stringify({}), 'utf-8');
    console.log('store.json file created');
  }

  const data = store.get();
  if (Object.keys(data).length === 0) {
    const initialUser = {
      username: process.env.INITIAL_USER_USERNAME,
      email: process.env.INITIAL_USER_EMAIL,
      password: bcrypt.hashSync(process.env.INITIAL_USER_PASSWORD, 8),
      rights: ['chart', 'vitals-details', 'create-account'],
    };

    store.union('users', initialUser);
    console.log('Initial user data saved to store.json');
  } else {
    console.log('store.json already contains data');
  }
};

createStoreFile();

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
  APP_PASSWORD: process.env.APP_PASSWORD,

  // other
  store,
};
