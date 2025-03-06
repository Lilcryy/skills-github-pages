// models/Lobby.js
const mongoose = require('mongoose');

const LobbySchema = new mongoose.Schema({
    id: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    betAmount: {
        type: Number,
        required: true
    },
    rounds: {
        type: Number,
        required: true
    },
    players: {
        type: [String], // Array of socket IDs
        default: []
    },
    status: {
        type: String,
        enum: ['waiting', 'playing', 'finished'],
        default: 'waiting'
    },
    coinFlipResult: {
        type: String,
        enum: ['heads', 'tails', null],
        default: null
    }
});

module.exports = mongoose.model('Lobby', LobbySchema);
