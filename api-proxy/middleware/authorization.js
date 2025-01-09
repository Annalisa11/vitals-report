const { getUserRights } = require('../services/userService');
const userService = require('../services/userService');

const checkPermission = (requiredRight) => {
  console.log('check permission');
  return async (req, res, next) => {
    const { adminUser } = req.body;
    const userRights = await userService.getUserRights(adminUser.email);

    if (!userRights || !userRights.includes(requiredRight)) {
      console.log('no user rights');
      return res.status(403).json({ message: 'Forbidden' });
    }

    next();
  };
};

module.exports = { checkPermission };
