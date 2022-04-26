const express = require("express");

const { verifyAccessToken } = require("../helpers/jwt_services");

const {
  getFilterBooks,
  getAllBooks,
  getBook,
  deleteBook,
  updateBook,
  postBook,
} = require("../controllers/bookController");

const bookRoute = express.Router();

bookRoute.get("/book/:id", getBook);

bookRoute.get("/books", getFilterBooks);

bookRoute.get("/allbooks", verifyAccessToken, getAllBooks);

bookRoute.post("/book", postBook);

bookRoute.delete("/book/:id", deleteBook);

bookRoute.put("/book/:id", updateBook);

module.exports = bookRoute;
