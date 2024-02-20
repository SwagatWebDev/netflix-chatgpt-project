const mongoose = require('mongoose');

const netflixUserSchema = new mongoose.Schema({
        username: String,
        gender: String,
        address: String,
        image: String,
        selectedCity: String,
        selectedCountry: String,
        primaryUser: String,
        secondaryUser: String,
});

exports.NetflixUser = mongoose.model('NetflixUser', netflixUserSchema, 'netflix-users');
