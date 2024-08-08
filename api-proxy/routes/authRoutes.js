const express = require('express');
const {
  createAccount,
  register,
  login,
} = require('../controllers/authController');
const { checkPermission } = require('../middleware/authorization');

const router = express.Router();

router.post(
  '/create-account',
  checkPermission('create-account'),
  createAccount
);
router.post('/register', register);
router.post('/login', login);

module.exports = router;
