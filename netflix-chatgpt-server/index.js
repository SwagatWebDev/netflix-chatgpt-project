const express = require('express');
const app = express();
const bodyParser = require('body-parser');
require('dotenv').config();
require('./db');
const PORT = process.env.PORT || 8080;
const productRoute = require('./src/route/productRoute');
const netflixUserRoute = require('./src/route/netflixUserRoute');
const {getProducts} = require("./src/controller/productController");
const baseURL = '/api/v1';
const productURL = '/products';
const netflixUserURL = '/netflix-user';
const cors = require('cors');

app.use(express.json());
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});


app.get('/', (req, res) => {
    res.send('Welcome to Netflix ChatGPT API');
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

app.use(baseURL.concat(productURL), productRoute);

app.use(baseURL.concat(netflixUserURL), netflixUserRoute.router);

app.listen(PORT, () => {
    console.log('Server is listen in on PORT : ' + PORT);
})
