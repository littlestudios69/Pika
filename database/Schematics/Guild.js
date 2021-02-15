const mongoose = require('mongoose'),
config = require('./../../config.json');

module.exports = mongoose.model('Guild', new mongoose.Schema({
    id: { type: String },
    prefix: { type: String, default: config.prefix },
    global_state: {type: String, default: "off"},
    global: {type: String, default: "none"},
    premium: {type: String, default: "false"},
    ticket: { type: String, default: "none"},
    ticketmsg: { type: String, default: "none"},
    ticketrole: { type: String, default: "none"},
    log_state: {type: String, default: "off"},
    logs: {type: String, default: "none"},
}));
