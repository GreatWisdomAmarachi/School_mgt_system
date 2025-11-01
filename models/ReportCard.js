const mongoose =  require('mongoose');

const ResultCardSchema = new mongoose.Schema(
    {
    studentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Student",
        required: true
    },
    klassId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Klass",
        required: true
    },
    sessionId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Session",
        required: true
    },
    termId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Term",
        required: true
    },
    resultId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Result",
        required: true
    },
    teacherRemark: {
        type: String,
        trim: true,
    },
    principalRemark: {
        type: String,
        trim: true,
    },
    overallGrade: {
        type: String,
        trim: true,
    },
    position: {
        type: Number,
    },
},
    { timestamps: true }
);
 module.exports = mongoose.model("ResultCard", ResultCardSchema);