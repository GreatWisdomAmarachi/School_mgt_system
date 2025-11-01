const express = require('express');
const router = express.Router();
const TimetableController = require('../controllers/timetable_view')
const authenticateToken = require('../middleware/authenticateToken');
const verifyRoles = require('../middleware/verifyRole');
const roleList = require('../models/helper/roleList');

router.route('/create')
    .post(
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
        TimetableController.createTimetable
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
            roleList.Teacher
        ),
        TimetableController.getAllTimetables
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
            roleList.Teacher,
            roleList.Student,
        ),
        TimetableController.getTimetabelById
    );

router.route('/class/:klassId/all')
    .get(
        authenticateToken,
        verifyRoles(
            roleList.Admin,
            roleList.School_admin,
            roleList.Principal,
            roleList.Vice_principal,
            roleList.Principal,
            roleList.Vice_principal,
            roleList.Student,
            roleList.Teacher,   
            roleList.Dean_of_study,
            roleList.Headteacher,
            roleList.Vice_headteacher,
            roleList.Parent
        ),
        TimetableController.getClassTimetables
    );


router.route('/teacher/:teacherId/all')
    .get(
        authenticateToken,
        verifyRoles(
            roleList.Admin,
            roleList.School_admin,
            roleList.Principal,
            roleList.Vice_principal,
            roleList.Headteacher,
            roleList.Vice_headteacher,
            roleList.Teacher
        ),
        TimetableController.getTeacherTimetables
    );
router.route('/day/:day/get')
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
        ),
        TimetableController.getTimetabelByDay
    );
router.route(':id/update')
    .put(
        authenticateToken,
        verifyRoles(
            roleList.Admin,
            roleList.School_admin,
            roleList.Principal,
            roleList.Vice_principal,
            roleList.Headteacher,
            roleList.Vice_headteacher,
            roleList.Teacher,
            roleList.Dean_of_study,
        ),
        TimetableController.updateTimetable
    );

router.route('/:id/delete')
    .delete(
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
        TimetableController.deleteTimetable
    );
module.exports = router;