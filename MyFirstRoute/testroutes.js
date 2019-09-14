const book = require('./book');
const helloroute = require('./helloroute');
const nextroute = require('./hellonextroute');
const express = require('express');
const app = express();
const server = app.listen(3000,function() {
    console.log("Server working on port ", server.address().port);
});

/*app.use('/route',helloroute);
app.use('/express',nextroute);
app.use('/help',nextroute)*/
