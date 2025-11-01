const Subject = require('../models/Subject')
const Klass = require('../models/Klass')
const Teacher = require('../models/Teacher')

exports.createSubject = async (req, res) => {
    const { name, klassId, teacherId} = req.body;
    if (!name) {
        return res.status(400).json({ message: 'Name is required' });
    }
    if(!klassId){
        return res.status(400).json({ message: 'ClassId is required'});
    }
    if (!teacherId) {
        return res.status(400).json({ message: 'Teacher ID are required'});
    }
    const teacher = await Teacher.findById(teacherId);
    if(!teacher) {
        return res.status(400).json({ message: 'Teacher not found'});
    }
    const klass = await Klass.findById(klassId);
    if (!klass) {
        return res.status(400).json({ message: 'class not found'});
    }
    const existingSubject = await Subject.findOne({ name, klassId, teacherId});
    if (existingSubject) {
        return res.status(400).json({ message: 'This subject is already assigned to this teacher in this class'});
    }
    const subject = new Subject({
        name,
        klassId,
        teacherId,
    });
    try {
        const newSubject = await subject.save();
        res.status(201).json(newSubject);
    } catch (error) {
        res.status(400).json({ message: error.message});
    }
}
exports.getAllSubjects = async (req, res) => {
    try{
        const subjects = await Subject.find()
        .populate('name', 'klassId')
        .populate('teacherId', 'name email');
        res.status(200).json(subjects);
    } catch (error) {
        res.status(500).json({ message: error.message});
    }
}
exports.getSubject = async (req, res) => {
    try {
        const subject = await Subject.findById(req.params.id)
        .populate('name', 'klassId')
        .populate('teacherId', 'name email');
    if (!subject) {
        return res.status(404).json({ message: 'Subject not found'});
    }
        res.status(200).json(subject)
    } catch (error) {
        res.status(500).json({ message: error.message});
    }
};
exports.getSubjectsKlass = async (req, res) => {
    try {
        const { klassId } = req.params;
        const subjects = await Subject.find({ klassId })
            .populate('klassId', 'name')
            .populate('teacherId', 'name email');
        if (subjects.length === 0) {
            return res.status(404).json({ message: 'No subjects found for this class'});
        }
        res.status(200).json(subjects);
    } catch (error) {
        res.status(500).json({ message: error.message});
    }
};
exports.getTeacherSubjects = async (req, res) => {
    try{
        const { teacherId } = req.params;
        const subjects = await Subject.find({ teacherId })
            .populate('klassId', 'name')
            .populate('teacherId', 'name email');
        if  (subjects.length === 0) {
            return res.status(404).json({ message: 'No subjects found for this teacher'});
        }
        res.status(200).json(subjects);
    } catch (error) {
        res.status(500).json({ message: error.message});
    }
};

exports.updateSubject = async (req, res) => {
    try {
        const { name, KlassId , teacherId} = req.body;
        const subject = await Subject.findById(req.params.id);

        if (!subject) {
            return res.status(400).json({ message: 'Subject not found'})
        }
        if (name !== undefined) subject.name = name;
        if (klassId !== undefined) {
            const klass = await Klass.findById(klassId);
            if(!klass) {
                return res.status(404).json({ message: 'Class not found'});
            }
            subject.KlassId = klassId;
        }
        if (teacherId !== undefined) {
            const teacher = await Teacher.findById(teacherId);
            if (!teacher) {
                return res.status(404).json({ message: 'Teacher not found '});
            }
            subjects.teacherId = teacherId;
        }
        const updatedSubject = await subject.save();
        res.status(200).json(updatedSubject);
    }catch (error) {
        res.status(400).json({ message: error.message});
    }
};
exports.deleteSubject = async (req, res) => {
    try {
        const subject = await Subject.findByIdAndDelete(req.params.id);
        if (!subjects) { return res.status(400).json({ message: 'Subject not found'});
        }
        res.status(200).json({ message: 'Subjects deleted successfully'});
    } catch (error) {
        res.status(500).json({ message: error.message});
    }
};