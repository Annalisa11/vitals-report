const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config');

const signToken = (payload, expiresIn = '1h') => {
  return jwt.sign(payload, JWT_SECRET, { expiresIn });
};

const sendError = (res, error, message = 'An error occurred', status = 500) => {
  console.error(message, error);
  res.status(status).send(message);
};

const getGlucoseRanges = (data) => {
  const totalEntries = data.length;
  const inRange = data.filter(
    (d) => d.ValueInMgPerDl >= 70 && d.ValueInMgPerDl <= 180
  ).length;
  const belowRange = data.filter((d) => d.ValueInMgPerDl < 70).length;
  const aboveRange = data.filter((d) => d.ValueInMgPerDl > 180).length;
  const ranges = [
    { name: 'In Range', value: (inRange / totalEntries) * 100 },
    { name: 'Below Range', value: (belowRange / totalEntries) * 100 },
    { name: 'Above Range', value: (aboveRange / totalEntries) * 100 },
  ];

  return {
    ranges: ranges,
    emoji: getEmoji(ranges),
  };
};

const getEmoji = (data) => {
  if (data[0].value > 97) {
    return 0;
  } else if (data[0].value > 85) {
    return 1;
  } else if (data[0].value > 70) {
    return 2;
  } else if (data[0].value > 55) {
    return 3;
  } else {
    return 4;
  }
};

function getGuessFeedback(guessedValue, realValue) {
  const difference = Math.abs(guessedValue - realValue);
  let feedback = '';

  if (difference === 0) {
    feedback = '🏆 Exact Match!'; // Exact match
  } else if (difference <= 2) {
    feedback = '🔥🔥🔥🔥'; // Very close
  } else if (difference <= 5) {
    feedback = '🔥🔥🔥'; // Close
  } else if (difference <= 10) {
    feedback = '🔥🔥'; // Not too far
  } else if (difference <= 20) {
    feedback = '🔥'; // Not too far
  } else if (difference <= 30) {
    feedback = '❄️'; // Not too far
  } else if (difference <= 60) {
    feedback = '❄️❄️'; // Not too far
  } else {
    feedback = '❄️❄️❄️❄️'; // Far
  }

  return feedback;
}

module.exports = {
  signToken,
  sendError,
  getGlucoseRanges,
  getGuessFeedback,
};
