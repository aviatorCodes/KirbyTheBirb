const mongoose = require('mongoose')

const prefixSchema = mongoose.Schema({
    _id: {
        type: String,
        require: true
    },
    newPrefix: {
        type: String,
        require: true
    }
})

const model = mongoose.model('prefixes', prefixSchema)
module.exports = model; 