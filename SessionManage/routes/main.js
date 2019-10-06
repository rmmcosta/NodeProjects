const router = require('express').Router();

router.get('/', function (req, res, next) {
    console.log('root', req.session);
    if (req.session.email) {
        res.redirect('/admin');
    } else {
        console.log('do the login first');
        res.sendFile(__dirname + '/../views/index.html', { 'root': '/' });
    }
});
router.post('/login', function (req, res) {
    console.log('login', req.session);
    if (!req.session.email) {
        console.log(req.body.email);
        req.session.email = req.body.email;
    }
    res.redirect('/');
});
router.get('/logout', function (req, res) {
    console.log('logout');
    if (req.session.email) {
        req.session.destroy(function (err) {
            if (err) {
                res.send(err);
            }
            else {
                res.removeHeader('Cookie');
                res.redirect('/');
            }
        });
    }
});
router.get('/admin', function (req, res) {
    if (req.session.email) {
        res.write(`<h1>Welcome back ${req.session.email}</h1>`);
        res.end('<a href="/logout">Logout</a>');
    } else {
        res.write('<h1>Please login first.</h1>');
        res.end('<a href="/">Login</a>');
    }
});

module.exports = router;