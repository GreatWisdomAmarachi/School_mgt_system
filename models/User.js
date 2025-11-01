const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    title:{
        type: String,
        enum:['Mr', 'Mrs', 'Master', 'Miss','Dr','Prof', 'Honorable', 'Dev']
    },
    surname: {
        type: String,
        required: true
    },
    middlename:{
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
        trim: true
    },
    role: {
        type: String,
        enum: ['Admin', 'School_admin', 'Properietor', 'Properietress', 'Principal', 'VicePrincipal', 'HeadTeacher', 'ViceHeadteacher', 'Bursar', 'Auditor', 'Teacher','DeanOfStudy', 'Student', 'Parent'],
        required: true,
    },
    staffNo: {
        type: String,
    },
    regNo: {
        type: String,
    },
    address: {
        type:String,
    },
    isActive: {
        type: Boolean,
        default: true,
    },
    phone: {
        type: String,
        required: true
    }
}, { timestamps: true})

module.exports = mongoose.model('User', UserSchema);