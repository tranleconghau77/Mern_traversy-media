const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema(
  {
    name_category: {
      unique: true,
      type: String,
      required: [true, "Please type name of category"],
    },
  },
  { timestamps: true }
);

const Category = mongoose.model("Category", categorySchema);

module.exports = Category;
