const express = require('express');
const router = express.Router();

router.use(function timeLog (req,res,next){
    console.log(req);
    console.log('Time: ', Date.now());
    next();
});

router.get('/',function(req,res){
    console.log(req);
    res.send('Books page!');
});

router.get('/about', function(req,res){
    console.log(req);
    res.send('About the book');
});

module.exports = router;