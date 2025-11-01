const express = require('express');
const router = express.Router();
const QuizController = require('../controllers/quiz_view')
const authenticateToken = require('../middleware/authenticateToken');
const verifyRoles = require('../middleware/verifyRole');
const roleList = require('../models/helper/roleList');

router.route('/create')
    .post(
        authenticateToken,
        verifyRoles(
            roleList.Admin,
            roleList.School_admin,
            roleList.Teacher
        ),
        QuizController.createQuiz
    );
router.route('/all')
    .get(
        authenticateToken,
        verifyRoles(
            roleList.Admin,
            roleList.School_admin,
            roleList.Principal,
            roleList.Vice_principal,
            roleList.Headteacher,
            roleList.Vice_headteacher,
            roleList.Dean_of_study,
        ),
        QuizController.getAllQuizzes
    );
router.route('/:id/get')
    .get(
        authenticateToken,
        verifyRoles(
            roleList.Admin,
            roleList.School_admin,
            roleList.Teacher,
            roleList.Student,
        ),
        QuizController.getQuizById
    );

router.route('/klass/:klassId/get')
    .get(
        authenticateToken,
        verifyRoles(
            roleList.Admin,
            roleList.School_admin,
            roleList.Teacher,
            roleList.Student,
            roleList.Principal,
            roleList.Vice_principal,
            roleList.Headteacher,
            roleList.Vice_headteacher,
            roleList.Dean_of_study
        ),
        QuizController.getAllQuizzesByClass
    );

router.route('/klass/:klassId/term/:termId/get')
    .get(
        authenticateToken,
        verifyRoles(
            roleList.Admin,
            roleList.School_admin,
            roleList.Teacher,
            roleList.Principal,
            roleList.Vice_principal,
            roleList.Headteacher,
            roleList.Vice_headteacher,
        ),
        QuizController.getQuizzesByClassAndTerm
    );

router.route('/klass/:klassId/session/:sessionId/get')
    .get(
        authenticateToken,
        verifyRoles(
            roleList.Admin,
            roleList.School_admin,
            roleList.Teacher,
            roleList.Principal,
            roleList.Vice_principal,
            roleList.Headteacher,
            roleList.Vice_headteacher,
        ),
        QuizController.getQuizzesByClassAndSession
    );

router.route('/klass/:klassId/subject/:subjectId/get')
    .get(
        authenticateToken,
        verifyRoles(
            roleList.Admin,
            roleList.School_admin,
            roleList.Teacher,
            roleList.Principal,
            roleList.Vice_principal,
            roleList.Headteacher,
            roleList.Vice_headteacher,
        ),
        QuizController.getQuizzesBySubjectAndClass
    );

router.route('/:id/update')
    .put(
        authenticateToken,
        verifyRoles(
            roleList.Admin,
            roleList.School_admin,
            roleList.Teacher
        ),
        QuizController.updateQuiz
    );
router.route('/:id/delete')
    .delete(
        authenticateToken,
        verifyRoles(
            roleList.Admin,
            roleList.School_admin,
            roleList.Teacher
        ),
        QuizController.deleteQuiz
    );

module.exports = router;