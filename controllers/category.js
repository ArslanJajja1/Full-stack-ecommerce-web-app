const Category = require('../models/Category');
const Product = require('../models/Product');
const SubCategory = require('../models/SubCategory');
const slugify = require('slugify');
exports.create = async (req, res) => {
  try {
    const { name, images } = req.body;
    const category = await new Category({
      name,
      images,
      slug: slugify(name),
    }).save();
    res.json({ category });
  } catch (error) {
    console.log(error);
    res.status(400).send('Creating category failed');
  }
};
exports.list = async (req, res) => {
  const categories = await Category.find({}).sort({ createdAt: -1 }).exec();
  res.json(categories);
};
exports.read = async (req, res) => {
  const category = await Category.findOne({ slug: req.params.slug }).exec();
  const products = await Product.find({ category }).populate('category');
  res.json({ category, products });
};
exports.update = async (req, res) => {
  const { name, images } = req.body;
  try {
    const updatedCategory = await Category.findOneAndUpdate(
      { slug: req.params.slug },
      { name, slug: slugify(name), images },
      { new: true },
    );
    res.json(updatedCategory);
  } catch (error) {
    res.status(400).send('Category update failed');
  }
};
exports.remove = async (req, res) => {
  try {
    const deleted = await Category.findOneAndDelete({
      slug: req.params.slug,
    });
    res.json({ deleted, message: 'Category deleted' });
  } catch (error) {
    res.status(400).send('Category deleted failed');
  }
};

exports.getSubs = async (req, res) => {
  const subs = await SubCategory.find({ parent: req.params._id });
  res.json(subs);
};
