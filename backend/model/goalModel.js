const mongoose = require("mongoose");

const goalSchema = new mongoose.Schema(
  { text: { type: String, required: true } },
  { timestamps: true }
);
const Goal = mongoose.model("Goal", goalSchema);

module.exports = Goal;
