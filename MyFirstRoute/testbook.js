const book = require('./book');
const express = require('express');
const app = express();
const server = app.listen(3000,function() {
    console.log("Server working on port ", server.address().port);
});

app.use('/',book);
app.use('/about',book);
