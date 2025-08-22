const mongoose = require('mongoose')

const afkSchema = mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    guildId: {
        type: String,
        required: true
    },
    afk: {
        type: Boolean,
        default: false
    },
    afk_reason: {
        type: String,
        default: null
    }
})

module.exports = mongoose.model('afk', afkSchema)