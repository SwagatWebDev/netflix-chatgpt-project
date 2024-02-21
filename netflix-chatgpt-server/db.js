const mongoose = require('mongoose');
const dbHOST = process.env.MONGODB_DEV_URL;

mongoose.connect(dbHOST)
    .then(() => {
        console.log('MongoDB Connected...')
    }).catch((err) => {
        console.log('Error while Mongo Conn..', err);
    });
