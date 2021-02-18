const mongoose = require('mongoose');
const { mongoDB } = require('./config.json')

module.exports = async () => {
    await mongoose.connect(mongoDB, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    return mongoose
}