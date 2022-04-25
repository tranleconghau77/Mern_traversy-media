const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

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

userSchema.pre("save", async function (next) {
  try {
    let pass = this.password;
    const salt = await bcrypt.genSaltSync(10);
    const hash = await bcrypt.hashSync(pass, salt);
    this.password = hash;
    next();
  } catch (error) {
    next(error);
  }
});

const User = mongoose.model("User", userSchema);

module.exports = User;
