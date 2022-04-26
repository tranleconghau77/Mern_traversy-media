const JWT = require("jsonwebtoken");
const createError = require("http-errors");

const signAccessToken = async (userId) => {
  return new Promise((resolve, reject) => {
    const payload = {
      userId,
    };

    const secret = process.env.ACCESS_TOKEN_SECRET;

    const options = {
      expiresIn: "20s",
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
    if (err) return next(createError.Unauthorized("Unauthorized"));

    req.payload = payload;
    next();
  });
};

module.exports = { signAccessToken, verifyAccessToken };
