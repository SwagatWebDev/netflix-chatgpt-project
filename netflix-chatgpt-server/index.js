require('dotenv').config();
const mongoose = require('mongoose');
const express = require('express');
const connectDB = require('./db/connectdb.js');
const fs = require('fs');
const server = express();
const baseURL = '/api/v1';
const productURL = '/products';
const userURL = '/users';
const orderURL = '/orders';
const netflixUserURL = '/netflix-user';
const productRouter = require('./router/product');
const userRouter = require('./router/user');
const orderRouter = require('./router/order');
const netflixUserRouter = require('./router/netflix-user');
const { getUsersWithOrders } = require("./controller/user");
const { getOrderFilter } = require("./controller/order");
const cors = require('cors');

// Server Middleware
server.use(cors());
server.use(express.json());
server.use(baseURL + productURL, productRouter.router);
server.use(baseURL + userURL, userRouter.router);
server.use(baseURL + orderURL, orderRouter.router);
console.log('DB Password', process.env.DB_PASSWORD);

server.use(baseURL + '/user-with-order', getUsersWithOrders);

server.use(baseURL + netflixUserURL, netflixUserRouter.router);

// starting server
server.listen(process.env.PORT, () => {
    console.log(`Express Server running on http://localhost:${process.env.PORT}`);
});
