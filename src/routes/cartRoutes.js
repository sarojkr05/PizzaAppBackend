const express = require('express');
const { getCartByUser, modifyProudctToCart, clearCartById } = require('../controllers/cartController');
const { isLoggedIn } = require('../validation/authValidator');

const cartRouter = express.Router()

cartRouter.get('/', isLoggedIn, getCartByUser);

cartRouter.post('/:operation/:productId', isLoggedIn, modifyProudctToCart);

cartRouter.delete('/products', isLoggedIn, clearCartById);

module.exports = cartRouter;