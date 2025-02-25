const nodemailer = require('nodemailer');
const {
  EMAIL_USER,
  EMAIL_PASSWORD,
  EMAIL_SERVICE,
  APP_PASSWORD,
} = require('../config');

const transporter = nodemailer.createTransport({
  service: EMAIL_SERVICE,
  auth: {
    user: EMAIL_USER,
    pass: EMAIL_SERVICE === 'gmail' ? APP_PASSWORD : EMAIL_PASSWORD,
  },
});

const sendEmail = (options, res) => {
  transporter.sendMail(options, (error, info) => {
    if (error) {
      return res.status(500).send(`Error sending email: ${error.toString()}`);
    }
    res.send(`Email sent: ${info.response}`);
  });
};

module.exports = {
  sendEmail,
};
