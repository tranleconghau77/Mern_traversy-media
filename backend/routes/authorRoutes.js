const express = require("express");

const {
  getAuthors,
  deleteAuthor,
  putAuthor,
  postAuthor,
} = require("../controllers/authorController");

const authorRoute = express.Router();

authorRoute.get("/authors", getAuthors);

authorRoute.post("/author", postAuthor);

authorRoute.put("/author/:id", putAuthor);

authorRoute.delete("/author/:id", deleteAuthor);

module.exports = authorRoute;
