const express = require('express');
const {
  createAccount,
  register,
  login,
} = require('../controllers/authController');

const router = express.Router();

router.post('/create-account', createAccount);
router.post('/register', register);
router.post('/login', login);

module.exports = router;
