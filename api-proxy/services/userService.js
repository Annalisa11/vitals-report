const { store } = require('../config');
const { User } = require('../models/User');

const getUserRights = (username) => {
  try {
    const users = store.get('users');
    const user = users.find((user) => user.username === username);

    if (!user) {
      console.log('user not found');
      throw new Error('user not found');
    }

    return user.rights;
  } catch (error) {
    console.error('Error fetching user rights:', error);
  }
};

const createUser = async () => {
  try {
    const newUser = new User({
      username: 'Hyunbin',
      email: 'hyunbin@cute.com',
      password: '$2y$08$B874WKv/or7HPTp41XgvVOC74r2X5RJ5amEsKJTjJhitVrdAQv7eq',
      rights: ['chart', 'vitals-details', 'create-account'],
    });

    await newUser.save();
    console.log('User created:', newUser);
  } catch (error) {
    console.error('Error creating user:', error);
  }
};

module.exports = {
  createUser,
  getUserRights,
};
