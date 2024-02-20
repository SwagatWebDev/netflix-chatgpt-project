const model = require('../model/users');
const mongoose = require('mongoose');
const User = model.User;

// Controller function to create a new user
exports.createUser = async (req, res) => {
    // Create a new user instance based on the request body
    const user = new User(req.body);
    try {
        // Save the user to the database
        const document = await user.save();
        // Send a success response with the created document
        res.status(201).json(document);
    } catch (err) {
        // If there's an error, send an error response
        res.status(400).json(err);
    }
};

// Controller function to get all products with price greater than 400
exports.getAllUsers = async (req, res) => {
    // Find all products with price greater than 400
    const users = await User.find({});
    // Send the products as a JSON response
    res.json(users);
};


exports.getUsersWithOrders = async (req, res) => {
    try{
        const userWithOrders = await User.aggregate([
            {
                $lookup: {
                    from: 'orders',
                    localField: '_id',
                    foreignField: 'user',
                    as: 'orders'
                }
            },
            // {
            //     $match: {
            //         "orders.product": "Iphone 15 Pro Max"
            //     }
            // }
            // {
            //     $group: {
            //         _id: "$_id",
            //         totalOrders: { $sum: { $size: "$orders" } }
            //     }
            // }
            // {
            //     $addFields: {
            //         totalOrders: { $size: "$orders" }
            //     }
            // },
            // {
            //     $sort: { totalOrders: -1 }
            // }
            {
                $project: {
                    _id: 1,
                    name: 1,
                    email: 1,
                    "orders.product": 1,
                    "orders.quantity": 1
                }
            }

        ]);
        res.json(userWithOrders);
    } catch(error) {
        res.json({error: error.message});
    }
}

// Controller function to get a user by its ID
exports.getUserById = async (req, res) => {
    try {
        // Extract the user ID from the request parameters
        const id = req.params.id;
        // Find the user by its ID
        const user = await User.findById(id);
        // Send the user as a JSON response
        res.json(user);
    } catch (err) {
        res.status(400).json(err);
    }
};

exports.getUsersWithOrders = async (req, res) => {
    try {
        const usersWithOrders = await User.aggregate([
            {
                $lookup: {
                    from: 'orders',
                    localField: '_id',
                    foreignField: 'user',
                    as: 'orders'
                },
            },
        ]);
        console.log(usersWithOrders)
        res.json(usersWithOrders);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Controller function to replace a user by its ID
exports.replaceUser = async (req, res) => {
    // Extract the User ID from the request parameters
    const id = req.params.id;
    try {
        // Find the User by its ID and replace it with the request body
        const updatedResult = await User.findOneAndReplace({ _id: id }, req.body, { new: true });
        // Send a success response with the updated document
        res.status(201).json(updatedResult);
    } catch (err) {
        // If there's an error during the operation, send an error response
        res.status(400).json(err);
    }
};

// Controller function to update a User partially by its ID
exports.updatePartialUser = async (req, res) => {
    // Extract the User ID from the request parameters
    const id = req.params.id;
    try {
        // Find the User by its ID and update it with the request body
        const updatedResult = await User.findOneAndUpdate({ _id: id }, req.body, { new: true });
        // Send a success response with the updated document
        res.status(201).json(updatedResult);
    } catch (err) {
        // If there's an error during the operation, send an error response
        res.status(400).json(err);
    }
};

// Controller function to delete a User by its ID
exports.deleteUser = async (req, res) => {
    // Extract the User ID from the request parameters
    const id = req.params.id;
    try {
        // Use Mongoose's deleteOne() method to delete the User by its ID
        const result = await User.deleteOne({ _id: id });
        // Send a success response with the number of documents deleted
        res.status(200).json({ message: `${result.deletedCount} documents deleted` });
    } catch (error) {
        // If there's an error during the operation, send an error response
        res.status(500).json({ error: 'Server error' });
    }
};
