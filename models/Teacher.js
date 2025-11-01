const mongoose = require('mongoose')

const TeacherSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        trim: true,
        required: true
    },
    levelId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Level',
        type: String,
        required: true,
        trim: true
    },
    subjectId: {
        type: [String],
        required: true,
        trim: true
    },
    specialization: {
        type: String,
        required: true,
        trim: true
    }
}, { timestamps: true })

module.exports = mongoose.model('Teacher', TeacherSchema)