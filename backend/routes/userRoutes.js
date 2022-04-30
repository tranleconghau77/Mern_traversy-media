const express = require("express");

const userRoute = express.Router();

const {
  getUser,
  getUsers,
  postUser,
  putUser,
  deleteUser,
  login,
  logout,
  refreshTokenUser,
} = require("../controllers/userController");
userRoute.get("/user/:id", getUser);

userRoute.get("/users", getUsers);

userRoute.post("/user", postUser);

userRoute.put("/user/:id", putUser);

userRoute.delete("/user/:id", deleteUser);

userRoute.post("/user/refresh-token", refreshTokenUser);

userRoute.post("/user/login", login);

userRoute.post("/user/logout", logout);

module.exports = userRoute;
