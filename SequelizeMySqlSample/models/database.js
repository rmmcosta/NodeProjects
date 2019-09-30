const { Sequelize, Model } = require('sequelize');

//connect to db
const connection = new Sequelize('SequelizeSample', 'SequelizeUser', '123456', {
    host: 'localhost',
    dialect: 'mysql'
});

//test the connection
connection
    .authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });

//create maker model
class Maker extends Model { }
Maker.init({
    name: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    },
    country: {
        type: Sequelize.STRING
        // allowNull defaults to true
    }
}, {
    sequelize: connection,
    modelName: 'maker',
    timestamps: true //Here `timestamps` is directly set to true, so the `createdAt` and `updatedAt` fields will be created.
});

//create car model
class Car extends Model { }
Car.init({
    // attributes
    plate: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    },
    model: {
        type: Sequelize.STRING,
        // allowNull defaults to true
        allowNull: false
    }
}, {
    sequelize: connection,
    modelName: 'car',
    // options
    timestamps: true //Here `timestamps` is directly set to true, so the `createdAt` and `updatedAt` fields will be created.
});

//foreign key between car and model
Car.belongsTo(Maker); // Will add a MakerId attribute to Car to hold the primary key value for Maker

//Synchronizing models with the database
connection.sync();


//crud actions

//Makers
const listMakers = function (callback) {
    Maker.findAll().then(makers => {
        jsonRes = JSON.stringify(makers, null, 4);
        //console.log(jsonRes);
        callback(jsonRes);
    })
}

// Create a new Maker
const createVW = function (callback) {
    Maker.create({
        name: "VW",
        country: "Germany"
    }).then(vw => {
        callback("VW's auto-generated ID:" + vw.id);
    })
}

// Delete maker named "VW"
const deleteVW = function () {
    Maker.destroy({
        where: {
            name: "VW"
        }
    }).then(() => {
        console.log("Done");
    })
}

const getCarIdByName = function (callback, thename) {
    console.log('getCarIdByName', thename);
    Maker.findOne({
        where: { name: thename },
        attributes: ['id']
    }).then(maker => {
        callback(maker.id);
    }
    );
}

// Change vw to country in portuguese
const updateVWtoPT = function () {
    Maker.update({ country: "Alemanha" }, {
        where: {
            name: 'VW'
        }
    }).then(() => {
        console.log("Done");
    })
}

//Cars
const listCars = function (callback) {
    Car.findAll().then(cars => {
        callback(JSON.stringify(cars, null, 4));
    })
}

// Create a new car
const createMyGolf = function (theMakerId, callback) {
    console.log('Create my golf for the maker id:', theMakerId);
    Car.create({
        plate: "96-99-NE",
        model: "Golf",
        makerId: theMakerId
    }).then(golf => {
        callback("Golf's auto-generated ID:" + golf.id);
    })
}

// Delete car with plate "96-99-NE"
const deleteMyGolf = function () {
    Car.destroy({
        where: {
            plate: "96-99-NE"
        }
    }).then(() => {
        console.log("Done");
    })
}

exports.createVW = createVW;
exports.listMakers = listMakers;
exports.updateVWtoPT = updateVWtoPT;
exports.deleteVW = deleteVW;
exports.getCarIdByName = getCarIdByName;

exports.createMyGolf = createMyGolf;
exports.listCars = listCars;
exports.deleteMyGolf = deleteMyGolf;