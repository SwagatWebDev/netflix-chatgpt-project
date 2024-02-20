const express = require('express');

const orderController = require('../controller/order')
const productController = require("../controller/product");

const router = express.Router();

router
    .post('/', orderController.createOrder)
    .get('/', orderController.getAllOrders)
    .get('/:id', orderController.getOrderById)
    .put('/:id', orderController.replaceOrder)
    .patch('/:id', orderController.updatePartialOrder)
    .delete('/:id', orderController.deleteOrder);

exports.router = router;
