const Book = require("../model/bookModel");

// @desc    get books
// @route   GET /books
// @access  private
const getBooks = async (req, res) => {
  try {
    let books = await Book.find();
    res.status(200).json(books);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

// @desc    post book
// @route   POST /book
// @access  private
const postBook = async (req, res) => {
  try {
    if (!req.body) {
      res.status(400).json({ msg: "Error with not input text" });
    }
    await Book.create({
      name: req.body.name,
      author: req.body.author,
      published_date: req.body.published_date,
      category: req.body.category,
      vote: req.body.vote,
    });

    let booksData = await Book.find({ rawResult: true });
    res.status(200).json(booksData);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

// @desc    delete book
// @route   DELETE /book/:id
// @access  private
const deleteBook = async (req, res) => {
  try {
    // let book = await Book.findById(req.params.id);
    // console.log(book);
    // if (!book) {
    //   res.status(400).json({ msg: "Not found this object" });
    // }

    // let booksAfterDelete = await Book.findByIdAndDelete(req.params.id, {
    //   rawResult: true,
    // });
    // res.status(200).json(booksAfterDelete);

    const book = await Book.findById(req.params.id);
    if (!book) {
      res.status(400).json({ msg: "Category not found" });
    }
    await book.remove();
    let data = await Book.find();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

// @desc    update book
// @route   UPDATE /book/:id
// @access  private
const updateBook = async (req, res) => {
  try {
    if (!req.params.id) {
      res.status(400).json({ msg: "Undifined book" });
    }

    let book = await Book.findById(req.params.id);

    if (!book) {
      res.status(400).json({ msg: "Not found this object" });
    }

    let booksUpate = await Book.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.status(200).json(booksUpate);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

module.exports = { getBooks, deleteBook, updateBook, postBook };
