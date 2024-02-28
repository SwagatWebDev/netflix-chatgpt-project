const {createNetflixUser, getAllNetflixUsers} = require("../controller/netflix-user");
const ensureAuthenticated = require("../../auth");
const netflixUserRouter = require('express').Router();

netflixUserRouter.post('/', ensureAuthenticated, createNetflixUser); //Secure
netflixUserRouter.get('/', getAllNetflixUsers); //Secure

module.exports = netflixUserRouter;
