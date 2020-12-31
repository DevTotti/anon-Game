const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const gameResponse = new Schema({
    subGameId: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    response: {
        type: String,
        required: true
    }
}, {timestamps: true});

const responseModel = mongoose.model('response', gameResponse);

module.exports = responseModel;