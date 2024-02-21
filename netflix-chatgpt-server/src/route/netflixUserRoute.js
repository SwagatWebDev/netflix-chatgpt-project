const {createNetflixUser, getAllNetflixUsers} = require("../controller/netflix-user");

const netflixUserRouter = require('express').Router();

netflixUserRouter.post('/', createNetflixUser);
netflixUserRouter.get('/', getAllNetflixUsers);

exports.router = netflixUserRouter;
