const User = require('../models/User');
const Product = require('../models/Product');
const Cart = require('../models/Cart');

exports.userCart = async (req, res) => {
  const { cart } = req.body;
  let products = [];
  const user = await User.findOne({ email: req.user.email });
  let cartExistByThisUser = await Cart.findOne({ orderdBy: req.user._id });
  if (cartExistByThisUser) {
    cartExistByThisUser.remove();
  }
  for (let i = 0; i < cart.length; i++) {
    let object = {};
    object.product = cart[i]._id;
    object.count = cart[i].count;
    object.color = cart[i].color;
    let { price } = await Product.findById(cart[i]._id).select('price');
    object.price = price;
    products.push(object);
  }
  let cartTotal = 0;
  for (let i = 0; i < products.length; i++) {
    cartTotal = cartTotal + products[i].price * products[i].count;
  }
  let newCart = await new Cart({
    products,
    cartTotal,
    orderdBy: user._id,
  }).save();
  console.log('new cart...', newCart);
  res.json({ ok: true });
};
exports.getUserCart = async (req, res) => {
  const user = await User.findOne({ email: req.user.email });
  let cart = await Cart.findOne({ orderdBy: user._id }).populate(
    'products.product',
    '_id title price totalAfterDiscount',
  );
  const { products, cartTotal, totalAfterDiscount } = cart;
  res.json({ products, cartTotal, totalAfterDiscount });
};
