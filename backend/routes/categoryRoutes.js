const express = require("express");
const {
  getCategories,
  postCategory,
  putCategory,
  deleteCategory,
} = require("../controllers/categoryController");

const categoryRoutes = express.Router();

categoryRoutes.get("/categories", getCategories);

categoryRoutes.post("/category", postCategory);

categoryRoutes.put("/category/:id", putCategory);

categoryRoutes.delete("/category/:id", deleteCategory);

module.exports = categoryRoutes;
