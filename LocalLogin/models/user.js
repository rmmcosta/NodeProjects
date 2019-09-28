const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const schema = mongoose.Schema;

mongoose.set('useCreateIndex', true);

const userSchema = new schema({
    username: {
        type: String,
        index: true
    },
    password: String,
    email: String,
    name: {
        first: String,
        last: String
    }
});

const userDoc = module.exports.user = mongoose.model('user', userSchema);

const createUser = function (newUser, callback) {
    console.log(newUser.password);
    //generate password
    bcrypt.genSalt(10, function (err, salt) {
        //generate hash
        bcrypt.hash(newUser.password, salt, function (err, hash) {
            //update password
            newUser.password = hash;
            console.log(newUser.password);
            //save the user in the database
            newUser.save(callback);
        });
    });
};

const getUserByUsername = function (theusername, callback) {
    console.log('getUserByUsername');
    console.log(theusername);
    userDoc.findOne({ username: theusername }, callback);
};

const verifyPassword = function (passwordgiven, passwordstored, callback) {
    console.log('passwords:' + passwordgiven + "," + passwordstored);
    // Load hash from your password DB.
    return bcrypt.compare(passwordgiven, passwordstored, callback);
};

module.exports.createUser = createUser;

module.exports.getUserByUsername = getUserByUsername;

module.exports.verifyPassword = verifyPassword;