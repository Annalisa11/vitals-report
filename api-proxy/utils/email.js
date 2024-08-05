const nodemailer = require('nodemailer');
const { EMAIL_USER, EMAIL_PASSWORD, EMAIL_SERVICE } = require('../config');

const transporter = nodemailer.createTransport({
  service: 'hotmail',
  auth: {
    user: EMAIL_USER,
    pass: EMAIL_PASSWORD,
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
