const Quiz = require("../Quiz");

exports.calculateMaxScore = (questions) => {
    if (!questions || questions.length === 0) return 0;
    return questions.reduce((total, question) => total + question.marks, 0);
};

exports.findQuizById = async (Id) => {
    return await Quiz.findQuizById(Id)
    .populate("subject classLevel session term created_by")
    .exec()
};

exports.findAllQuizzes = async (filters = {}) => {
    return await Quiz.find(filters)
    .populate("subject classLevel session term created_by")
    .exec();
};