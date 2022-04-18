const mongoose = require("mongoose");

const categorySchema = mongoose.Schema({
  name: {
    unique: true,
    type: String,
    required: [true, "Please type name of category"],
  },
});

const Category = mongoose.model("Category", categorySchema);

module.exports = Category;
