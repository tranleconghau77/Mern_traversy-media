const JWT = require("jsonwebtoken");
const createError = require("http-errors");
const client = require("../config/redis_connect");

//Access Token
const signAccessToken = async (userId) => {
  return new Promise((resolve, reject) => {
    const payload = {
      userId,
    };

    const secret = process.env.ACCESS_TOKEN_SECRET;

    const options = {
      expiresIn: "1h",
    };

    JWT.sign(payload, secret, options, (err, token) => {
      if (err) reject(err);
      resolve(token);
    });
  });
};

const verifyAccessToken = (req, res, next) => {
  if (!req.headers["authorization"]) {
    return next(createError.Unauthorized("Unauthorized"));
  }

  const authHeader = req.headers["authorization"];
  const bearToken = authHeader.split(" ");
  const token = bearToken[1];

  //start verify token
  JWT.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, payload) => {
    if (err) {
      return next(createError.Unauthorized(`${err.message}`));
    }
    req.payload = payload;
    next();
  });
};

//Access Refresh Token
const signRefreshToken = async (userId) => {
  return new Promise((resolve, reject) => {
    const payload = {
      userId,
    };

    const secret = process.env.ACCESS_REFRESHTOKEN_SECRET;

    const options = {
      expiresIn: "1y",
    };

    JWT.sign(payload, secret, options, (err, token) => {
      if (err) reject(err);
      client.set(
        userId.toString(),
        token,
        "EX",
        365 * 24 * 60 * 60,
        (err, reply) => {
          if (err)
            return reject(createError.InternalServerError(`${err.message}`));
          resolve(token);
        }
      );
    });
  });
};

const verifyAccessRefreshToken = async (refreshToken) => {
  return new Promise((resolve, reject) => {
    const secret = process.env.ACCESS_REFRESHTOKEN_SECRET;
    JWT.verify(refreshToken, secret, (err, payload) => {
      if (err) {
        return reject(createError.Unauthorized(`${err}`));
      }
      client.get(payload.userId, (err, reply) => {
        if (err) {
          return reject(createError.Unauthorized(`${err}`));
        }
        if (reply === refreshToken) {
          resolve(payload);
        }
        return reject(createError.Unauthorized("Unvalid token"));
      });
    });
  });
};
module.exports = {
  signAccessToken,
  verifyAccessToken,
  signRefreshToken,
  verifyAccessRefreshToken,
};
