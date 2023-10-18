const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const urlSchema = new Schema({
  short: {
    type: String,
    required: true,
    unique: true,
  },
  long: {
    type: String,
    required: true,
    unique: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Url', urlSchema);
