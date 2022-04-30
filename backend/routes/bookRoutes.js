const express = require("express");

const { verifyAccessToken } = require("../helpers/jwt_services");

const {
  postFilterBooks,
  getAllBooks,
  getBook,
  deleteBook,
  updateBook,
  getAuthors,
  postBook,
  getCategories,
} = require("../controllers/bookController");

const bookRoute = express.Router();

bookRoute.get("/book/:id", getBook);

bookRoute.post("/searchbooks", postFilterBooks);

bookRoute.get("/authors", getAuthors);

bookRoute.get("/categories", getCategories);

bookRoute.get("/allbooks", verifyAccessToken, getAllBooks);

bookRoute.post("/book", postBook);

bookRoute.delete("/book/:id", deleteBook);

bookRoute.put("/book/:id", updateBook);

module.exports = bookRoute;
