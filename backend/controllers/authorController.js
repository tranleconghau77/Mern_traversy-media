const Author = require("../model/authorModel");
const createError = require("http-errors");

// @desc    get authors
// @route   GET /authors
// @access  private
const getAuthors = async (req, res, next) => {
  try {
    let authors = await Author.find();
    res.status(200).json(authors);
  } catch (error) {
    next(createError.InternalServerError());
  }
};

// @desc    post author
// @route   POST /author
// @access  private
const postAuthor = async (req, res, next) => {
  try {
    if (!req.body) {
      next(createError.BadRequest());
    }
    await Author.create({
      books: [...req.body.books],
      name_author: req.body.name_author,
      country: req.body.country,
    });

    let dataAuthors = await Author.find({ rawResult: true });
    res.status(200).json(dataAuthors);
  } catch (error) {
    next(createError.InternalServerError());
  }
};

// @desc    delete author
// @route   DELETE /author/:id
// @access  private
const deleteAuthor = async (req, res, next) => {
  try {
    if (!req.params.id) {
      next(createError.BadRequest());
    }

    const author = await Author.findById(req.params.id);

    if (!author) {
      next(createError.NotFound());
    }
    await author.remove();
    let data = await Author.find();
    res.status(200).json(data);
  } catch (error) {
    next(createError.InternalServerError());
  }
};

// @desc    put author
// @route   PUT /author/:id
// @access  private
const putAuthor = async (req, res, next) => {
  try {
    if (!req.params.id) {
      next(createError.BadRequest());
    }
    const author = await Author.findById(req.params.id);

    if (!author) {
      next(createError.NotFound(sadfgasd));
    }

    let dataAuthorsAfterUpdate = await Author.findOneAndUpdate(
      req.params.id,
      {
        books: req.body.books,
        name_author: req.body.name_author,
        country: req.body.country,
      },
      {
        new: true,
      }
    );
    res.status(200).json(dataAuthorsAfterUpdate);
  } catch (error) {
    next(createError.InternalServerError());
  }
};

module.exports = {
  getAuthors,
  deleteAuthor,
  postAuthor,
  putAuthor,
};
