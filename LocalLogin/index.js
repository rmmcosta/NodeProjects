const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const mongoose = require('mongoose');
const passport = require('passport');
const User = require('./models/user');
const LocalStrategy = require('passport-local').Strategy;

//connect to the database
//Set up default mongoose connection
const mongoDB = 'mongodb://127.0.0.1/locallogin';
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true }, (err) => {
    if (!err) {
        console.log('MongoDB has connected successfully.');
    } else {
        console.log('MongoDB connection error.');
    }
});

//Get the default connection
const db = mongoose.connection;


//use session and parsers
const urlencodedParser = bodyParser.urlencoded({ extended: false })
app.use(session({
    secret: 'secret key',
    resave: true,
    saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(cookieParser());

//initialize passport
passport.use(new LocalStrategy(
    function (username, password, done) {
        console.log('new local strategy');
        console.log(username);
        console.log(password);
        /*User.getUserByUsername(username, function (err, user) {
            if (err) {
                return done(err);
            }
            if (!user) {
                return done(null, false, { message: 'Unknown user!' });
            }
            if (!User.verifyPassword(password, user.password)) {
                return done(null, false, { message: 'Wrong password!' });
            }
            return done(null, user);
        });*/
        const mockuser = {
            name: { first: 'Ricardo', last: 'Costa' },
            _id: '5d875a2ead223a4f8a6a3243',
            username: 'rmmcosta',
            password:
                '$2a$10$HK060f4QYVZlr3ZgQtRz2O8jtb5EexEuOovYSH.lXC5TKgKB5oH.6',
            email: 'ricardocosta101085@gmail.com',
            __v: 0
        }
        return done(null, mockuser);
    }
));

passport.serializeUser(function (user, done) {
    done(null, user.id);
});

passport.deserializeUser(function (id, done) {
    User.getUserById(id, function (err, user) {
        done(err, user);
    });
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

app.get('/login', function (req, res, next) {
    res.sendFile(__dirname + '/views/login.html');
});

app.post('/login', passport.authenticate('local', {
    failureRedirect: '/login',
    successRedirect: '/'
})
);

/*app.post('/login', function (req, res,next) {
    const user = User.getUserByUsername('rmmcosta', function (err, user) {
        if (err) {
            console.log(err);
            return err;
        } else {
            console.log(user);
            return user;
        }
    });
    res.send(user.username);
}
);*/

app.get('/user', function (req, res) {
    res.send(req.user);
});

// Endpoint to logout
app.get('/logout', function (req, res) {
    req.logout();
    res.send(null)
});

app.listen(port, () => console.log('App listening on port 3000!'));