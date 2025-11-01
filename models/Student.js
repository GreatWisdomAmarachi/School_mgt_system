const mongoose = require('mongoose')

const StudentSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        trim: true,
        required: true
    },
    klassId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Klass',
        required: true,
        trim: true
    },
    regNo: {
        type: [String],
        required: true,
        trim: true
    },
    
    parentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        trim: true
    }
}, { timestamps: true })

module.exports = mongoose.model('Student', StudentSchema)