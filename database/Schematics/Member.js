const mongoose = require('mongoose');

module.exports = mongoose.model('Member', new mongoose.Schema({
    id: { type: String },
    guild: { type: String },
    rank: {type: String, default: "Member"},
    msg_count: {type: Number, default: 0},
    premium: {type: String, default: "false"}
}));
