const express = require('express');
const app = express();
const port = 3030;
const mongoose = require('mongoose');
const passport = require('passport');
const morgan = require('morgan');
const flash = require('connect-flash');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const session = require('express-session');
const configDB = require('./config/database');

//database
mongoose.connect(configDB.url, {useNewUrlParser: true, useUnifiedTopology: true});

//uses
app.use(morgan('dev')); // log 4xx and 5xx responses to console
app.use(cookieParser); // read cookies (needed for auth)
app.use(bodyParser); // get information from html forms

//view engine
app.set('view engine','ejs');

//configure passport
require('./config/passport')(passport);
app.use(session({secret:'thesecretpassport', resave: true, saveUninitialized: true}));
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session

//routes
require('./app/routes')(app,passport);

//launch
app.listen(port,()=>{
    console.log(`Listen on localhost:${port}`);
});