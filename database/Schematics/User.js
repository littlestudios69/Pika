const mongoose = require('mongoose');

module.exports = mongoose.model('User', new mongoose.Schema({
    id: { type: String },
    rank: {type: String, default: "Member"},
    msg_count: {type: String, default: "0"},
    premium: {type: String, default: "false"}
}));
