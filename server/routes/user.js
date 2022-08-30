const express = require('express');
const router = express.Router();
const { userCart } = require('../controllers/user');
const { authCheck } = require('../middlewares/auth');

router.post('/user/cart', authCheck, userCart);

module.exports = router;
