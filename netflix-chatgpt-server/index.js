const express = require('express');
const app = express();
require('dotenv').config();
require('./db');
const PORT = process.env.PORT || 8080;
const productRoutes = require('./src/route/product-route');
const netflixUserRoutes = require('./src/route/netflix-user-route');
const cors = require('cors');
const userRouter = require("./src/route/user-route");

// Enable CORS middleware
app.use(cors());

// Allow preflight requests
app.options('*', cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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

// user router middleware
app.use('/user', userRouter);

app.listen(PORT, () => {
    console.log('Server is listen in on PORT :' + PORT);
})
