const { store } = require('../config.js');
const { sendError } = require('../utils/misc.js');
const userService = require('../services/userService.js');
const { logInfo, logError, logSuccess } = require('../logger.js');

//TODO: check for permission?
const getAdminInfo = async (req, res) => {
  try {
    logInfo('Fetching admin information...');
    const users = await userService.getAllUsers();
    const guesses = store.get('guesses') ?? 5;

    logSuccess(
      `Admin information retrieved. Total users: ${users.length}, Guesses: ${guesses}`
    );
    res.send({ users, guesses });
  } catch (error) {
    logError('Failed to fetch admin information');
    sendError(res, error, 'Error requesting admin information');
  }
};

const updateUserRights = async (req, res) => {
  try {
    const { email } = req.params;
    const { rights } = req.body;

    logInfo(`Attempting to update rights for user: ${email}...`);
    await userService.updateRights(email, rights);

    logSuccess(`updated rights for user: ${email}. New rights: ${rights}`);
    res.sendStatus(204);
  } catch (error) {
    logError(`Error updating rights for user: ${req.params?.email}`);
    sendError(res, error, 'Error updating user rights');
  }
};

const deleteUser = async (req, res) => {
  try {
    const { email } = req.params;

    logInfo(`Attempting to delete user: ${email}...`);
    await userService.deleteUser(email);

    logSuccess(`deleted user: ${email}`);
    res.sendStatus(204);
  } catch (error) {
    logError(`Error deleting user: ${req.params?.email}`);
    sendError(res, error, 'Error deleting user');
  }
};

module.exports = {
  getAdminInfo,
  updateUserRights,
  deleteUser,
};
