const mongoose = require('mongoose');

const {Schema} = mongoose;

const defaultPhotoURL = "https://occ-0-5690-3663.1.nflxso.net/dnm/api/v6/vN7bi_My87NPKvsBoib006Llxzg/AAAABTZ2zlLdBVC05fsd2YQAR43J6vB1NAUBOOrxt7oaFATxMhtdzlNZ846H3D8TZzooe2-FT853YVYs8p001KVFYopWi4D4NXM.png?r=229";

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
    photoURL: {
        type: String,
        default: defaultPhotoURL
    },
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
