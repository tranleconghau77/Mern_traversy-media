const Book = require("../model/bookModel");
const createError = require("http-errors");

// @desc    get a book detail
// @route   GET /book/:id
// @access  private
const getBook = async (req, res, next) => {
  try {
    let book = await Book.findById(req.params.id);
    res.status(200).json(book);
  } catch (error) {
    next(createError.InternalServerError());
  }
};

// @desc    get allbooks
// @route   GET /allbooks
// @access  private
const getAllBooks = async (req, res, next) => {
  try {
    let books = await Book.find();
    if (!books) {
      next(createError.InternalServerError());
    }
    res.status(200).json(books);
  } catch (error) {
    next(createError.InternalServerError());
  }
};

// @desc    get filter  books
// @route   GET /books
// @access  private
const getFilterBooks = async (req, res, next) => {
  try {
    let { vote, category, author } = { ...req.query };

    let data;

    if (category) {
      data = await Book.find({
        category: category,
      })
        .populate("category")
        .populate("author", "name_author country -_id")
        .exec();
      res.status(200).json(data);
    }

    if (vote) {
      data = await Book.find({
        vote: Number(vote),
      }).exec();
      res.status(200).json(data);
    }

    if (author) {
      data = await Book.find({
        author: author,
      }).exec();
      res.status(200).json(data);
    }

    if (data.length === 0) {
      res.status(400).json({ msg: "Not found" });
    }
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

// @desc    post book
// @route   POST /book
// @access  private
const postBook = async (req, res, next) => {
  try {
    if (!req.body) {
      next(createError.BadRequest());
    }
    await Book.create({
      name_book: req.body.name_book,
      author: req.body.author,
      published_date: req.body.published_date,
      category: req.body.category,
      vote: req.body.vote,
    });

    let booksData = await Book.find({ rawResult: true });
    res.status(200).json(booksData);
  } catch (error) {
    next(createError.InternalServerError());
  }
};

// @desc    delete book
// @route   DELETE /book/:id
// @access  private
const deleteBook = async (req, res, next) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) {
      next(createError.BadRequest());
    }
    await book.remove();
    let data = await Book.find();
    res.status(200).json(data);
  } catch (error) {
    next(createError.InternalServerError());
  }
};

// @desc    update book
// @route   UPDATE /book/:id
// @access  private
const updateBook = async (req, res, next) => {
  try {
    if (!req.params.id) {
      next(createError.BadRequest());
    }

    let book = await Book.findById(req.params.id);

    if (!book) {
      next(createError.BadRequest());
    }

    let booksUpate = await Book.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.status(200).json(booksUpate);
  } catch (error) {
    next(createError.InternalServerError());
  }
};

module.exports = {
  getFilterBooks,
  getAllBooks,
  getBook,
  deleteBook,
  updateBook,
  postBook,
};
