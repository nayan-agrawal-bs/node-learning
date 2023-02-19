const mongoose = require("mongoose");

const TeamSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
  },
  team_name: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Team", TeamSchema);
