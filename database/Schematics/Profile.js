const mongoose = require('mongoose')

const profileSchema = mongoose.Schema({
    userId: {
        type: String,
        required: true,
    },
    job: {
        type: String,
        required: true,
        default: "Unemployed"
    },
    bank: {
        type: Number, 
        required: true,
        default: 0,
    },
    wallet: {
        type: Number, 
        required: true,
        default: 0,
    },
    inventory: {
        type: [Object],
        required: true,
    },
    coinflipCooldown: {
        type: Date,
        required: true,
        default: Date.now(),
    },
    dailyCooldown: {
        type: Date,
        required: true,
        default: Date.now(),
    },
    workCooldown: {
        type: Date,
        required: true,
        default: Date.now(),
    },
    weeklyCooldown: {
        type: Date,
        required: true,
        default: Date.now(),
    },
    monthlyCooldown: {
        type: Date,
        required: true,
        default: Date.now(),
    },
    hourlyCooldown: {
        type: Date,
        required: true,
        default: Date.now(),
    },
    scavengeCooldown: {
        type: Date,
        required: true,
        default: Date.now(),
    },
    robCooldown: {
        type: Date,
        required: true,
        default: Date.now(),
    },
    bankRobCooldown: {
        type: Date,
        required: true,
        default: Date.now(),
    },
    multiplier: {
        type: Number, 
        required: true,
        default: 1,
    },
    prestigeLevel: {
        type: Number,
        required: true,
        default: 0,
    },
      
})

module.exports = mongoose.model('profiles', profileSchema)