const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const mainGameSchema = new Schema({
    _id: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    creator: {
        type: String,
        required: true
    },
    url: {
        type: String,
        required: true
    }
}, {timestamps: true});

const mainGameModel = mongoose.model('maingame', mainGameSchema);

module.exports = mainGameModel;