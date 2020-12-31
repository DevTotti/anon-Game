const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const gameSchema = new Schema({
    _id: mongoose.Schema.ObjectId,
    mainGame: {
        type: String,
        required: true
    },
    game: {
        type: String,
        required: true
    }
}, {timestamp: true});

const gameModel = mongoose.model('subgame',gameSchema);

module.exports = gameModel;