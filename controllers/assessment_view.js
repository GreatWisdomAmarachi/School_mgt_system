const AssessmentsItem = require('../models/AssessmentItem')
const Assessment = require('../models/Assesment')
const { calculateGradeAndRemark } = require('../models/helper/assessmentHelper');
const Session = require('../models/Session');
const Term = require('../models/Term');
const Klass = require('../models/Klass');
const Student = require('../models/Student');
const Subject = require('../models/Subject');

exports.createAssessment = async (req, res) => {
    try {

        const { studentId, subjectId, klassId, sessionId, termId, quiz, test, exam } = req.body;
        const session = await Session.findById(sessionId)
        if (!session) {
            return res.status(400).json({ message: 'Session not found' });
        }
        const term = await Term.findById(termId);
        if (!term) {
            return res.status(400).json({ message: 'Term not found' });
        }
        const klass = await Klass.findById(klassId);
        if (!klass) {
            return res.status(400).json({ message: 'Class not found' });
        }
        const student = await Student.findById(studentId)
        if (!student) {
            return res.status(400).json({ message: 'Student not found' });
        }
        const subject = await Subject.findById(subjectId)
        if (!subject) {
            return res.status(400).json({ message: 'Subject not found' });
        }
        const quizItem = await AssessmentsItem.findById(quiz);
        const testItem = await AssessmentsItem.findById(test);
        const examItem = await AssessmentsItem.findById(exam);

        if (!quizItem) return res.status(404).json({ message: 'Quiz item not found' });
if (!testItem) return res.status(404).json({ message: 'Test item not found' });
if (!examItem) return res.status(404).json({ message: 'Exam item not found' });

        const existingAssessment = await Assessment.findOne({ studentId, klassId, subjectId, sessionId, termId, quiz, test, exam });
        if (existingAssessment) {
            return res.status(400).json({ message: 'Assessment already exists' })
        }

        const totalScore = quizItem.score + testItem.score + examItem.score;
        const { grade, remark } = calculateGradeAndRemark(totalScore)
        const assessment = new Assessment({
            studentId,
            subjectId,
            klassId,
            sessionId,
            termId,
            quiz,
            test,
            exam,
            totalScore,
            grade,
            remark,
        });

        await assessment.save();
        res.status(201).json({
            success: true,
            message: 'Assessment created successfully',
            data: assessment,
        });
    } catch (err) {
        res.status(500).json({ success: false, message: "Error creating assessment ", error: err.message });
    }
};

exports.getAllAssessments = async (req, res) => {
    try {
        const assessments = await Assessment.find()
            .populate('studentId subjectId klassId sessionId termId quiz test exam');

        res.status(200).json({
            success: true,
            count: assessments.length,
            data: assessments,
        });
    } catch (err) {
        res.status(500).json({ success: false, message: 'Error fetching assessment', error: err.message });
    }
};
exports.getAllAssessmentById = async (req, res) => {
    try {
        const assessment = await Assessment.findById(req.params.id)
            .populate('studentId subjectId klassId sessionId termId quiz test exam');
        if (!assessment) return res.status(404).json({ message: 'Assessment not found' });

        res.status(200).json({ success: true, data: assessment });
    } catch (err) {
        res.status(500).json({ success: false, message: 'Error fetching assessment', error: err.message });
    }
}
exports.getStudentAssessments = async (req, res) => {
    try {
        const { studentId, subjectId, klassId, sessionId, termId } = req.query;

        const filters = {};
        if (studentId) filters.studentId = studentId;
        if (subjectId) filters.subjectId = subjectId;
        if (klassId) filters.klassId = klassId;
        if (sessionId) filters.sessionId = sessionId;
        if (termId) filters.termId = termId;

        const assessments = await Assessment.find({ filters })
            .populate('subjectId klassId sessionId termId created_by', 'name title username');

        res.status(200).json({ success: true, count: assessments.length, data: assessments });

    } catch (err) {
        res.status(500).json({
            success: false, message: 'Error fetching student assessments',
            error: err.message
        });
    };
}

exports.updateAssessment = async (req, res) => {
    try {
        const {quiz, test, exam} = req.body;

        let updateData = { ...req.body};
        if (quiz && test && exam) {
            const quizItem = await AssessmentsItem.findById(quiz);
            const testItem = await AssessmentsItem.findById(test);
            const examItem = await AssessmentsItem.findById(exam);
            
            if (!quizItem || !testItem || !examItem) {
                return res.status(404).json({ message: 'One or more assessment items not found'})
            }
            const totalScore = quizItem.score + testItem.score + examItem.score;
            const { grade, remark} = calculateGradeAndRemark(totalScore);

            updateData.totalScore = totalScore;
            updateData.grade = grade;
            updateData.remark = remark;
        }

        const assessment = await Assessment.findByIdAndUpdate(req.params.id ,updateData, { new: true})
            .populate('studentId subjectId klassId sessionId termId quiz test exam');

        if (!assessment) return res.status(404).json({ message: 'Assessment not found'});       
} catch (error) {
    res.status(500).json({ message: 'Error updating assessment', error: error.message});    
    }
};

exports.deleteAssessment = async (req, res) => {
    try {
        const assessment = await Assessment.findByIdAndDelete(req.params.id);
        if (!assessment) return res.status(400).json({ success: false, message: 'Assessment not found' });
        res.status(200).json({ success: true, message: 'Assessment deleted successfully' });
    } catch (err) {
        res.status(500).json({ success: false, message: 'Error deleting assessment ', error: err.message });
    }
};