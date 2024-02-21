const {createNetflixUser, getAllNetflixUsers} = require("../controller/netflix-user");

const netflixUserRoute = require('express').Router();

netflixUserRoute.post('/', createNetflixUser);
netflixUserRoute.get('/', getAllNetflixUsers);

module.exports = netflixUserRoute;
