const express = require("express");
const isExistAccessToken = require("../middlwares/checkLogin");

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

bookRoute.get("/book/:id", verifyAccessToken, getBook);

bookRoute.post("/searchbooks", verifyAccessToken, postFilterBooks);

bookRoute.get("/authors", verifyAccessToken, getAuthors);

bookRoute.get("/categories", verifyAccessToken, getCategories);

bookRoute.get("/allbooks", verifyAccessToken, getAllBooks);

bookRoute.post("/book", verifyAccessToken, postBook);

bookRoute.delete("/book/:id", verifyAccessToken, deleteBook);

bookRoute.put("/book/:id", verifyAccessToken, updateBook);

module.exports = bookRoute;
