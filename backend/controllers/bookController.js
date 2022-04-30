const Book = require("../model/bookModel");
const client = require("../config/redis_connect");
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
    client.get("books", (err, reply) => {
      if (err)
        return next(createError.InternalServerError("Internal Server Error"));

      if (reply !== null) {
        res.status(200).send({
          books: JSON.parse(reply),
        });
      }
    });

    let books = await Book.find();
    if (!books) {
      next(createError.InternalServerError());
    }
    client.setex("books", 365 * 24 * 60 * 60, JSON.stringify(books));
    res.status(200).send({
      books,
      message: "from mongo",
    });
  } catch (error) {
    next(createError.InternalServerError());
  }
};

// @desc    get filter  searchbooks
// @route   GET /searchbooks
// @access  private
const postFilterBooks = async (req, res, next) => {
  try {
    let { name_book, vote, category, author } = { ...req.body };

    let data;
    if (name_book) {
      data = await Book.find(
        {
          name_book: name_book,
        },
        "-_id"
      ).exec();
      res.status(200).json(data);
    }

    if (category) {
      data = await Book.find(
        {
          category: category,
        },
        "-_id"
      ).exec();
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
    return createError.InternalServerError("Internal Server Error");
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
    const newBook = new Book({
      name_book: req.body.name_book,
      author: req.body.author,
      published_date: req.body.published_date,
      category: req.body.category,
      vote: req.body.vote,
    });
    await newBook.save();

    return res.status(200).json(newBook);
  } catch (error) {
    next(createError.InternalServerError());
  }
};

// @desc    delete book
// @route   DELETE /book/:id
// @access  private
const deleteBook = async (req, res, next) => {
  // console.log(req.params.id);
  try {
    const book = await Book.findById(req.params.id);
    if (!book) {
      next(createError.BadRequest());
    }
    await book.remove();
    res.status(200).json(book);
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

const getAuthors = async (req, res, next) => {
  try {
    let authors = await Book.find({}, "author -_id");
    authors = authors.filter(
      (value, index, self) =>
        index === self.findIndex((t) => t.author === value.author)
    );
    res.status(200).json(authors);
  } catch (error) {
    return next(createError.InternalServerError("Internal Server Error"));
  }
};

const getCategories = async (req, res, next) => {
  try {
    let categories = await Book.find({}, "category  ");
    categories = categories.filter(
      (value, index, self) =>
        index === self.findIndex((t) => t.category === value.category)
    );

    res.status(200).json(categories);
  } catch (error) {
    return next(createError.InternalServerError("Internal Server Error"));
  }
};

module.exports = {
  postFilterBooks,
  getAllBooks,
  getBook,
  deleteBook,
  updateBook,
  postBook,
  getAuthors,
  getCategories,
};
