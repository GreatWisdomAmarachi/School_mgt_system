const express = require('express');
const router = express.Router();
const reportCardController = require('../controllers/reportCard_view')

router.post('/create',reportCardController.createReportCard);
router.get('/all', reportCardController.getAllReportCards);
router.get('/:id/get', reportCardController.getReportCardById);
router.post('/klass/:klassId/get',reportCardController.getReportCardsByClass);
router.get('/klass/:klassId/term/:termId/get', reportCardController.getReportCardsByClassAndTerm);
router.get('/klass/:klassId/session/:sessionId/get', reportCardController.getReportCardsByClassAndSession);
router.put('/:id/update', reportCardController.updateReportCard);
router.delete('/:id/delete',reportCardController.deleteReportCard);

module.exports = router;