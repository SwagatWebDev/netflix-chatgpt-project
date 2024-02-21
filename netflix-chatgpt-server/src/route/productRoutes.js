const { createProduct, getAllProducts, getProductById, replaceProduct, deleteProduct } = require('../controller/productController');


const router = require('express').Router();

router.post('/', createProduct); //secure
router.get('/', getAllProducts);
router.get('/:id', getProductById);
router.put('/:id', replaceProduct);//secure
router.delete('/:id', deleteProduct);//secure

module.exports = router