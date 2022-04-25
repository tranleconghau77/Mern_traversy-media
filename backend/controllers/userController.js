const User = require("../model/userModel");
const createError = require("http-errors");

// @desc    get user
// @route   GET /user/:id
// @access  private
const getUser = async (req, res, next) => {
  try {
    if (!req.params.id) {
      next(creatError.InternalServerError("Internal Server Error"));
      const user = await User.find(req.params.id);
      if (!user) {
        next(createError.BadRequest("Bad Request"));
      }
    }
    res.status(200).json(user);
  } catch (error) {
    next(creatError.InternalServerError("Internal Server Error"));
  }
};

// @desc    get users
// @route   GET /users
// @access  private
const getUsers = async (req, res, next) => {
  try {
    const users = await User.find();
    if (!users) {
      next(createError.InternalServerError("Internal Server Error"));
    }
    res.status.json(users);
  } catch (error) {
    next(createError.InternalServerError("Internal Server Error"));
  }
};

// @desc    post
// @route   POST /user
// @access  private
const postUser = async (req, res, next) => {
  try {
    if (!req.body) {
      next(createError.BadRequest("Bad Request"));
    }

    const isExistUser = await User.find(req.body.id);
    if (isExistUser) {
      next(createError.BadRequest("User is exist"));
    }
    await User.create({
      username: req.body.username,
      password: req.body.password,
    });

    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    next(createError.InternalServerError("Internal Server Error"));
  }
};

// @desc    put user
// @route   PUT /user/:id
// @access  private
const putUser = async (req, res, next) => {
  try {
    if (!req.params.id) {
      next(createError.BadRequest("Bad Request"));
    }
    const isExistUser = await User.find(req.params.id);
    if (!isExistUser) {
      next(createError.BadRequest("User is not exist"));
    }

    let dataUsersAfterUpdate = await User.findOneAndUpdate(
      req.params.id,
      {
        username: req.body.username,
      },
      {
        new: true,
      }
    );
    res.status(200).json(dataUsersAfterUpdate);
  } catch (error) {
    next(createError.InternalServerError("Internal Server Error"));
  }
};

// @desc    delete user
// @route   DELETE /user/:id
// @access  private
const deleteUser = async (req, res, next) => {
  try {
    if (!req.params.id) {
      next(createError.BadRequest("Bad Request"));
    }
    const isExistUser = await User.find(req.params.id);
    if (!isExistUser) {
      next(createError.BadRequest("User is not exist"));
    }

    let dataUsersAfterUpdate = await User.findOneAndDelete(
      req.params.id,
      {
        username: req.body.username,
      },
      {
        new: true,
      }
    );
    res.status(200).json(dataUsersAfterUpdate);
  } catch (error) {
    next(createError.InternalServerError("Internal Server Error"));
  }
};
module.exports = { getUser, getUsers, putUser, postUser, deleteUser };
