const { createProduct, getAllProducts, getProductById, replaceProduct, deleteProduct } = require('../controller/productController');


const router = require('express').Router();

router.post('/', createProduct);
router.get('/', getAllProducts);
router.get('/:id', getProductById);
router.put('/:id', replaceProduct);
router.delete('/:id', deleteProduct);

module.exports = router
