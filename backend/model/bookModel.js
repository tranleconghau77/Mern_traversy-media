const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema(
  {
    name: { type: String, required: [true, "Please type name of book"] },

    author: { type: mongoose.Types.ObjectId, ref: "Author" },

    published_date: { type: Date },

    category: { type: mongoose.Schema.Types.ObjectId, ref: "Category" },

    vote: { type: Number, required: true, min: 0 },
  },
  { timestamps: true }
);
const Book = mongoose.model("Book", bookSchema);

module.exports = Book;
