const {createProduct, getAllProducts, getProductById, replaceProduct, deleteProduct} = require("../controller/product-controller");
const productRouter = require('express').Router();

productRouter.post('/', createProduct);
productRouter.get('/', getAllProducts);
productRouter.get('/:id', getProductById);
productRouter.put('/:id', replaceProduct);
productRouter.delete('/:id', deleteProduct);

module.exports = productRouter
