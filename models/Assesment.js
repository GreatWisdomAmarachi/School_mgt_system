const mongoose =  require('mongoose');

const AssessmentSchema = new mongoose.Schema(
    {
    studentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Student",
        required: true
    },
    subjectId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Subject",
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
    quiz: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "AssessmentsItem",
        required: true
    },
    test: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "AssessmentsItem",
        required: true
    },
    exam: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "AssessmentsItem",
        required: true,
    },
    totalScore: {
        type: Number,
        default: 0,
    },
    grade: {
        type: String,
    },
    remark: {
        type: String,
    },
},
    { timestamps: true }
);
 module.exports = mongoose.model("Assessment", AssessmentSchema);