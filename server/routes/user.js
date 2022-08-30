const express = require('express');
const router = express.Router();
const { userCart, getUserCart } = require('../controllers/user');
const { authCheck } = require('../middlewares/auth');

router.post('/user/cart', authCheck, userCart);
router.get('/user/cart', authCheck, getUserCart);

module.exports = router;
