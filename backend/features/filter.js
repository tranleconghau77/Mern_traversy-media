const Book = require("../model/bookModel");

const filter = (req, res) => {
  try {
    console.log(req.query);
  } catch (error) {
    res.status(400).json({ msg: "Bad request" });
  }
};

module.exports = filter;
