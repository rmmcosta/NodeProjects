//import the needed modules
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const passport = require('passport');
const passportlocal = require('passport-local');
const localStrategy = passportlocal.Strategy;
const session = require('express-session');
const bodyParser = require('body-parser');
const User = require('./models/user');

//establish connection with the mongodb
const mongoDB = 'mongodb://127.0.0.1/locallogin';
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true }, (err) => {
    if (!err) {
        console.log('MongoDB has connected successfully.');
    } else {
        console.log('MongoDB connection error.');
    }
});

// Parse URL-encoded bodies (as sent by HTML forms)
app.use(express.urlencoded({ extended: true }));
//use session and parsers
const urlencodedParser = bodyParser.urlencoded({ extended: false })

// Parse JSON bodies (as sent by API clients)
app.use(express.json());

//routes for main, login (get and post), register (get and post) and list users

app.get('/register', function (req, res) {
    res.sendFile(__dirname + '/views/register.html');
});

//login

passport.use(new localStrategy(
    function (username, password, done) {
        console.log('local strategy');
        console.log(username);
        console.log(password);
        User.getUserByUsername(username, function (err, user) {
            console.log(user);
            if (err) {
                return done(err);
            }
            if (!user) {
                console.log('unknown user!');
                return done(null, false, { message: 'Unknown user!' });
            }
            User.verifyPassword(password, user.password, function (err, res) {
                if (res) {
                    console.log('valid password!');
                    return done(null, user);
                } else {
                    console.log('wrong password!');
                    return done(null, false, { message: 'Wrong password!' });
                }
            });
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

//post api to register users
app.post('/register', urlencodedParser, function (req, res) {
    console.log('Users api - register');
    //console.log('req:', req);
    const newUser = new User.user({
        username: req.body.username,
        password: req.body.password,
        email: req.body.email,
        name: {
            first: req.body.firstName,
            last: req.body.lastName
        }
    });
    User.createUser(newUser, function (err, user) {
        if (err) {
            throw `Error when creating user: ${err}`;
        } else {
            console.log(`User created: ${user}`);
            res.send(user).end();
        }
    });
});

app.get('/', function (req, res) {
    res.send('Welcome!');
});

//start listen on port 3000
app.listen(3000, () => console.log('App listening on port 3000!'));