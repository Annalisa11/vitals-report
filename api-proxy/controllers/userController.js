const { store } = require('../config.js');
const { sendError } = require('../utils/misc.js');
const userService = require('../services/userService.js');

//TODO: check for permission?
const getAdminInfo = async (req, res) => {
  try {
    const users = await userService.getAllUsers();
    const guesses = store.get('guesses') ?? 5;
    res.send({ users: users, guesses });
  } catch (error) {
    sendError(res, error, 'Error requesting admin information');
  }
};

const updateUserRights = async (req, res) => {
  try {
    const { email } = req.params;
    const { rights } = req.body;

    await userService.updateRights(email, rights);

    // if (!updateUser(username, { rights })) {
    //   return res.status(404).send('User not found');
    // }

    res.sendStatus(204);
  } catch (error) {
    sendError(res, error, 'Error updating user rights');
  }
};

const deleteUser = async (req, res) => {
  try {
    const { email } = req.params;

    await userService.deleteUser(email);

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
