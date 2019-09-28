//import the needed modules
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const passport = require('passport');
const passportlocal = require('passport-local');
const localStrategy = passportlocal.Strategy;
const session = require('express-session');

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
    theUser.save(function (err) {
        if (err)
            console.log(err);
        else
            console.log('saved with success');
    });
}

// Parse URL-encoded bodies (as sent by HTML forms)
app.use(express.urlencoded({ extended: true }));

// Parse JSON bodies (as sent by API clients)
app.use(express.json());

//routes for main, login (get and post), register (get and post) and list users

app.get('/register', function (req, res) {
    res.sendFile(__dirname + '/views/register.html');
});

app.post('/register', function (req, res) {
    console.log(req.body);
    if (req.body.password === req.body.password2) {
        createUser(req.body.username, req.body.password);
        res.redirect('/login');
    } else {
        console.log('Passwords don\'t match!');
        //req.flash('warn', 'Passwords don\'t match!', false);
        res.redirect('/register');
    }
});


//login

passport.use(new localStrategy(
    function (username, password, done) {
        console.log('local strategy');
        userModel.findOne({ username: username }, function (err, user) {
            if (err) { return done(err); }
            if (!user) {
                console.log('Incorrect username.');
                return done(null, false, { message: 'Incorrect username.' });
            }
            if (user.password !== password) {
                console.log('Incorrect password.');
                return done(null, false, { message: 'Incorrect password.' });
            }
            return done(null, user);
        });
    }
));

//session init
app.use(session({
    secret: 'the secret',
    resave: true,
    saveUninitialized: true
}));

// Passport init
app.use(passport.initialize());
app.use(passport.session());

//it's mandatory to implement serialize and deserialize

passport.serializeUser(function (user, done) {
    done(null, user.id);
});

passport.deserializeUser(function (id, done) {
    /*userModel.getUserById(id, function (err, user) {
        done(err, user);
    });*/
    done(null, null);
});

app.get('/login', function (req, res) {
    res.sendFile(__dirname + '/views/login.html');
});

app.post('/login',
    passport.authenticate('local', { failureRedirect: '/login' }),
    function (req, res) {
        res.redirect('/');
    });

app.get('/',function(req,res){
    res.send('Welcome!');
});

//start listen on port 3000
app.listen(3000);