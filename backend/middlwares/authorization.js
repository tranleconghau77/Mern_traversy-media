const createError = require("http-errors");

const authUser = async (req, res, next) => {
  if (!req.payload) {
    next(createError.Unauthorized("Unauthorized"));
  }
  if (req.payload.role == "Basic") {
    next(createError.Unauthorized("Unauthorized"));
  }
  if (req.payload.role == "Admin") {
    next();
  }
};

const authAdmin = (role) => {
  return (req, res, next) => {};
};

module.exports = { authUser, authAdmin };
