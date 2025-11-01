const ReportCard = require("../models/ReportCard");
const Result = require("../models/Result");
const { getGrade, calculatePositions} = require("../models/helper/reportCardHelper");

exports.createReportCard = async (req, res) => {
    try {
        const { studentId, klassId, sessionId, termId, resultId, teacherRemark, principalRemark } = req.body;

        const studentResult = await Result.findById(resultId);
        if (!studentResult) {
            return res.status(404).json({ message: "Result not found" });
        }

        const overallGrade = getGrade(studentResult.totalScore);

        const reportCard = new ReportCard({
            studentId,
            klassId,
            sessionId,
            termId,
            resultId,
            overallGrade,
            teacherRemark,
            principalRemark
        });
        await reportCard.save();
        res.status(201).json({ message: "Report Card created successfully", reportCard });
    } catch (error) {
        res.status(500).json({ message: "Error creating Report Card", error: error.message });
    }
};

exports.getAllReportCards = async (req, res) => {
    try {
        const reportCards = await ReportCard.find()
            .populate("studentId klassId sessionId termId resultId");

        res.status(200).json(reportCards);
    }catch (error) {
        res.status(500).json({ message: "Error fetching Report Cards", error: error.message });
    }
    
};
exports.getReportCardById = async (req, res) => {
    try {
        const reportCard = await ReportCard.findById(req.params.id)
            .populate("studentId klassId sessionId termId resultId");

        if (!reportCard) return res.status(404).json({ message: "Report Card not found" });
        res.status(200).json(reportCard);
    } catch (error) {
        res.status(500).json({ message: "Error fetching Report Card", error: error.message });
    }    
};
exports.updateReportCard = async (req, res) => {
    try {
        const updateData = { ...req.body };
        if (updateData.resultId) {
            const studentResult = await Result.findById(updateData.resultId);
            if (!studentResult) {
                return res.status(404).json({ message: "Result not found" });
            }
            updateData.overallGrade = getGrade(studentResult.totalScore);
        }

        const reportCard = await ReportCard.findByIdAndUpdate(req.params.id, updateData, { new: true })
            .populate("studentId klassId sessionId termId resultId");

        if (!reportCard) return res.status(404).json({ message: "Report Card not found" });
        res.status(200).json({ message: "Report Card updated successfully", reportCard });
    } catch (error) {
        res.status(500).json({ message: "Error updating Report Card", error: error.message });
    }
};

exports.deleteReportCard = async (req, res) => {
    try {
        const reportCard = await ReportCard.findByIdAndDelete(req.params.id);
        if (!reportCard) return res.status(404).json({ message: "Report Card not found" });

        res.status(200).json({ message: "Report Card deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting Report Card", error: error.message });
    }
};
exports.getReportCardsByClass = async (req, res) => {
    try {
        const { klassId } = req.params;
        let reportCards = await ReportCard.find({ klassId })
            .populate("studentId klassId sessionId termId resultId");

            reportCards = calculatePositions(reportCards);

        res.status(200).json(reportCards);
    } catch (error) {
        res.status(500).json({ message: "Error fetching Report Cards for class", error: error.message });
    }
};
exports.getReportCardsByClassAndTerm = async (req, res) => {
    try {
        const { klassId, termId } = req.params;
        let reportCards = await ReportCard.find({ klassId, termId })
            .populate("studentId klassId sessionId termId resultId");

            reportCards = calculatePositions(reportCards);

        res.status(200).json(reportCards);
    } catch (error) {
        res.status(500).json({ message: "Error fetching Report Cards for this term", error: error.message });
    }
};
exports.getReportCardsByClassAndSession = async (req, res) => {
    try {
        const { klassId, sessionId } = req.query;
        let reportCards = await ReportCard.find({ klassId, sessionId })
            .populate("studentId klassId sessionId termId resultId");

            reportCards = calculatePositions(reportCards);

        res.status(200).json(reportCards);
    } catch (error) {
        res.status(500).json({ message: "Error fetching class session report cards", error: error.message });
    }
};