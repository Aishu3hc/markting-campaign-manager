const mongoose = require("mongoose");

const campaignSchema = new mongoose.Schema({
  name: String,
  startDate: String,
  endDate: String,
  status: String,
  platform: String,
  budget: Number
});

const Campaign = mongoose.model("Campaign", campaignSchema);
module.exports = Campaign;
