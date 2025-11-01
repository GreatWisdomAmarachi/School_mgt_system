const express = require('express');
const router = express.Router();
const teacherController = require('../controllers/teacher_view')
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
        teacherController.createTeacher
    )
router.route('/all')
    .get(
        authenticateToken,
        verifyRoles(
            roleList.Admin,
            roleList.School_admin,
        ),
        teacherController.getAllTeacher
    );
router.route('/:id/get')
    .get(
        authenticateToken,
        verifyRoles(
            roleList.Admin,
            roleList.School_admin,
            roleList.Teacher,
        ),
        teacherController.getTeacher
    );
router.route('/:id/update')
    .put(
        authenticateToken,
        verifyRoles(
            roleList.Admin,
            roleList.School_admin,
            roleList.Teacher,
        ),
        teacherController.updateTeacher
    );
router.route('/:id/delete')
    .delete(
        authenticateToken,
        verifyRoles(
            roleList.Admin,
            roleList.School_admin,
        ),
        teacherController.deleteTeacher
    );

module.exports = router;