const express = require('express');
const app = express();
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const cookieParser = require('cookie-parser');
const session = require('express-session');
const flash = require('connect-flash');

app.use(cookieParser()); 
app.use(session({ secret: "secret", resave: false, saveUninitialized: true}));

app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions

app.use(flash());

passport.use(new LocalStrategy(
  function(username, password, done) {
    User.findOne({ username: username }, function (err, user) {
      if (err) { return done(err); }
      if (!user) {
        return done(null, false, { message: 'Incorrect username.' });
      }
      if (!user.validPassword(password)) {
        return done(null, false, { message: 'Incorrect password.' });
      }
      return done(null, user);
    });
  }
));

app.post('/login',
  passport.authenticate('local', { successRedirect: '/',
                                   failureRedirect: '/login',
                                   passReqToCallback : true,
                                   failureFlash: true })
);

app.get('/',function(req,res){
   res.sendFile(__dirname + '/login.html'); 
});

app.get('/login',function(req,res,next){
    res.sendFile(__dirname + '/login.html'); 
 });

app.listen(3000);