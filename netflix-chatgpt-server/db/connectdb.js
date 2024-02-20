const mongoose = require('mongoose');
require('dotenv').config();

async function connectDB() {
    try {
        await mongoose.connect(process.env.MONGODB_DEV_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("DB Connected Successfully");
    } catch (err) {
        console.log(err);
    }
}

connectDB();

exports.connectDB = connectDB;

/*
connect();
uri, options, callback

const options = {
    username: 'Swagat',
    password: 'Pas$w0rd',
    dbName: 'Ecommerce',
    authSource: 'Ecommerce',
    useNewUrlParse: true
}
 */
