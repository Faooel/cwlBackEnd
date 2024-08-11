const mongoose = require('mongoose');

const voteSchema = new mongoose.Schema({
  gmName: String,
  eastVotes: [String],
  westVotes: [String],
  timestamp: { type: Date, default: Date.now }
});

module.exports = mongoose.models.Vote || mongoose.model('Vote', voteSchema);