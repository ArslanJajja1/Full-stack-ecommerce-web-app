const User = require('../models/User');
const Product = require('../models/Product');
const Cart = require('../models/Cart');
const Coupon = require('../models/Coupon');
const Order = require('../models/Order');
const uniqueid = require('uniqueid');
exports.userCart = async (req, res) => {
  // console.log(req.body); // {cart: []}
  const { cart } = req.body;

  let products = [];

  const user = await User.findOne({ email: req.user.email }).exec();

  // check if cart with logged in user id already exist
  let cartExistByThisUser = await Cart.findOne({ orderdBy: user._id }).exec();

  if (cartExistByThisUser) {
    cartExistByThisUser.remove();
    console.log('removed old cart');
  }

  for (let i = 0; i < cart.length; i++) {
    let object = {};

    object.product = cart[i]._id;
    object.count = cart[i].count;
    object.color = cart[i].color;
    // get price for creating total
    let productFromDb = await Product.findById(cart[i]._id).select('price').exec();
    object.price = productFromDb.price;

    products.push(object);
  }

  // console.log('products', products)

  let cartTotal = 0;
  for (let i = 0; i < products.length; i++) {
    cartTotal = cartTotal + products[i].price * products[i].count;
  }

  // console.log("cartTotal", cartTotal);

  let newCart = await new Cart({
    products,
    cartTotal,
    orderdBy: user._id,
  }).save();

  console.log('new cart ----> ', newCart);
  res.json({ ok: true });
};

exports.getUserCart = async (req, res) => {
  const user = await User.findOne({ email: req.user.email }).exec();

  let cart = await Cart.findOne({ orderdBy: user._id }).populate('products.product', '_id title price totalAfterDiscount').exec();
  console.log(cart);
  if (cart) {
    const { products, cartTotal, totalAfterDiscount } = cart;
    return res.json({ products, cartTotal, totalAfterDiscount });
  }
  return res.json({ products: [], cartTotal: 0, totalAfterDiscount: 0 });
};

exports.emptyCart = async (req, res) => {
  console.log('empty cart');
  const user = await User.findOne({ email: req.user.email }).exec();

  const cart = await Cart.findOneAndRemove({ orderdBy: user._id }).exec();
  res.json(cart);
};

exports.saveAddress = async (req, res) => {
  const userAddress = await User.findOneAndUpdate({ email: req.user.email }, { address: req.body.address }).exec();

  res.json({ ok: true });
};
exports.applyCouponToUserCart = async (req, res) => {
  const { coupon } = req.body;
  const validCoupon = await Coupon.findOne({ name: coupon });
  if (validCoupon === null) {
    return res.json({ err: 'Invalid Coupon' });
  }
  const user = await User.findOne({ email: req.user.email });
  const { products, cartTotal } = await Cart.findOne({ orderdBy: user._id }).populate('products.product', '_id title price');
  let totalAfterDiscount = (cartTotal - (cartTotal * validCoupon.discount) / 100).toFixed(2);
  await Cart.findOneAndUpdate({ orderdBy: user._id }, { totalAfterDiscount }, { new: true });
  res.json(totalAfterDiscount);
};
exports.createOrder = async (req, res) => {
  const { paymentIntent } = req.body.stripeResponse;
  const user = await User.findOne({ email: req.user.email });
  let { products } = await Cart.findOne({ orderdBy: user._id });
  let newOrder = await new Order({ products, paymentIntent, orderdBy: user._id }).save();
  console.log('New Order', newOrder);
  let bulkOption = products.map((item) => {
    return {
      updateOne: {
        filter: { _id: item.product._id },
        update: { $inc: { quantity: -item.count, sold: +item.count } },
      },
    };
  });
  let updated = await Product.bulkWrite(bulkOption, {});
  res.json({ ok: true });
};
exports.createCashOrder = async (req, res) => {
  const { COD, couponApplied } = req.body;
  if (!COD) return res.status(400).send('Create cash order failed.');

  const user = await User.findOne({ email: req.user.email });
  let userCart = await Cart.findOne({ orderdBy: user._id });
  let finalAmount = 0;
  if (couponApplied && userCart.totalAfterDiscount) {
    finalAmount = userCart.totalAfterDiscount * 100;
  } else {
    finalAmount = userCart.cartTotal * 100;
  }
  console.log('final amount ', finalAmount);
  let newOrder = await new Order({
    products: userCart.products,
    paymentIntent: {
      id: uniqueid(),
      amount: finalAmount,
      currency: 'usd',
      status: 'Cash On Delivery',
      created: Date.now(),
      payment_method_types: ['cash'],
    },
    orderdBy: user._id,
    orderStatus: 'Cash On Delivery',
  }).save();
  console.log('New Order', newOrder);
  let bulkOption = userCart.products.map((item) => {
    return {
      updateOne: {
        filter: { _id: item.product._id },
        update: { $inc: { quantity: -item.count, sold: +item.count } },
      },
    };
  });
  let updated = await Product.bulkWrite(bulkOption, {});
  res.json({ ok: true });
};
exports.orders = async (req, res) => {
  let user = await User.findOne({ email: req.user.email });
  let userOrders = await Order.find({ orderdBy: user._id }).populate('products.product');
  res.json(userOrders);
};
exports.addToWishlist = async (req, res) => {
  const { productId } = req.body;
  const user = await User.findOneAndUpdate({ email: req.user.email }, { $addToSet: { wishlist: productId } }, { new: true });
  res.json({ ok: true });
};
exports.wishlist = async (req, res) => {
  const list = await User.findOne({ email: req.user.email }).select('wishlist').populate('wishlist');
  res.json(list);
};
exports.removeFromWishlist = async (req, res) => {
  const { productId } = req.params;
  const user = await User.findOneAndUpdate({ email: req.user.email }, { $pull: { wishlist: productId } }).exec();
  res.json({ ok: true });
};
