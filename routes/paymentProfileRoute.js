const express = require('express');
const router = express.Router();
const PaymentProfileController = require('../controllers/paymentProfile_view');
const authenticateToken = require('../middleware/authenticateToken');
const roleList = require('../models/helper/roleList');
const verifyRoles = require('../middleware/verifyRole');

router.route('/create')
    .post(
        authenticateToken,
        verifyRoles(
            roleList.School_admin,
            roleList.Properietor,
            roleList.Properietress,
            roleList.Bursar,
            roleList.Auditor,
        ),
        PaymentProfileController.createPaymentProfile
    )
router.route('/all')
    .get(
        authenticateToken,
        verifyRoles(
            roleList.Admin,
            roleList.School_admin,
            roleList.Properietor,
            roleList.Properietress,
            roleList.Principal,
            roleList.Headteacher,
            roleList.Bursar,
            roleList.Auditor,
        ),
        PaymentProfileController.getAllPaymentProfiles
    )
router.route('/:id/get')
    .post(
        authenticateToken,
        verifyRoles(
            roleList.Admin,
            roleList.School_admin,
            roleList.Properietor,
            roleList.Properietress,
            roleList.Principal,
            roleList.Headteacher,
            roleList.Bursar,
            roleList.Auditor,
            roleList.Student,
            roleList.Parent,
            roleList.User,
        ),
        PaymentProfileController.getPaymentProfile
    ),
router.route('/:id/update')
    .put(
        authenticateToken,
        verifyRoles(
            roleList.School_admin,
            roleList.Properietor,
            roleList.Properietress,
            roleList.Bursar,
            roleList.Auditor,
        ),
        PaymentProfileController.updatePaymentProfile
    )
router.route('/:id/delete')
    .delete(
        authenticateToken,
        verifyRoles(
            roleList.School_admin,
            roleList.Properietor,
            roleList.Properietress,
            roleList.Bursar,
            roleList.Auditor,
        ),
        PaymentProfileController.deletePaymentProfile
    )