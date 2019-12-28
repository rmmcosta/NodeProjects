module.exports = (app, passport) => {

    app.get('/', (req, res) => {
        res.render('pages/index.ejs');
    });

    //login
    app.get('/login', (req, res) => {
        res.render('pages/login.ejs', { message: req.flash('loginMessage') });
    });

    app.post('/login', passport.authenticate('local-login', {
        successRedirect: '/profile', // redirect to the secure profile section
        failureRedirect: '/login', // redirect back to the signup page if there is an error
        failureFlash: true // allow flash messages
    }));

    //signup
    app.get('/signup', (req, res) => {
        res.render('pages/signup.ejs', { message: req.flash('signupMessage') });
    });

    //process the signup form
    app.post('/signup', passport.authenticate('local-signup', {
        successRedirect: '/profile', // redirect to the secure profile section
        failureRedirect: '/signup', // redirect back to the signup page if there is an error
        failureFlash: true // allow flash messages
    }));

    // app.post('/login', function (req, res, next) {
    //     passport.authenticate('local-login', function (err, user, info) {
    //         console.log('authenticate:', info);
    //         if (err) { console.log(err);return next(err); }
    //         if (!user) { return res.redirect('/login'); }
    //         req.logIn(user, function (err) {
    //             if (err) { return next(err); }
    //             return res.redirect('/profile');
    //         });
    //     })(req, res, next);
    // });

    //profile
    // we will want this protected so you have to be logged in to visit
    // we will use route middleware to verify this (the isLoggedIn function)
    app.get('/profile', isLoggedIn, (req, res) => {
        res.render('pages/profile.ejs', { user: req.user });// get the user out of session and pass to template
    });

    //logout
    app.get('/logout', (req, res) => {
        req.logout();
        res.redirect('/');
    });

    // route middleware to make sure a user is logged in
    function isLoggedIn(req, res, next) {
        if (req.isAuthenticated()) {
            return next();
        }
        res.redirect('/');
    }
};