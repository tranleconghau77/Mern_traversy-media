const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    lowercase: true,
    required: [true, "Please type username"],
  },
  password: {
    type: String,
    required: [true],
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
