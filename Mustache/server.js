const express = require('express');
const app = express();
const mustache = require('mustache-express');
app.engine('html',mustache());
app.set('view engine','html');

app.get('/',function(req,res){
    app.set('views',__dirname + '/views');
    res.render('home.html',{
        name: 'Ricardo',
        surname: 'Costa'
    });
});

app.get('/Ana',function(req,res){
    app.set('views',__dirname + '/views');
    res.render('home.html',{
        name: 'Ana',
        surname: 'Ramos'
    });
});

app.get('/v2',function(req,res){
    app.set('views',__dirname + '/views');
    res.render('home2.html');
});

app.listen(process.env.PORT || 3000);