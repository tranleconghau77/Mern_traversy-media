const createError = require("http-errors");

const authAdmin = (req, res, next) => {
  if (!req.payload) {
    next(createError.Unauthorized("Unauthorized"));
  }
  if (req.payload.role == "Basic") {
    next(createError.Unauthorized("Unauthorized"));
  }
  next();
};

module.exports = { authAdmin };
