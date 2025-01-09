const userService = require('../services/userService');
const { logWarn } = require('../logger');

const checkPermission = (requiredRight) => {
  return async (req, res, next) => {
    const { adminUser } = req.body;
    const userRights = await userService.getUserRights(adminUser.email);

    if (!userRights || !userRights.includes(requiredRight)) {
      logWarn('no user rights');
      return res.status(403).json({ message: 'Forbidden' });
    }

    next();
  };
};

module.exports = { checkPermission };
