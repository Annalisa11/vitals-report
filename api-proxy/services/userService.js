const { User } = require('../models/User');

const getUserRights = async (email) => {
  try {
    const user = await User.findOne({ email });

    if (!user) {
      console.log('user not found');
      throw new Error('user not found');
    }

    return user.rights;
  } catch (error) {
    console.error('Error fetching user rights:', error);
  }
};

const createUser = async ({ username, email, password, rights }) => {
  try {
    const newUser = new User({
      username: username,
      email: email,
      password: password,
      rights: rights,
    });

    await newUser.save();
    console.log('User created:', newUser);
  } catch (error) {
    console.error('Error creating user:', error);
  }
};

const deleteUser = async (email) => {
  await User.deleteOne({ email: email });
};

const getUser = async (email) => {
  return await User.findOne({ email }).lean();
};

const getAllUsers = async () => {
  return await User.find().lean();
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
