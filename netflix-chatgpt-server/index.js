const express = require('express');
const app = express();
const bodyParser = require('body-parser');
require('dotenv').config();
require('./db');
const PORT = process.env.PORT || 8080;
const productRoutes = require('./src/routes/productRoutes');

app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});


app.get('/', (req, res) => {
    res.send('products api running new deploy');
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

app.get('/ping', (req, res) => {
    res.send('PONG')
});

// /products
app.use('/products', productRoutes);
// /users

app.listen(8080, () => {
    console.log('Server is listen in on PORT :' + PORT);
})
