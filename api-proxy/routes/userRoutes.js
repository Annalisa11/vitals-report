const express = require('express');
const {
  getAdminInfo,
  updateUserRights,
  deleteUser,
} = require('../controllers/userController');

const router = express.Router();

router.post('/admin', getAdminInfo);
router.put('/admin/rights/:email', updateUserRights);
router.delete('/admin/:email', deleteUser);

module.exports = router;
