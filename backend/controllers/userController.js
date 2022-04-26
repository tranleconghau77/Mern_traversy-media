const User = require("../model/userModel");
const { signAccessToken } = require("../helpers/jwt_services");
const { userValidate } = require("../helpers/validation");
const createError = require("http-errors");

// @desc    get user
// @route   GET /user/:id
// @access  private
const getUser = async (req, res, next) => {
  try {
    if (!req.params.id) {
      next(createError.InternalServerError("Internal Server Error"));
      const user = await User.find(req.params.id);
      if (!user) {
        next(createError.BadRequest("Bad Request"));
      }
    }
    res.status(200).json(user);
  } catch (error) {
    next(createError.InternalServerError("Internal Server Error"));
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
    res.status(200).json(users);
  } catch (error) {
    next(createError.InternalServerError("Internal Server Error"));
  }
};

// @desc    post
// @route   POST /user
// @access  private
const postUser = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const { error } = userValidate(req.body);

    if (error) {
      return next(createError.BadRequest(`${error.details[0].message}`));
    }

    if (!username || !password) {
      return next(createError.BadRequest("Bad Request"));
    }

    const isExistUser = await User.find({ username });
    if (isExistUser.length !== 0) {
      return next(createError.BadRequest("Email is exist"));
    }
    // console.log(username, password);
    await User.create({
      username: username,
      password: password,
    });

    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    return next(createError.InternalServerError("Internal Server Error"));
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
        password: req.body.password,
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

// @desc    login user
// @route   POST /user/login
// @access  private
const login = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const { error } = userValidate(req.body);

    if (error) {
      return next(createError.BadRequest(`${error.details[0].message}`));
    }

    if (!username || !password) {
      return next(createError.BadRequest("Bad Request"));
    }

    const user = await User.findOne({ username });
    if (!user) {
      return next(createError.BadRequest("Bad Request"));
    }
    const compare = await user.isCheckPassword(password);

    if (!compare) {
      return next(createError.Unauthorized("Unauthorized"));
    }

    console.log(user._id);
    const accessToken = await signAccessToken(user._id);

    res.status(200).json({ accessToken });
  } catch (error) {
    return next(createError.InternalServerError("Internal Server Error"));
  }
};

// @desc    post user
// @route   POST /user/logout
// @access  private
const logout = async (req, res, next) => {
  res.status(200).json("logout");
};

// @desc    refresh token user
// @route   POST /use/refresh-token
// @access  private
const refreshTokenUser = async (req, res, next) => {
  res.status(200).json("refresh token");
};

module.exports = {
  getUser,
  getUsers,
  putUser,
  postUser,
  deleteUser,
  login,
  logout,
  refreshTokenUser,
};
