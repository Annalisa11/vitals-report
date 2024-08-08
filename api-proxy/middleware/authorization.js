const { getUserRights } = require('../services/userService');

const checkPermission = (requiredRight) => {
  return (req, res, next) => {
    const { adminUser } = req.body;
    const userRights = getUserRights(adminUser.username);

    if (!userRights.include(requiredRight)) {
      return res.status(403).json({ message: 'Forbidden' });
    }

    next();
  };
};

module.exports = { checkPermission };
