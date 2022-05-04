const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "Please type your name"],
  },
  gmail: {
    type: String,
    lowercase: true,
    required: [true, "Please type username"],
  },
  password: {
    type: String,
    required: [true, "Please type username"],
  },
  role: {
    type: String,
    default: "Basic",
    enum: ["Admin", "Basic"],
    required: [true, "Please choose role"],
  },
});

userSchema.pre("save", async function (next) {
  try {
    bcrypt.genSalt(10, (error, salt) => {
      bcrypt.hash(this.password, salt, (error, hash) => {
        if (error) return error;
        this.password = hash;
        next();
      });
    });
  } catch (error) {
    next(error);
  }
});

userSchema.methods.isCheckPassword = async function (password) {
  try {
    return bcrypt.compareSync(password, this.password);
  } catch (error) {
    console.log(error);
  }
};

const User = mongoose.model("User", userSchema);

module.exports = User;
