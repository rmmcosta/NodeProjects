const express = require('express');
const app = express();

app.get('/search',function(req,res) {
    setImmediate(function(){
        const jsonStr = req.query.params;
        console.log(jsonStr);
        try {
            const jsonObj = JSON.parse(jsonStr);
            //call http://localhost:3000/search?params="{'cpos':'dkfdj'}"
            res.send('Success!');
        } catch (error) {
            res.status(400).send('Invalid JSON!');
        }
    });
});

app.listen(3000);