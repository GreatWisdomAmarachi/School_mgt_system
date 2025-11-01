const mongoose = require('mongoose')

const KlassSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: true
    },
    klasstitle: {
        type: String,
        trim: true,
        required: true
    },
    levelId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Level',
        trim: true,
        required: true
    },
    teacherId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'teacher',
        trim: true,
        required: true
    }
})
module.exports = mongoose.model('Klass', KlassSchema)