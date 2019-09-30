//requires
const express = require('express');
const app = express();
const database = require('./models/database');


//routes to create and/or update with delete option, list with delete option
app.get('/createMaker', function (req, res) {
    const presentNewMaker = function (msg) {
        res.send(msg);
    }
    database.createVW(presentNewMaker);
});

app.get('/deleteMaker', function (req, res) {
    database.deleteVW();
    res.send('deleted');
});

app.get('/listMakers', function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    const presentMakers = function (list) {
        res.end(list);
    }
    listMakersJson = database.listMakers(presentMakers);
});

app.get('/createMyGolf', function (req, res) {
    let presentNewGolf = function (msg) {
        res.send(msg);
    }
    let createMyGolf = function (makerId) {
        console.log('MakerId:',makerId);
        database.createMyGolf(makerId,presentNewGolf);
    }
    database.getCarIdByName(createMyGolf,'VW');
});

app.get('/deleteCar', function (req, res) {
    database.deleteMyGolf();
    res.send('deleted');
});

app.get('/listCars', function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    const presentCars = function (list) {
        res.end(list);
    }
    database.listCars(presentCars);
});


//listen in port 3000
app.listen(3000, () => {
    console.log('Listen on port 3000');
});
