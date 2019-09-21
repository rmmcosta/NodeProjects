const express = require('express');
const app = express();
const passport = require('passport');
const oauthg = require('passport-google-oauth');
const gstrategy = oauthg.OAuth2Strategy;
const publicIp = require('public-ip');
const http = require('http');
/*
http.createServer(function (req, res) {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end('Hello World\n');
}).listen(3000, "109.49.164.202");
console.log('Server running at http://109.49.164.202:3000/');*/


(async () => {
	console.log(await publicIp.v4());
	//=> '46.5.21.123'

	console.log(await publicIp.v6());
	//=> 'fe80::200:f8ff:fe21:67cf'
})();
//use https://localtunnel.github.io/www/ to access from outside
passport.use(new gstrategy({
    clientID: '4592422615-1242hffmb60d2vgvgnftidqh0fflaoih.apps.googleusercontent.com',
    clientSecret: '7vpka8AOpT-fxy-fzMnBVO9U',
    callbackURL: "https://bitter-dodo-22.localtunnel.me/callback"
},
    function (accessToken, refreshToken, profile, done) {
        User.findOrCreate({ googleId: profile.id }, function (err, user) {
            return done(err, user);
        });
    }
));

app.get('/auth/google',
    passport.authenticate('google', { scope: ['https://www.googleapis.com/auth/plus.login'] }));

app.get('/auth/google/callback',
    passport.authenticate('google', { failureRedirect: '/login' }),
    function (req, res) {
        res.redirect('/');
    });

app.get('/',function(req,res,next){
    res.sendFile(__dirname + '/login.html');
});

//app.listen(3000, '109.49.164.202');

app.set('port', process.env.PORT || 3000);
app.set('host', process.env.HOST || '0.0.0.0');

http.createServer(app).listen(app.get('port'), app.get('host'), function(){
  console.log("Express server listening on port " + app.get('port'));
});

app.get('/callback',function(req,res,next){
    res.send('callback with success!');
    next();
});

app.get('/privacypolicy',function(req,res,next){
    res.send('privacy policy with success!');
    next();
});

//use https://localtunnel.github.io/www/ to access from outside