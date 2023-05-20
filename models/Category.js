const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: [true, 'Category name is required'],
      minLength: [2, 'Too short'],
      maxLength: [30, 'Too long'],
    },
    images: {
      type: Array,
    },
    slug: {
      type: String,
      unique: true,
      lowercase: true,
      index: true,
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model('Category', categorySchema);
