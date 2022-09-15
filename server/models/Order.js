const mongoose = require('mongoose');
const { ObjectId } = mongoose;

const orderSchema = new mongoose.Schema(
  {
    products: [
      {
        product: {
          type: ObjectId,
          ref: 'Product',
        },
        count: Number,
        color: String,
      },
    ],
    paymentIntent: {},
    orderStatus: {
      type: 'String',
      default: 'Not Processed',
      enum: ['Not Processed', 'Processing', 'Dispatched', 'Cancelled', 'Completed', 'Cash On Delivery'],
    },
    orderdBy: { type: ObjectId, ref: 'User' },
  },
  { timestamps: true },
);
module.exports = mongoose.model('Order', orderSchema);
