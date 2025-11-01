const Teacher = require('../models/Teacher')
const User = require('../models/User')
const Level = require('../models/Level')

exports.createTeacher = async (req, res) => {
    const { userId, levelId, subjects, specialization} = req.body;
    if (userId === undefined || userId === '') {
        return res.status(400).json({ message: 'User ID is required' })
    }
    const user = await User.findById(userId);
    if (!user) {
        return res.status(400).json({ message: 'User not found' })
    }
    const level = await Level.findById(levelId);
    if(!level){
        return res.status(400).json({ message: 'Level not found'})
    }
    if (levelId === undefined || levelId === '') {
    return res.status(400).json({ message: 'level is required' })
    }
    const existingTeacher = await Teacher.findOne({ userId: userId });
    if (existingTeacher) {
        return res.status(400).json({ message: 'Teacher already exists' })
    }
    if (!subjects || subjects.length === 0){
        return res.status(400).json({ message: 'Subjects are required'})
    }
    if (!specialization || specialization === '') {
        return res.status(400).json({ message: 'Specialization is required'})
    }
    const teacher= new Teacher({
        userId: userId,
        levelId: levelId,
        subjects: subjects,
        specialization: specialization,
    });
    try {
        const newteacher = await teacher.save();
        res.status(201).json(newteacher)
    } catch (error) {
        res.status(400).json({ message: error.message});
    }
}
exports.getAllTeacher = async (req, res) => {
    try{
        const teacher = await Teacher.find().populate('userId', 'levelId');
        res.status(200).json(teacher);
    } catch (error) {
        res.status(500).json({ message: error.message});
    }
}
exports.getTeacher = async (req, res) => {
    try {
        const teacher = await teacher.findById(req.params.id).populate('userId', 'levelId')
        res.status(200).json(teacher)
    } catch (error) {
        res.status(500).json({ message: error.message});
    }
}

exports.updateTeacher = async (req, res) => {
    try {
        const teacher = await Teacher.findById(req.params.id);
        if (!teacher) {
            return res.status(400).json({ message: 'Teacher not found' });
        }

        const { userId, levelId, subjectId, specialization } = req.body;

        if (levelId !== undefined) {
            teacher.levelId = levelId;
        }

        if (subjectId !== undefined) {
            teacher.subjectId = Array.isArray(subjectId) ? subjectId : [subjectId]; 
        }

        if (specialization !== undefined) {
            teacher.specialization = specialization;
        }

        if (userId !== undefined) {
            const user = await User.findById(userId);
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }
            teacher.userId = userId;
        }

        const updatedTeacher = await teacher.save();
        res.status(200).json(updatedTeacher);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.deleteTeacher = async (req, res) => {
    try {
        const teacher = await Teacher.findById(req.params.id);
        if (!teacher) { return res.status(400).json({ message: 'Teacher not found'})};
        await Teacher.deleteOne({_id: req.params.id});
        res.status(200).json({ message: 'Teacher deleted successfully'});
    } catch(error) {
        res.status(500).json({ message: error.message})
    }
}