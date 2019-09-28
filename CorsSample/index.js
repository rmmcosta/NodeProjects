const express = require('express');
const app = express();
const cors = require('cors');
const request = require('request');

//Configuring CORS w/ Dynamic Origin
const whitelist = ['localhost','127.0.0.1'];
const corsOptions = {
    origin: function(origin, callback) {
        console.log(origin);
        let isFromWhiteOrigin = origin===undefined || whitelist.indexOf(origin)>-1;
        if(isFromWhiteOrigin) {
            //callback with signature funciton(req,res)
            callback(null,true);
        } else {
            callback(new Error('Not allowed by CORS!'));
        }
    }
};

//use cors
app.use(cors(corsOptions));

//main route
// app.get('/',function(req,res,next){
//     res.json({msg:'Cors is enabled for localhost!'});
// });

app.get('/', function(req, res, next) {
    request({
        uri: 'http://www.giantbomb.com/api/search',
        qs: {
          api_key: '123456',
          query: 'World of Warcraft: Legion'
        }
      }).pipe(res);
  });

app.listen(3000, () => {
    'Localhost listen on port 3000'
});