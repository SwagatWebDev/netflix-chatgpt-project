const model = require('../model/netflix-user');
const mongoose = require('mongoose');
const NetflixUser = model.NetflixUser;

exports.createNetflixUser = async (req, res) => {
    const netflixUser = new NetflixUser(req.body);
    try {
        const document = await netflixUser.save();
        res.status(201).json(document);
    } catch (err) {
        res.status(400).json(err);
    }
};

exports.getAllNetflixUsers = async (req, res) => {
    try {
        const users = await NetflixUser.find({});
        res.status(200).json(users);
    } catch (err) {
        res.status(400).json(err);
    }
};
