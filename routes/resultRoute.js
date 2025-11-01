const express = require('express');
const router = express.Router();
const ResultController = require('../controllers/result_view')
const authenticateToken = require('../middleware/authenticateToken');
const verifyRoles = require('../middleware/verifyRole');
const roleList = require('../models/helper/roleList');

router.route('/create')
    .post(
        authenticateToken,
        verifyRoles(
            roleList.Teacher,
            roleList.School_admin,
            roleList.Dean_of_study
        ),
        ResultController.createResult
    )
router.route('/all')
    .get(
        authenticateToken,
        verifyRoles(
            roleList.Admin,
            roleList.School_admin,
            roleList.Dean_of_study,
            roleList.Principal,
            roleList.Vice_principal,
            roleList.Headteacher,
            roleList.Vice_headteacher
        ),
        ResultController.getAllResults
    )
router.route('/:id/get')
    .get(
        authenticateToken,
        verifyRoles(
            roleList.Parent,
            roleList.School_admin,
            roleList.Student,
            roleList.Admin,
            roleList.Principal,
            roleList.Vice_principal,
            roleList.Vice_headteacher,
            roleList.Headteacher,
            roleList.Teacher
        ),
        ResultController.getResultsById
    )
router.route('/klass/:klassId/get')
    .get(
        authenticateToken,
        verifyRoles(
            roleList.Teacher,
            roleList.Dean_of_study,
            roleList.Principal,
            roleList.Vice_principal,
            roleList.Headteacher,
            roleList.Vice_headteacher,
            roleList.School_admin,
            roleList.Admin
        ),
        ResultController.getClassResults
    )
router.route('/:id/update')
    .put(
        authenticateToken,
        verifyRoles(
            roleList.Teacher,
            roleList.School_admin,
            roleList.Dean_of_study
        ),
        ResultController.updateResult
    )
router.route('/:id/delete')
    .put(
        authenticateToken,
        verifyRoles(
            roleList.Teacher,
            roleList.School_admin,
            roleList.Dean_of_study
        ),
        ResultController.deleteResult
    )
module.exports = router;    