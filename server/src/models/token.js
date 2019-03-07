const mongoose = require('mongoose');

// Setup schema
let tokensSchema = mongoose.Schema({
    value : {
        type: String,
        required: true
    },
    user : {
        type: String,
        required: true
    }
});

// Export Tokens model
let Tokens = module.exports = mongoose.model('tokens', tokensSchema);

module.exports.get = function (callback) {
    Tokens.find(callback);
};
