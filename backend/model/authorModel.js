const mongoose = require("mongoose");

const authorSchema = new mongoose.Schema(
  { books: [{ type: mongoose.Schema.Types.ObjectId, ref: "Book" }] },
  {
    name: { type: String, required: [true, "Please type name of author"] },
  },
  {
    country: { type: String, required: [true, "Please type name of author"] },
  }
);

const Author = mongoose.model("Author", authorSchema);

module.exports = Author;
