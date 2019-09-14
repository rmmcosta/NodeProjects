const express = require('express');
const app = express();
const port = process.env.PORT || 8080;
const bodyParser = require('body-parser');
/*app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));*/
var urlencodedParser = bodyParser.urlencoded({ extended: false })
app.listen(port);
console.log('Server started at http://localhost:',port);

app.get('/api/users',function(req,res){
    console.log('Users api - get');
    //console.log('req:', req);
    const user_id = req.query.id;
    const token = req.query.token;
    const geo = req.query.geo;
    res.send(user_id + ' - ' + token + ' - ' + geo);
});

app.post('/api/users',urlencodedParser,function(req,res){
    console.log('Users api - post');
    //console.log('req:', req);
    const user_id = req.body.id;
    const token = req.body.token;
    const geo = req.body.geo;
    res.send(user_id + ' - ' + token + ' - ' + geo);
});