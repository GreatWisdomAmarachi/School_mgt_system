const mongoose =  require('mongoose');
const ExamQuestionSchema = new mongoose.Schema({
    examquestionText: {
        type: String,
        required: true
    },
    options: {
        type: [String],
        required: true
    },
    correctAnwser: {
        type: String,
        required: true
    },
    marks: {
        type: Number,
        default: 1
    }
})

const ExamSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
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
    questions: [ExamQuestionSchema],
    duration: {
        type: Number,
        default: 30
    },
    status: {
        type: String,
        enum: ["draft", "published", "Closed"],
        default: "Draft"
    },
    created_by: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    created_at: {
        type: Date,
        default: Date.now
    },
});

ExamSchema.pre("save", function (next) {
     if (this.questions.length > 0) {
    this.maxScore = this.questions.reduce((total, question) => total + question.marks, 0);
 }
 next();
});

 module.exports = mongoose.model("Exam", ExamSchema);