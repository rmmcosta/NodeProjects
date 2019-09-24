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

const userdoc = module.exports.user = mongoose.model('user', userSchema);

const createUser = function (newUser, callback) {
    //generate password
    bcrypt.genSalt(10, function (err, salt) {
        //generate hash
        bcrypt.hash(newUser.password, salt, function (err, hash) {
            //update password
            newUser.password = hash;
            //save the user in the database
            newUser.save(callback);
        });
    });
};

const getUserByUsername = function (username, callback) {
    console.log('getUserByUsername');
    userdoc.findOne({ username: username }, callback);
};

const verifyPassword = function (passwordgiven, passwordstored) {
    // Load hash from your password DB.
    bcrypt.compare(passwordgiven, passwordstored, function (err, res) {
        return res === true;
    });
};

module.exports.createUser = createUser;

module.exports.getUserByUsername = getUserByUsername;

module.exports.verifyPassword = verifyPassword;