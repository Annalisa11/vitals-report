const { signToken, sendError } = require('../utils/misc.js');
const { sendEmail } = require('../utils/email.js');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { EMAIL_USER, JWT_SECRET, store, FRONTEND_URL } = require('../config');

// the email html template doesn't work very well... will look at it some other time
const { emailString } = require('../assets/email/registration-email.js');

const createAccount = (req, res) => {
  const { email, rights } = req.body;
  const token = signToken({ email, rights });

  const mailOptions = {
    from: EMAIL_USER,
    to: email,
    subject: 'Complete your registration',
    html: `Click the link to complete your registration: http://${FRONTEND_URL}/register?token=${token}`,
  };

  sendEmail(mailOptions, res);
};

const register = (req, res) => {
  const { token, username, password } = req.body;
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    const hashedPassword = bcrypt.hashSync(password, 8);

    const user = {
      email: decoded.email,
      username,
      password: hashedPassword,
      rights: decoded.rights,
    };

    store.union('users', user);
    res.send('Registration successful');
  } catch (err) {
    sendError(res, err, 'Invalid token or token expired');
  }
};

const login = (req, res) => {
  const { username, password } = req.body;
  const users = store.get('users');
  const user = users.find((user) => user.username === username);

  //TODO: think about error codes and messages
  if (!user) {
    return res.status(404).send('User not found');
  }

  const passwordIsValid = bcrypt.compareSync(password, user.password);
  if (!passwordIsValid) {
    return res.status(401).send('Invalid password');
  }

  //TODO: what id??? XD
  const token = signToken({ id: user.id, rights: user.rights });
  res.send({ token, user: { ...user } });
};

module.exports = {
  createAccount,
  register,
  login,
};
