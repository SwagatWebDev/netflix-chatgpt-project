const express = require('express');

const netflixUserController = require('../controller/netflix-user')

const router = express.Router();

router
    .post('/', netflixUserController.createNetflixUser)
    .get('/', netflixUserController.getAllNetflixUsers);

exports.router = router;
