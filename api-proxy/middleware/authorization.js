const { getUserRights } = require('../services/userService');

const checkPermission = (requiredRight) => {
  console.log('check permission');
  return (req, res, next) => {
    const { adminUser } = req.body;
    const userRights = getUserRights(adminUser.username);

    if (!userRights || !userRights.includes(requiredRight)) {
      console.log('no user rights');
      return res.status(403).json({ message: 'Forbidden' });
    }

    next();
  };
};

module.exports = { checkPermission };
