const express = require("express");
const {
  getBooks,
  deleteBook,
  updateBook,
  postBook,
} = require("../controllers/bookController");

const bookRoute = express.Router();

bookRoute.get("/books", getBooks);

bookRoute.post("/books", postBook);

bookRoute.delete("/books/:id", deleteBook);

bookRoute.put("/books/:id", updateBook);

module.exports = bookRoute;
