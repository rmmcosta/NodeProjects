const express = require('express');
const app = express();

const server = app.listen(3000,function(){
    console.log("Server working on port ", server.address().port);
});

app.get('/',function(req,res){
    res.send('Hello from the route/express');
});