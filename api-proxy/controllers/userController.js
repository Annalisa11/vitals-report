const { store } = require('../config.js');
const { sendError } = require('../utils/misc.js');

//TODO: check for permission?
const getAdminInfo = (req, res) => {
  try {
    const users = store.get('users');
    res.send(users);
  } catch (error) {
    sendError(res, error, 'Error requesting admin information');
  }
};

//user: {email: string, username: string, password: string, rights: string[]}

const updateUserRights = (req, res) => {
  try {
    const { username } = req.params;
    const { rights } = req.body;

    const users = store.get('users');

    const index = users.findIndex((user) => user.username === username);
    const user = users[index];
    const userWithNewRights = { ...user, rights: rights };
    users[index] = userWithNewRights;
    store.set('users', [...users]);
    // if (!updateUser(username, { rights })) {
    //   return res.status(404).send('User not found');
    // }

    res.sendStatus(204);
  } catch (error) {
    sendError(res, error, 'Error updating user rights');
  }
};

const deleteUser = (req, res) => {
  try {
    const { username } = req.params;
    const users = store.get('users');

    const filteredUsers = users.filter((user) => user.username !== username);
    store.set('users', filteredUsers);

    res.sendStatus(204);
  } catch (error) {
    sendError(res, error, 'Error deleting user');
  }
};

module.exports = {
  getAdminInfo,
  updateUserRights,
  deleteUser,
};
