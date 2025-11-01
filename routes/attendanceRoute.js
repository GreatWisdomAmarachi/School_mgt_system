const express = require('express');
const router = express.Router();
const AttendanceController = require('../controllers/attendance_view')
const authenticateToken = require('../middleware/authenticateToken');
const verifyRoles = require('../middleware/verifyRole');
const roleList = require('../models/helper/roleList');

router.route('/create')
    .post(
        authenticateToken,
        verifyRoles(
            roleList.Admin,
            roleList.School_admin,
            roleList.Teacher,
        ),
        AttendanceController.createAttendance
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
            roleList.Vice_headteacher
        ),
        AttendanceController.getAllAttendances
    );
    
router.route('/:id/get')
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
        AttendanceController.getAttendanceById
    );
    
router.route('/klass/:klassId/date/:dateId/get')
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
        AttendanceController.getAttendanceByClassAndDate
    );

router.route('/klass/:klassId/session/:sessionId/get')
    .get(
        authenticateToken,
        verifyRoles(
            roleList.Admin,
            roleList.School_admin,
            roleList.Principal,
            roleList.Vice_principal,
            roleList.Headteacher,
            roleList.Vice_headteacher,
        ),
        AttendanceController.getAttendanceByClassAndSession
    );
    
router.route('/klass/:klassId/term/:termId/get')
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
        AttendanceController.getAttendanceByClassAndTerm
    );

router.route('/klass/:klassId/get')
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
        ),
        AttendanceController.getAttendanceInClass
    );
    
router.route('/term/:termId/get')
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
        AttendanceController.getAttendancesInTerm
    );
    
router.route('/:id/update')
    .put(
        authenticateToken,
        verifyRoles(
            roleList.Admin,
            roleList.School_admin,
            roleList.Teacher,
        ),
        AttendanceController.updateAttendance
    );
    
router.route('/:id/delete')
    .delete(
        authenticateToken,
        verifyRoles(
            roleList.Admin,
            roleList.School_admin,
            roleList.Teacher,
        ),
        AttendanceController.deleteAttendance
    );

module.exports = router;