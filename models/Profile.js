const mongoose = require("mongoose");

const ProfileSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        trim: true,
        required: true
    },
    img:{
        type: String
    },
    gender:{
        type: String,
        required: true,
        trim: true
    },
    DOB:{
        type: String,
        required: true
    },
    resetPasswordToken:{
        type: String
    },
    dateOfAdmission: {
        type: String,
    },
    gradutionYear:{
        type: String,
    },
    bio:{
        type: String,
        trim: true
    },
    contactAddress:{
        type: String,
        require: true
    },
}, { timestamps: true})

module.exports = mongoose.model('Profile', ProfileSchema);