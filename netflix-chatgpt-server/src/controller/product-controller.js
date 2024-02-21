// Import the Product model from the model file
const model = require('../model/product-model');
const mongoose = require('mongoose');
const Product = model.Product;

// Controller function to create a new product
exports.createProduct = async (req, res) => {
    // Create a new product instance based on the request body
    const product = new Product(req.body);
    try {
        // Save the product to the database
        const result = await product.save();
        // Send a success response with the created document
        res.status(201).json({ message: "success", data: result });
    } catch (err) {
        // If there's an error, send an error response
        res.status(400).json(err);
    }
};

// Controller function to get all products with price greater than 400
exports.getAllProducts = async (req, res) => {
    // Find all products with price greater than 400
    const products = await Product.find({ price: { $gt: 400 } });
    // Send the products as a JSON response
    res.json({ message: "success", data: products });
};

// Controller function to get a product by its ID
exports.getProductById = async (req, res) => {
    // Extract the product ID from the request parameters
    const id = req.params.id;
    // Find the product by its ID
    const product = await Product.findById(id);
    // Send the product as a JSON response
    res.json({ message: "success", data: product });
};

// Controller function to replace a product by its ID
exports.replaceProduct = async (req, res) => {
    // Extract the product ID from the request parameters
    const id = req.params.id;
    try {
        // Find the product by its ID and replace it with the request body
        const updatedResult = await Product.findOneAndReplace({ _id: id }, req.body, { new: true });
        // Send a success response with the updated document
        res.status(201).json({ message: "success", data: updatedResult });
    } catch (err) {
        // If there's an error during the operation, send an error response
        res.status(400).json(err);
    }
};

// Controller function to update a product partially by its ID
exports.updatePartialProduct = async (req, res) => {
    // Extract the product ID from the request parameters
    const id = req.params.id;
    try {
        // Find the product by its ID and update it with the request body
        const updatedResult = await Product.findOneAndUpdate({ _id: id }, req.body, { new: true });
        // Send a success response with the updated document
        res.status(201).json({ message: "success", data: updatedResult });
    } catch (err) {
        // If there's an error during the operation, send an error response
        res.status(400).json(err);
    }
};

// Controller function to delete a product by its ID with isActive Flag
exports.deleteProduct = async (req, res) => {
    try{
        const id = req.params.id;
        const deletedProduct = await Product.deleteOne({_id: id});

        if(!deletedProduct) {
            return res.status(404).json({error: "Product not found"})
        }

        const updatedResult = await Product.findOneAndUpdate({_id: id}, req.body, {new: true});
        res.status(200).json({ message: "success", data: updatedResult });
    } catch (error) {
        console.error('Error deleting Product:', error);
        res.status(500).json({error: 'Internal Server Error'})
    }
};