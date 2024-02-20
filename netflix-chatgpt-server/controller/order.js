const model = require('../model/orders');
const mongoose = require('mongoose');
const Order = model.Order;


// Controller function to create a new Order
exports.createOrder = async (req, res) => {
    // Create a new Order instance based on the request body
    const order = new Order(req.body);
    try {
        // Save the Order to the database
        const document = await order.save();
        // Send a success response with the created document
        res.status(201).json(document);
    } catch (err) {
        // If there's an error, send an error response
        res.status(400).json(err);
    }
};

// Controller function to get all products with price greater than 400
exports.getAllOrders = async (req, res) => {
    try {
        // Find all products with price greater than 400
        const order = await Order.find({});
        // Send the products as a JSON response
        res.json(order);
    } catch (err){
        res.status(400).json(err);
    }
};

exports.getOrderFilter = async (req, res) => {
    const { product, quantity } = req.query;
    const filterQuery = {};
    if (product){
        filterQuery.product = product;
    }
    if (quantity) {
        filterQuery.quantity = quantity;
    }
    console.log(product);
    console.log(filterQuery);
    try{
      const orderData = await Order.find();

      res.status(200).json(orderData);
    } catch (err){
       res.status(400).json(err);
    }
}

// Controller function to get a Order by its ID
exports.getOrderById = async (req, res) => {
    try {
        // Extract the Order ID from the request parameters
        const id = req.params.id;
        // Find the Order by its ID
        const order = await Order.findById(id);
        // Send the Order as a JSON response
        res.json(order);
    } catch (err) {
        res.status(400).json(err);
    }
};

// Controller function to replace a Order by its ID
exports.replaceOrder = async (req, res) => {
    // Extract the Order ID from the request parameters
    const id = req.params.id;
    try {
        // Find the Order by its ID and replace it with the request body
        const updatedResult = await Order.findOneAndReplace({ _id: id }, req.body, { new: true });
        // Send a success response with the updated document
        res.status(201).json(updatedResult);
    } catch (err) {
        // If there's an error during the operation, send an error response
        res.status(400).json(err);
    }
};

// Controller function to update a Order partially by its ID
exports.updatePartialOrder = async (req, res) => {
    // Extract the Order ID from the request parameters
    const id = req.params.id;
    try {
        // Find the Order by its ID and update it with the request body
        const updatedResult = await Order.findOneAndUpdate({ _id: id }, req.body, { new: true });
        // Send a success response with the updated document
        res.status(201).json(updatedResult);
    } catch (err) {
        // If there's an error during the operation, send an error response
        res.status(400).json(err);
    }
};

// Controller function to delete a Order by its ID
exports.deleteOrder = async (req, res) => {
    // Extract the Order ID from the request parameters
    const id = req.params.id;
    try {
        // Use Mongoose's deleteOne() method to delete the Order by its ID
        const result = await Order.deleteOne({ _id: id });
        // Send a success response with the number of documents deleted
        res.status(200).json({ message: `${result.deletedCount} documents deleted` });
    } catch (error) {
        // If there's an error during the operation, send an error response
        res.status(500).json({ error: 'Server error' });
    }
};
