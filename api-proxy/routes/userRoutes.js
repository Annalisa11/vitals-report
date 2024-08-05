const express = require('express');
const {
  getAdminInfo,
  updateUserRights,
  deleteUser,
} = require('../controllers/userController');

const router = express.Router();

router.post('/admin', getAdminInfo);
router.put('/admin/rights/:username', updateUserRights);
router.delete('/admin/:username', deleteUser);

module.exports = router;
