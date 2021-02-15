const mongoose = require('mongoose');

module.exports = mongoose.model('Member', new mongoose.Schema({
    id: { type: String },
    guild: { type: String },
    msg_count: {type: Number, default: 0},
    ticketOpen: {type: "String", default: "none"},
    exp: {type: Number, default: 0},
    level: {type: Number, default: 1},
    needed: {type: Number, default: 100},
}));
