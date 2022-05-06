const Joi = require("joi");

const userValidate = (data) => {
  const userSchema = Joi.object({
    username: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")),
    gmail: Joi.string()
      .pattern(new RegExp("@gmail.com$"))
      .lowercase()
      .email()
      .required(),
    password: Joi.string().min(6).max(18).required(),
  });
  return userSchema.validate(data);
};

const bookValidate = (data) => {
  const userSchema = Joi.object({
    username: Joi.string().lowercase().email(),
    password: Joi.string().min(6).max(18).required(),
  });
  return userSchema.validate(data);
};

const authorValidate = (data) => {
  const userSchema = Joi.object({
    username: Joi.string().pattern(new RegExp("gmail.com")).lowercase().email(),
    password: Joi.string().min(6).max(18).required(),
  });
  return userSchema.validate(data);
};

const categoryValidate = (data) => {
  const userSchema = Joi.object({
    username: Joi.string().lowercase().email(),
    password: Joi.string().min(6).max(18).required(),
  });
  return userSchema.validate(data);
};

module.exports = {
  userValidate,
  bookValidate,
  authorValidate,
  categoryValidate,
};
