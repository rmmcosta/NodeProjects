const express = require('express');
const app = express();
const port = 8080;
const mongoose = require('mongoose');
const passport = require('passport');
const morgan = require('morgan');
const flash = require('connect-flash');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const session = require('express-session');
const configDB = require('./config/database');

//database
mongoose.connect(configDB.url, { useNewUrlParser: true, useUnifiedTopology: true });
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    console.log('we are connected!');
});


//uses
app.use(morgan('dev')); // log 4xx and 5xx responses to console
app.use(cookieParser()); // read cookies (needed for auth)
// get information from html forms
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

//view engine
app.set('view engine', 'ejs');

//configure passport
require('./config/passport')(passport);
app.use(session({ secret: 'thesecretpassport', resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session

//public folder
app.use(express.static(__dirname + '/public'));

//routes
require('./app/routes')(app, passport);

//launch
app.listen(port, () => {
    console.log(`Listen on localhost:${port}`);
});