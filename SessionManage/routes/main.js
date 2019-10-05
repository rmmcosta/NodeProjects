const router = require('express').Router();

var sess;

router.get('/', function (req, res, next) {
    console.log('root',req.session);
    sess = req.session;
    if (sess.email) {
        res.redirect('/admin');
    } else {
        console.log('do the login first');
        res.sendFile(__dirname + '/../views/index.html', {'root': '/'});
    }
});
router.post('/login', function (req, res) {
    sess = req.session;
    console.log('login',req.session);
    if(!sess.email) {
        console.log(req.body.email);
        sess.email = req.body.email;
    }
    res.redirect('/');
});
router.get('/logout', function (req, res) {
    console.log('logout');
    sess = req.session;
    if(sess.email) {
        sess.destroy(function(err){
            res.send(err);
        });
    }
    res.redirect('/');
});
router.get('/admin', function (req, res) {
    sess = req.session;
    if (sess.email) {
        res.write(`<h1>Welcome back ${sess.email}</h1>`);
        res.end('<a href="/logout">Logout</a>');
    } else {
        res.write('<h1>Please login first.</h1>');
        res.end('<a href="/">Login</a>');
    }
});

module.exports = router;