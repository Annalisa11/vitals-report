const { SystemValue } = require('../models/SystemValue');

const getGuesses = async () => {
  const guesses = await SystemValue.findOne({ name: 'guesses' });
  return guesses.value;
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
