const express = require('express');
const app = express();

function queryDB() {
    return new Promise(resolve=>{
        setTimeout(()=>resolve('dummy data'),3000);
    });
}

function makeCSV(data) {
    return new Promise(function(resolve){
        setInterval(()=>resolve('The csv!'),10000);
    });
}

app.get('/',function(req,res,next){
    queryDB()
    .then(function(data){
        console.log(data);
        return makeCSV(data);
    })
    .then(function(csv){
        console.log(csv);
        return csv;
    })
    .catch(next)
    res.send('end');
});

app.use(function(err,req,res,next){
    console.log('An error has ocurred:',err);
});

app.listen(3000);