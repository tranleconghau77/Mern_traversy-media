const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema(
  {
    name_book: { type: String, required: [true, "Please type name of book"] },

    author: { type: String, required: true },

    published_date: { type: Date },

    category: {
      type: String,
      enum: [
        "Arts and Photography",
        "History",
        "Law",
        "Math",
        "Action and Adventure",
        "Classics",
        "Fantasy",
        "Horror",
        "Comic",
        "Diary",
        "Novel",
        "Uncategorized",
      ],
      required: true,
    },

    vote: { type: Number, required: true, min: 0 },
  },
  { timestamps: true }
);
const Book = mongoose.model("Book", bookSchema);

module.exports = Book;
