const express = require('express');

const productController = require('../controller/product')

const router = express.Router();

router
    .post('/', productController.createProduct)
    .get('/', productController.getAllProducts)
    .get('/:id', productController.getProductById)
    .put('/:id', productController.replaceProduct)
    .patch('/:id', productController.updatePartialProduct)
    .delete('/:id', productController.replaceProduct);

exports.router = router;
