const { store } = require('../config.js');

const getUserRights = (username) => {
  const users = store.get('users');
  const user = users.find((user) => user.username === username);

  if (!user) {
    throw new Error('User not found');
  }
  return user.rights;
};

module.exports = {
  getUserRights,
};
