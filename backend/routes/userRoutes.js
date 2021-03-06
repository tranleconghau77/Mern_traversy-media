const express = require("express");
const { verifyAccessToken } = require("../helpers/jwt_services");

const userRoute = express.Router();

const {
  getUser,
  getUsers,
  registerUser,
  putUser,
  deleteUser,
  login,
  postUserFirebase,
  logout,
  refreshTokenUser,
} = require("../controllers/userController");
userRoute.get("/user/:id", verifyAccessToken, getUser);

userRoute.get("/users", verifyAccessToken, getUsers);

userRoute.post("/user", registerUser);

userRoute.put("/user/:id", verifyAccessToken, putUser);

userRoute.delete("/user/:id", verifyAccessToken, deleteUser);

userRoute.post("/user/refresh-token", refreshTokenUser);

userRoute.post("/user/login", login);

userRoute.post("/user/logout", verifyAccessToken, logout);

//test firebase
userRoute.post("/userfirebase", postUserFirebase);
module.exports = userRoute;
