const mongoose = require('mongoose');

module.exports = mongoose.model('User', new mongoose.Schema({
    id: { type: String },
    rank: {type: String, default: "Member"},
    msg_count: {type: Number, default: 0},
    premium: {type: String, default: "false"},
    exp: {type: Number, default: 0},
    level: {type: Number, default: 1},
    needed: {type: Number, default: 100},
}));
