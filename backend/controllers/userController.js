const { addDoc, collection, getFirestore } = require("firebase/firestore");
const User = require("../model/userModel");

const {
  signAccessToken,
  signRefreshToken,
  verifyAccessRefreshToken,
} = require("../helpers/jwt_services");

const createError = require("http-errors");
const { userValidate } = require("../helpers/validation");
const client = require("../config/redis_connect");
const app = require("../config/firebase_connect");

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
    const { username, gmail, password } = req.body;

    const { error } = userValidate(req.body);
    if (error) {
      return next(createError.BadRequest(`${error.details[0].message}`));
    }

    if (!username || !password || !gmail) {
      return next(createError.BadRequest("Bad Request"));
    }

    const isExistUser = await User.find({ gmail });
    if (isExistUser.length !== 0) {
      return next(createError.BadRequest("Email is exist"));
    }

    const newUser = await User.create({
      username: username,
      password: password,
      gmail: gmail,
    });
    newUser.save();
    res.status(200).json(newUser);
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
    const { gmail, password } = req.body;

    if (!gmail || !password) {
      next(createError.BadRequest("Bad Request"));
    }

    const user = await User.findOne({ gmail });
    if (!user) {
      next(createError.BadRequest("Bad Request"));
    }

    const compare = await user.isCheckPassword(password);

    if (compare === false) {
      next(createError.Unauthorized("Unauthorized"));
    }
    //JWT sign Token and Refresh Token
    const accessToken = await signAccessToken(user);

    const accessRefreshToken = await signRefreshToken(user);

    res.cookie("refreshToken", accessRefreshToken, {
      httpOnly: true,
      secure: false,
      sameSite: "strict",
    });

    res.status(200).json({
      id: user.id,
      username: user.username,
      password: user.password,
      role: user.role,
      accessToken,
    });
  } catch (error) {
    next(createError.InternalServerError("Internal Server Error"));
  }
};

// @desc    logout user
// @route   DELETE /user/logout
// @access  private
const logout = async (req, res, next) => {
  try {
    const { refreshToken } = req.body;
    if (!refreshToken) {
      next(createError.BadRequest("Bad Request"));
    }

    const { userId } = await verifyAccessRefreshToken(refreshToken);

    client.del(userId.toString(), (err, reply) => {
      if (err) next(createError.InternalServerError("Internal Server Error"));
    });
    res.status(200).json({ msg: "Logout" });
  } catch (error) {
    next(createError.InternalServerError("Internal Server Error"));
  }
};

// @desc    refresh token user
// @route   POST /user/refresh-token
// @access  private
const refreshTokenUser = async (req, res, next) => {
  try {
    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken) {
      next(createError.BadRequest("You should login to continue!"));
    }

    const payload = await verifyAccessRefreshToken(refreshToken);

    // res.status(200).json({ accessToken: payload.accessToken });
    const accessToken = await signAccessToken(payload);
    const refreToken = await signRefreshToken(payload);

    res.cookie("refreshToken", refreToken, {
      httpOnly: true,
      secure: false,
      sameSite: "strict",
    });

    res.status(200).json({ accessToken, refreToken });
  } catch (error) {
    next(createError.Unauthorized("Unauthorized"));
  }
};

//test firebase
const postUserFirebase = async (req, res, next) => {
  try {
    const { name } = req.body;
    const db = getFirestore(app);

    const citiesCol = collection(db, "cities");
    await addDoc(citiesCol, { name })
      .then((res) => console.log(res))
      .catch((e) => console.log(e));
    // const citySnapshot = await getDocs(citiesCol);
    // const cityList = citySnapshot.docs.map((doc) => doc.data());

    res.status(200).json({ msg: "ok" });
  } catch (error) {
    return console.log(error);
  }
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
  postUserFirebase,
};
