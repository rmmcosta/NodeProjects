//import the needed modules
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const passport = require('passport');
const passportlocal = require('passport-local');
const localStrategy = passportlocal.Strategy;
const session = require('express-session');
//notifications
const flash = require('express-flash-notification');

//enable notifications
app.use(session({resave:true,saveUninitialized:false,secret:'cenas'}));
app.use(flash(app));

//establish connection with the mongodb
const mongoDB = 'mongodb://127.0.0.1/simplelocallogin';
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });


//create mongodb schema
const schema = mongoose.Schema;

const userSchema = new schema({
    username: String,
    password: String
});

//create model (collection of documents)
const userModel = mongoose.model('usermodel', userSchema);


//create mongo db document in this case the user
//To create a record (document) you can define an instance of the model and then call save()
const createUser = function (username, password) {
    let theUser = new userModel({
        username: username,
        password: password
    });
    theUser.save(function(err){
        if(err)
            console.log(err);
        else
            console.log('saved with success');
    });
}

// Parse URL-encoded bodies (as sent by HTML forms)
app.use(express.urlencoded({extended:true}));

// Parse JSON bodies (as sent by API clients)
app.use(express.json());

//routes for main, login (get and post), register (get and post) and list users

app.get('/register',function(req,res){
    res.sendFile(__dirname + '/views/register.html');
});

app.post('/register', function(req,res) {
    console.log(req.body);
    if(req.body.password === req.body.password2) {
        createUser(req.body.username,req.body.password);
        res.redirect('/login');
    } else {
        console.log('Passwords don\'t match!');
        //req.flash('warn', 'Passwords don\'t match!', false);
        res.redirect('/register');
    }
});

//start listen on port 3000
app.listen(3000);