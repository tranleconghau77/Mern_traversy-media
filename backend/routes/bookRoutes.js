const express = require("express");
const { authAdmin } = require("../middlwares/authorization");

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

//Only admin accesses function POST, DELETE,PUT

const bookRoute = express.Router();

bookRoute.get("/book/:id", verifyAccessToken, getBook);

bookRoute.post("/searchbooks", verifyAccessToken, postFilterBooks);

bookRoute.get("/authors", verifyAccessToken, getAuthors);

bookRoute.get("/categories", verifyAccessToken, getCategories);

bookRoute.get("/allbooks", verifyAccessToken, getAllBooks);

bookRoute.post("/book", verifyAccessToken, authAdmin, postBook);

bookRoute.delete("/book/:id", verifyAccessToken, authAdmin, deleteBook);

bookRoute.put("/book/:id", verifyAccessToken, authAdmin, updateBook);

module.exports = bookRoute;
