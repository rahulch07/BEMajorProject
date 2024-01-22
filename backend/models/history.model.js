// backend/models/user.model.js
const mongoose = require('mongoose');

const historySchema = new mongoose.Schema({
  username: { type: String, required: true },
  pose: {type: String, required: true},
  time: {type: Number},
  date: {type: Date}
});

module.exports = mongoose.model('History', historySchema);