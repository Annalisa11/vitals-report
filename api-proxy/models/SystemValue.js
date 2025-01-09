const mongoose = require('mongoose');
const { Schema } = mongoose;

const systemValuesSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  value: {
    type: Number,
    required: true,
  },
});

systemValuesSchema.pre('save', function (next) {
  if (this.name === 'guesses' && this.value === undefined) {
    this.value = 5;
  }
  next();
});

const SystemValue = mongoose.model('SystemValue', systemValuesSchema);

module.exports = { SystemValue };
