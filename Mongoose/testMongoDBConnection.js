//Import the mongoose modul
const mongoose = require('mongoose');

//Set up default mongoose connection
const mongoDB = 'mongodb://127.0.0.1/nodejs';
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true }, (err) => {
    if (!err) {
        console.log('MongoDB has connected successfully.');
    } else {
        console.log('MongoDB connection error.');
    }
});

//Get the default connection
const db = mongoose.connection;