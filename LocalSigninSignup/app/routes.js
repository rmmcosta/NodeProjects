module.exports = (app,passport)=>{
    app.get('/',(req,res)=>{
        res.render('index.ejs');
    });

    //login
    app.get('/login',(req,res)=>{
        res.render('login.ejs',{message:req.flash('loginMessage')});
    });

    app.post('/login',(req,res)=>{
        //passport stuff
    });

    //signup
    app.get('/signup',(req,res)=>{
        res.render('signup.ejs',{message:req.flash('signupMessage')});
    });

    app.post('/signup',(req,res)=>{
        //passport stuff
    });

    //profile
    // we will want this protected so you have to be logged in to visit
    // we will use route middleware to verify this (the isLoggedIn function)
    app.get('/profile',isLoggedIn,(req,res)=>{
        res.render('profile.ejs',{user:req.user});// get the user out of session and pass to template
    });

    //logout
    app.get('/logout',(req,res)=>{
        req.logout();
        res.redirect('/');
    });

    // route middleware to make sure a user is logged in
    function isLoggedIn(req,res,next) {
        if(req.isAuthenticated()){
            return next();
        }
        res.redirect('/');
    }
};