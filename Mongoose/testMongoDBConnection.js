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

db.on('open', function(){
    db.collectionNames(function(error, names) {
      if (error) {
        throw new Error(error);
      } else {
        names.map(function(name) {
          console.log('found collection %s', name);
        });
      }
    });
  });
  
  db.on('error', function(error){
    throw new Error(error);
  })