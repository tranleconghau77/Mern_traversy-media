const express = require("express");
const {
  getBooks,
  deleteBook,
  updateBook,
  postBook,
} = require("../controllers/bookController");

const bookRoute = express.Router();

bookRoute.get("/books", getBooks);

bookRoute.post("/book", postBook);

bookRoute.delete("/book/:id", deleteBook);

bookRoute.put("/book/:id", updateBook);

module.exports = bookRoute;
