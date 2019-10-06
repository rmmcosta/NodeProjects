const express = require('express');
const app = express();

const port = process.env.PORT || 3001;
app.listen(port,function(err){
    if(err){
        console.log(err);
    } else {
        console.log('Server up and running on port',port);
    }
});

app.use('/views',express.static('views'));

module.exports = app;

require('./loader');