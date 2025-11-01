const express = require('express');
const router = express.Router();
const AssessmentController = require('../controllers/assessment_view');
const authenticateToken = require('../middleware/authenticateToken');
const verifyRoles = require('../middleware/verifyRole');
const roleList = require('../models/helper/roleList');

router.route('/create')
    .post(
        authenticateToken,
        verifyRoles(
            roleList.Teacher,
            roleList.School_admin,
            roleList.Admin,
            roleList.Dean_of_study,
        ),
        AssessmentController.createAssessment
    )
router.route('/all')
    .get(
        authenticateToken,
        verifyRoles(
            roleList.Admin,
            roleList.Principal,
            roleList.Vice_principal,
            roleList.Headteacher,
            roleList.Vice_headteacher,
        ),
        AssessmentController.getAllAssessments
    )
router.route('/:id/get')
    .get(
        authenticateToken,
        verifyRoles(
            roleList.Admin,
            roleList.School_admin,
            roleList.Student,
            roleList.Teacher,
            roleList.Principal,
            roleList.Vice_principal,
            roleList.Headteacher,
            roleList.Vice_headteacher,
            roleList.Dean_of_study,
        ),
        AssessmentController.getAllAssessmentById
    )
router.route('/student/:studentId/get')
    .get(
        authenticateToken,
        verifyRoles(
            roleList.Admin,
            roleList.School_admin,
            roleList.Principal,
            roleList.Vice_principal,
            roleList.Headteacher,
            roleList.Vice_headteacher,
            roleList.Teacher,
            roleList.Student,
            roleList.Dean_of_study,
            roleList.Parent,
        ),
        AssessmentController.getStudentAssessments
    )
router.route('/:id/update')
    .put(
        authenticateToken,
        verifyRoles(
            roleList.Teacher,
            roleList.School_admin,
            roleList.Admin,
            roleList.Dean_of_study,
        ),
        AssessmentController.updateAssessment
    )
router.route('/:id/delete')
    .delete(
        authenticateToken,
        verifyRoles(
            roleList.Teacher,
            roleList.School_admin,
            roleList.Admin,
            roleList.Dean_of_study,
        ),
        AssessmentController.deleteAssessment
    )
    
module.exports = router