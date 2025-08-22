const mongoose = require('mongoose');

const campaignSchema = new mongoose.Schema({
  ngo_name: {
    type: String,
    required: true,
    trim: true
  },
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String
  },
  goal_amount: {
    type: Number,
    required: true
  },
  collected_amount: {
    type: Number,
    default: 0
  },
  status: {
    type: String,
    enum: ["active", "closed"],
    default: "active"
  },
  created_at: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.models.Campaign || mongoose.model('Campaign', campaignSchema);