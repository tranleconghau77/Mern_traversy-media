const Author = require("../model/authorModel");

// @desc    get authors
// @route   GET /authors
// @access  private
const getAuthors = async (req, res) => {
  try {
    let authors = await Author.find();
    res.status(200).json(authors);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

// @desc    post author
// @route   POST /author
// @access  private
const postAuthor = async (req, res) => {
  try {
    if (!req.body) {
      res.status(400).json({ msg: "Error with not input text" });
    }
    await Author.create({
      books: [...req.body.books],
      name: req.body.name,
      country: req.body.country,
    });

    let dataAuthors = await Author.find({ rawResult: true });
    res.status(200).json(dataAuthors);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

// @desc    delete author
// @route   DELETE /author
// @access  private
const deleteAuthor = async (req, res) => {
  try {
    if (!req.params.id) {
      res.status(400).json({ msg: "Undifined Author" });
    }

    const author = await Author.findById(req.params.id);

    if (!author) {
      res.status(400).json({ msg: "Category not found" });
    }
    await author.remove();
    let data = await Author.find();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

// @desc    put author
// @route   PUT /author
// @access  private
const putAuthor = async (req, res) => {
  try {
    if (!req.params.id) {
      res.status(400).json({ msg: "Undefined Author" });
    }
    console.log(typeof req.body.books);
    let dataAuthorsAfterUpdate = await Author.findOneAndUpdate(
      req.params.id,
      {
        books: req.body.books,
        name: req.body.name,
        country: req.body.country,
      },
      {
        new: true,
      }
    );
    res.status(200).json(dataAuthorsAfterUpdate);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

module.exports = {
  getAuthors,
  deleteAuthor,
  postAuthor,
  putAuthor,
};
