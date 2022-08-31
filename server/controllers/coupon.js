const Coupon = require('../models/Coupon');

exports.create = async (req, res) => {
  try {
    const { name, expiry, discount } = req.body.coupon;
    const coupon = await new Coupon({ name, expiry, discount }).save();
    res.json(coupon);
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
};
exports.remove = async (req, res) => {
  try {
    res.json(await Coupon.findByIdAndDelete(req.params.couponId));
  } catch (error) {
    console.log(error);
  }
};
exports.list = async (req, res) => {
  try {
    res.json(await Coupon.find({}).sort({ createtAt: -1 }));
  } catch (error) {
    console.log(error);
  }
};
