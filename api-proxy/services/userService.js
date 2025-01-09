const { User } = require('../models/User');
const { logInfo } = require('../logger');

const getUserRights = async (email) => {
  const user = await User.findOne({ email });

  if (!user) {
    throw new Error('User not found');
  }

  return user.rights;
};

const createUser = async ({ username, email, password, rights }) => {
  const newUser = new User({
    username,
    email,
    password,
    rights,
  });

  await newUser.save();
};

const deleteUser = async (email) => {
  await User.deleteOne({ email });
};

const getUser = async (email) => {
  const user = await User.findOne({ email }).lean();
  return user;
};

const getAllUsers = async () => {
  const users = await User.find().lean();
  return users;
};

const updateRights = async (email, rights) => {
  const filter = { email };
  const update = { rights };

  await User.findOneAndUpdate(filter, update);
};

const userService = {
  createUser,
  getUserRights,
  deleteUser,
  getAllUsers,
  getUser,
  updateRights,
};

module.exports = userService;
