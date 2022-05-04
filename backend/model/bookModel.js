const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema(
  {
    name_book: { type: String, required: [true, "Please type name of book"] },

    author: {
      type: String,
      required: [true, "Please type author name of book"],
    },

    published_date: { type: Date },

    image: { type: String, required: [false, "Please input image of book"] },

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

    vote: {
      type: Number,
      required: [true, "Please type vote of book"],
      min: 0,
    },
  },
  { timestamps: true }
);
const Book = mongoose.model("Book", bookSchema);

module.exports = Book;
