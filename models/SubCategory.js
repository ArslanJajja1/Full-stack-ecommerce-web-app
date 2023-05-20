const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;

const SubCategorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: [true, 'Category name is required'],
      minLength: [2, 'Too short'],
      maxLength: [30, 'Too long'],
    },
    slug: {
      type: String,
      unique: true,
      lowercase: true,
      index: true,
    },
    parent: {
      type: ObjectId,
      ref: 'Category',
      required: true,
    },
    images: {
      type: Array,
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model('SubCategory', SubCategorySchema);
