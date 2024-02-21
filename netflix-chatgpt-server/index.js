const express = require('express');
const app = express();
const bodyParser = require('body-parser');
require('dotenv').config();
require('./db');
const PORT = process.env.PORT || 8080;
const productRoutes = require('./src/route/product-route');
const netflixUserRoutes = require('./src/route/netflix-user-route');

app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Enable CORS for all routes
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});


app.get('/', (req, res) => {
    res.send('Welcome to Netflix ChatGPT API');
});


// /products
app.use('/products', productRoutes);

// /netflix-user
app.use('/netflix-user', netflixUserRoutes);


app.listen(8080, () => {
    console.log('Server is listen in on PORT :' + PORT);
})
