const { store } = require('../config');

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

module.exports = {
  getUserRights,
};
