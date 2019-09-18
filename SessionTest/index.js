const express = require('express');
const app = express();
const session = require('express-session');
var cookieParser = require('cookie-parser');
//app.use(cookieParser);
//app.set('trust proxy', 1);
/*app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: {secure:true}
}));*/

app.use(session({
    secret: 'what a secret!',
    resave: false,
    saveUninitialized: true
}));

app.get('/',function(req,res,next){
    //console.log(req);
    const sessData = req.session;
    //console.log(sessData);
    sessData.someAttribute = "rmmcosta";
    //console.log(sessData);
    if(req.session.page_views){
        req.session.page_views++;
        res.send("You visited this page " + req.session.page_views + " times");
     } else {
        req.session.page_views = 1;
        res.send("Welcome to this page for the first time!");
     }
});

app.get('/book',function(req,res,next){
    const someAttribute = req.session.someAttribute;
    res.send(`Session variavel someAttribute with value ${someAttribute}`);
});

app.listen(3000);