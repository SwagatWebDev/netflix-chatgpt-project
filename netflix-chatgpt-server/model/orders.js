const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    product: String,
    quantity: Number,
});

exports.Order = mongoose.model('Order', orderSchema);
