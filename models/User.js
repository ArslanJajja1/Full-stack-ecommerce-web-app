const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;

const userSchema = new mongoose.Schema(
  {
    name: String,
    email: {
      type: String,
      required: [true, 'Email is required'],
      index: true,
    },
    role: {
      type: String,
      default: 'subscriber',
    },
    cart: {
      type: Array,
      default: [],
    },
    address: {
      name: String,
      email: String,
      number: String,
      address1: String,
      address2: String,
      state: String,
      city: String,
      zipcode: String,
    },
    wishlist: [
      {
        type: ObjectId,
        ref: 'Product',
      },
    ],
  },
  { timestamps: true },
);

module.exports = mongoose.model('User', userSchema);
