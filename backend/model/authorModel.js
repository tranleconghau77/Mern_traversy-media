const mongoose = require("mongoose");

const authorSchema = new mongoose.Schema(
  {
    id_author: { type: mongoose.Types.ObjectId },
    books: [{ type: mongoose.Schema.Types.ObjectId, ref: "Book" }],

    name_author: {
      type: String,
      required: [true, "Please type name of author"],
    },

    country: { type: String, required: [true, "Please type name of author"] },
  },
  { timestamps: true }
);

const Author = mongoose.model("Author", authorSchema);

module.exports = Author;
