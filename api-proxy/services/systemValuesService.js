const { SystemValue } = require('../models/SystemValue');

const getGuesses = async () => {
  return await SystemValue.findOne({ name: 'guesses' });
};

const saveGuesses = async (guesses) => {
  const filter = { name: 'guesses' };
  const update = { value: guesses };

  await SystemValue.findOneAndUpdate(filter, update);
};

const systemValuesService = {
  getGuesses,
  saveGuesses,
};

module.exports = systemValuesService;
