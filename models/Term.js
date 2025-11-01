const mongoose = require('mongoose')

const TermSchema = new mongoose.Schema({
    sessionId: {
        type: mongoose.Schema.Types.ObjectId,
        ref:'Session',
        require: true,
        trim: true,
    },
    name:{
        type: String,
        require:true,
        trim:true,
    },
    startDate:{
        type:Date,
        require:true,
    },
    endDate:{
        type:Date,
        require:true,
    },
    isCurrent:{
        type: Boolean,
        require:true,
        default:true,
    }
}, { timestamps: true })

module.exports = mongoose.model('Term', TermSchema)