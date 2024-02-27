const {createProduct, getAllProducts, getProductById, replaceProduct, deleteProduct} = require("../controller/product-controller");
const ensureAuthenticated = require("../../auth");
const productRouter = require('express').Router();

productRouter.post('/', ensureAuthenticated, createProduct); // Secure
productRouter.get('/', getAllProducts);
productRouter.get('/:id', getProductById);
productRouter.put('/:id', ensureAuthenticated, replaceProduct); // Secure
productRouter.delete('/:id', ensureAuthenticated, deleteProduct); // Secure

module.exports = productRouter;
