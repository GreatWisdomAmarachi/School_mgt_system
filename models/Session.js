const mongoose = require('mongoose')

const SessionSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true, 
    },
    isCurrent: {
        type: Boolean,
        default: true,
        require: true,
    },
    createdAt:{
        type: Date,
        default: Date.now
    }
}, { timestamps: true})

module.exports = mongoose.model('Session', SessionSchema);