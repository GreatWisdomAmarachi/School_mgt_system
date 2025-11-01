const express = require('express');
const router = express.Router()
const SubjectController = require('../controllers/subject_view')
const authenticateToken = require('../middleware/authenticateToken');
const verifyRoles = require('../middleware/verifyRole');
const roleList = require('../models/helper/roleList');

router.route("/create")
    .post(
        authenticateToken,
        verifyRoles(
            roleList.Admin,
            roleList.School_admin,
            roleList.Teacher
        ),
        SubjectController.createSubject
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
            roleList.Teacher
        ),
        SubjectController.getAllSubjects
    );
router.route('/:id/get')
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
            roleList.Teacher,
            roleList.Student
        ),
        SubjectController.getSubject
    );
router.route('/klass/:klassId/all')
    .get(
        authenticateToken,
        verifyRoles(
            roleList.Admin,
            roleList.School_admin,
            roleList.Principal,
            roleList.Teacher,
            roleList.Headteacher,
            roleList.Student,
            roleList.Parent
        ),
        SubjectController.getSubjectsKlass
    );
router.route('/teacher/:teacherId/get')
    .get(
        authenticateToken,
        verifyRoles(
            roleList.Admin,
            roleList.School_admin,
            roleList.Teacher,
            roleList.Principal,
            roleList.Headteacher,
            roleList.Vice_headteacher,
            roleList.Dean_of_study,
            roleList.Vice_principal
        ),
        SubjectController.getTeacherSubjects
    );
router.route('/:id/update')
    .put(
        authenticateToken,
        verifyRoles(
            roleList.Admin,
            roleList.School_admin,
            roleList.Dean_of_study,
            roleList.Teacher,
            roleList.Principal,
            roleList.Vice_principal,
            roleList.Headteacher,
            roleList.Vice_headteacher
        ),
        SubjectController.updateSubject
    ),
    router.delete('/:id/delete', SubjectController.deleteSubject);

module.exports = router;