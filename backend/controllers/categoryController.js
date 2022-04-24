const Category = require("../model/categoryModel");
const createError = require("http-errors");

// @desc    get categories
// @route   GET /categories
// @access  private
const getCategories = async (req, res, next) => {
  try {
    let data = await Category.find({});
    res.status(200).json(data);
  } catch (error) {
    next(createError.InternalServerError());
  }
};

// @desc    post book
// @route   POST /book
// @access  private
const postCategory = async (req, res, next) => {
  try {
    if (!req.body || !req.body.name_category) {
      next(createError.BadRequest());
    }
    await Category.create({
      name_category: req.body.name_category,
    });
    let dataCategoriesAfterPost = await Category.find({ rawResult: true });
    res.status(200).json(dataCategoriesAfterPost);
  } catch (error) {
    next(createError.InternalServerError());
  }
};

// @desc    put category
// @route   PUT /category/:id
// @access  private
const putCategory = async (req, res, next) => {
  try {
    const category = await Category.findById(req.params.id);

    if (!category) {
      next(createError.BadRequest());
    }
    let data = await Category.findByIdAndUpdate(
      req.params.id,
      {
        name_category: req.body.name_category,
      },
      { new: true }
      //using rawResult not run
    );
    res.status(200).json(data);
  } catch (error) {
    next(createError.InternalServerError());
  }
};

// @desc    delete category
// @route   DELETE /category/:id
// @access  private
const deleteCategory = async (req, res, next) => {
  try {
    const category = await Category.findById(req.params.id);

    if (!category) {
      next(createError.BadRequest());
    }
    await category.remove();
    let data = await Category.find();
    res.status(200).json(data);
  } catch (error) {
    next(createError.InternalServerError());
  }
};

module.exports = {
  getCategories,
  postCategory,
  putCategory,
  deleteCategory,
};
