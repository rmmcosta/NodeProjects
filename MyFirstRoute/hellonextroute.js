const express = require('express');
const app = express();

const server = app.listen(3000,function(){
    console.log("Server working on port ", server.address().port);
});

app.get('/express',function(req,res,next){
    console.log(req);
    console.log(next);
    res.send('Express!');
});

app.get('/help',function(req,res,next){
    console.log(req);
    console.log(next);
    res.send('Help is not available, but you came to the right place!');
});

