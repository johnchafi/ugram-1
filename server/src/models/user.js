const mongoose = require('mongoose');

// Setup schema
let usersSchema = mongoose.Schema({
        email: {
            type: String,
            required: true
        },
        firstName: {
            type: String,
            required: true
        },
        lastName: {
            type: String,
            required: true
        },
        phoneNumber: String,
        pictureUrl: {
            type: String,
            default: "https://i.stack.imgur.com/l60Hf.png"
        },
        registrationDate: {
            type: Date,
            default: Date.now()
        }
});

// Export Users model
let Users = module.exports = mongoose.model('users', usersSchema);

module.exports.get = function (callback) {
    Users.find(callback);
};
