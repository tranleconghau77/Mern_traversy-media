const JWT = require("jsonwebtoken");
const createError = require("http-errors");
const client = require("../config/redis_connect");

//Access Token
const signAccessToken = async (data) => {
  // console.log(data);

  const { id, role, password, gmail, username } = data;
  return new Promise((resolve, reject) => {
    const payload = {
      id,
      username,
      password,
      role,
      gmail,
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
    next(createError.Unauthorized("Unauthorized"));
  }

  const authHeader = req.headers["authorization"];
  const bearToken = authHeader.split(" ");
  const token = bearToken[1];
  if (!token) {
    return next(createError.Unauthorized("Unauthorized"));
  }
  //start verify token
  JWT.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, payload) => {
    if (err) {
      return next(createError.Unauthorized("JWT expired"));
    }
    req.payload = payload;
    next();
  });
};

//Access Refresh Token
const signRefreshToken = async (data) => {
  const { id, role, password, gmail, username } = data;
  return new Promise((resolve, reject) => {
    const payload = {
      id,
      role,
      gmail,
      username,
      password,
    };

    const secret = process.env.ACCESS_REFRESHTOKEN_SECRET;

    const options = {
      expiresIn: "1y",
    };

    JWT.sign(payload, secret, options, (err, token) => {
      if (err) reject(err);
      client.set(
        `${id.toString()}`,
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

      client.get(payload.id, (err, reply) => {
        if (err) {
          return reject(createError.Unauthorized(`${err}`));
        }

        if (reply === refreshToken) {
          console.log(payload);
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
