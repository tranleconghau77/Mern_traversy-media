const Category = require("../model/categoryModel");

// @desc    get categories
// @route   GET /categories
// @access  private
const getCategories = async (req, res) => {
  try {
    let data = await Category.find({});
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

// @desc    post book
// @route   POST /book
// @access  private
const postCategory = async (req, res) => {
  try {
    if (!req.body || !req.body.name) {
      res.status(400).json({ msg: "Error with input category" });
    }
    await Category.create({
      name: req.body.name,
    });
    let dataCategoriesAfterPost = await Category.find({ rawResult: true });
    res.status(200).json(dataCategoriesAfterPost);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

// @desc    put category
// @route   PUT /category/:id
// @access  private
const putCategory = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);

    if (!category) {
      res.status(400).json({ msg: "Category not found" });
    }
    let data = await Category.findByIdAndUpdate(
      req.params.id,
      {
        name: req.body.name,
      },
      { new: true, rawResult: true }
    );
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

// @desc    delete category
// @route   DELETE /category/:id
// @access  private
const deleteCategory = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);

    if (!category) {
      res.status(400).json({ msg: "Category not found" });
    }
    await category.remove();
    let data = await Category.find();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

module.exports = {
  getCategories,
  postCategory,
  putCategory,
  deleteCategory,
};
