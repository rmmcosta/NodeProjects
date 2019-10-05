const app = require('../loader');

app.get('/',function(req,res){
    res.render('index.html');
});

app.get('/about',function(req,res){
    res.render('about.html');
});