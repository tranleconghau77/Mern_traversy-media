const Book = require("../model/bookModel");
const client = require("../config/redis_connect");
const createError = require("http-errors");

// @desc    get a book detail
// @route   GET /book/:id
// @access  private
exports.getBook = async (req, res, next) => {
  try {
    let book = await Book.findById(req.params.id);
    res.json(book);
  } catch (error) {
    return next(createError.InternalServerError());
  }
};

// @desc    get allbooks
// @route   GET /allbooks
// @access  private
exports.getAllBooks = async (req, res, next) => {
  try {
    await client.get("books", async (err, reply) => {
      if (reply) {
        return await res.json({
          books: JSON.parse(reply),
        });
      }
      if (err) console.log(err);
      else {
        let books = await Book.find();
        if (!books) {
          return next(createError.InternalServerError());
        } else {
          client.setex("books", 365 * 24 * 60 * 60, JSON.stringify(books));
          res.json({
            books,
            message: "from mongo",
          });
        }
      }
    });
  } catch (error) {
    return next(createError.InternalServerError());
  }
};

// @desc    get filter  searchbooks
// @route   GET /searchbooks
// @access  private
exports.postFilterBooks = async (req, res, next) => {
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
      return res.status(200).json(data);
    }

    if (category) {
      data = await Book.find(
        {
          category: category,
        },
        "-_id"
      ).exec();
      return res.status(200).json(data);
    }

    if (vote) {
      data = await Book.find({
        vote: Number(vote),
      }).exec();
      return res.status(200).json(data);
    }

    if (author) {
      data = await Book.find({
        author: author,
      }).exec();
      return res.json(data);
    }

    if (data.length === 0) {
      return res.status(400).json({ msg: "Not found" });
    }
    return res.status(200).json(data);
  } catch (error) {
    next(createError.InternalServerError("Internal Server Error"));
  }
};

// @desc    post book
// @route   POST /book
// @access  private
exports.postBook = async (req, res, next) => {
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
exports.deleteBook = async (req, res, next) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) {
      next(createError.BadRequest());
    }
    await book.remove();
    return res.status(200).json(book);
  } catch (error) {
    next(createError.InternalServerError());
  }
};

// @desc    update book
// @route   UPDATE /book/:id
// @access  private
exports.updateBook = async (req, res, next) => {
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

exports.getAuthors = async (req, res, next) => {
  try {
    let authors = await Book.find({}, "author -_id");
    authors = authors.filter(
      (value, index, self) =>
        index === self.findIndex((t) => t.author === value.author)
    );
    res.status(200).json(authors);
  } catch (error) {
    next(createError.InternalServerError("Internal Server Error"));
  }
};

exports.getCategories = async (req, res, next) => {
  try {
    let categories = await Book.find({}, "category  ");
    categories = categories.filter(
      (value, index, self) =>
        index === self.findIndex((t) => t.category === value.category)
    );

    res.status(200).json(categories);
  } catch (error) {
    next(createError.InternalServerError("Internal Server Error"));
  }
};

// module.exports = {
//   postFilterBooks,
//   getAllBooks,
//   getBook,
//   deleteBook,
//   updateBook,
//   postBook,
//   getAuthors,
//   getCategories,
// };
