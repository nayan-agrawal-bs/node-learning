const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
  },
  firstname: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    required: true,
  },
  runs: {
    type: Number,
    default: 0,
  },
  iplTeam: {
    type: String,
    default: "No Team",
  },
  wickets: {
    type: Number,
    default: 0,
  },
  matchPlayed: {
    type: Number,
    required: 0,
  },
  strikeRate: {
    type: Number,
    default: 0,
  },
});

module.exports = mongoose.model("Player", UserSchema);
