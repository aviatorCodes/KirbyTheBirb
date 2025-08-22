const mongoose = require('mongoose')
const bSchema = mongoose.Schema({
    userId: {
        type: String,
        require: true
    },
    blacklisted: {
        type: Boolean,
        default: false
    }
})

module.exports = mongoose.model('blacklist', bSchema)