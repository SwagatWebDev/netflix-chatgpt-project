const mongoose = require('mongoose');

const {Schema} = mongoose;

const UserModel = new Schema({
    fullName: {type: String, required: true},
    email: {
        type: String,
        unique: true,
        validate: {
            validator: function (input) {
                return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(input)
            },
            require: [true, "Please provide valid email"]
        }
    },
    password: {type: String, minLength: 6, required: true},
    createdAt: {
        type: Date,
        default: Date.now()
    },
    updatedAt: {
        type: Date,
        default: Date.now()
    }
});

module.exports = mongoose.model('users', UserModel);
