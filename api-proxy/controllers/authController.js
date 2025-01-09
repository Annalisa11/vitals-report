const { signToken, sendError } = require('../utils/misc.js');
const { sendEmail } = require('../utils/email.js');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { EMAIL_USER, JWT_SECRET, FRONTEND_URL } = require('../config');
const userService = require('../services/userService.js');
const { logInfo, logError, logSuccess } = require('../logger.js');
const { emailString } = require('../assets/email/registration-email.js');

const createAccount = (req, res) => {
  const { email, rights } = req.body;
  logInfo(`Creating account initiation email for: ${email}`);

  try {
    const token = signToken({ email, rights });
    const mailOptions = {
      from: EMAIL_USER,
      to: email,
      subject: 'Complete your registration',
      html: `Click the link to complete your registration: ${FRONTEND_URL}/register?token=${token}`,
    };

    sendEmail(mailOptions, res);
    logSuccess(`Registration email sent to: ${email}`);
  } catch (error) {
    logError(`Error sending registration email to: ${email}`);
    sendError(res, error, 'Failed to send registration email');
  }
};

const register = async (req, res) => {
  const { token, username, password } = req.body;
  logInfo('Registering new user...');

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    const hashedPassword = bcrypt.hashSync(password, 8);

    const user = {
      email: decoded.email,
      username,
      password: hashedPassword,
      rights: decoded.rights,
    };

    await userService.createUser(user);
    logSuccess(`User registered successfully: ${username} (${decoded.email})`);
    res.send('Registration successful');
  } catch (error) {
    logError('Failed to register user: Invalid or expired token.');
    sendError(res, error, 'Invalid token or token expired');
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  logInfo(`Login attempt for user: ${email}`);

  try {
    const user = await userService.getUser(email);

    if (!user) {
      logError(`Login failed: User not found (${email}).`);
      return res.status(404).send('User not found');
    }

    const passwordIsValid = bcrypt.compareSync(password, user.password);
    if (!passwordIsValid) {
      logError(`Login failed: Invalid password for user (${email}).`);
      return res.status(401).send('Invalid password');
    }

    const token = signToken({ id: user.id, rights: user.rights });
    logSuccess(`User logged in successfully: ${email}`);
    res.send({ token, user: { ...user } });
  } catch (error) {
    logError(`Error during login for user: ${email}`);
    sendError(res, error, 'Login failed');
  }
};

module.exports = {
  createAccount,
  register,
  login,
};
