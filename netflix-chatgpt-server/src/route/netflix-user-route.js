const {createNetflixUser, getAllNetflixUsers} = require("../controller/netflix-user");
const productRouter = require('express').Router();

productRouter.post('/', createNetflixUser);
productRouter.get('/', getAllNetflixUsers);

module.exports = productRouter;
