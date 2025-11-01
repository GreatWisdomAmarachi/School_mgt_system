const express = require('express');
const router = express.Router();
const KlassController = require('../controllers/Klass_view')
const authenticateToken = require('../middleware/authenticateToken');
const verifyRoles = require('../middleware/verifyRole');
const roleList = require('../models/helper/roleList');

router.route('/create')
    .post(
        authenticateToken,
        verifyRoles(
            roleList.Admin,
            roleList.School_admin,
    ),
    KlassController.createKlass
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
            roleList.Properietor,
            roleList.Properietress,
            roleList.Bursar
        ),
        KlassController.getKlasses
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
            roleList.Properietor,
            roleList.Properietress,
            roleList.Teacher,
            roleList.Dean_of_study,
            roleList.Bursar
        ),
        KlassController.getKlass
    );
    router.route('/level/:levelId/get')
        .get(
            authenticateToken,
            verifyRoles(
                roleList.Admin,
                roleList.School_admin,
                roleList.Principal,
                roleList.Vice_principal,
                roleList.Headteacher,
                roleList.Vice_headteacher,
                roleList.Bursar,
                roleList.Properietor,
                roleList.Properietress,
            ),
            KlassController.getKlassesInLevel
        );
router.route('/:id/update')
    .put(
        authenticateToken,
        verifyRoles(
            roleList.Admin,
            roleList.School_admin,
        ),
        KlassController.updateKlass
    );
router.route('/:id/delete')
    .delete(
        authenticateToken,
        verifyRoles(
            roleList.Admin,
            roleList.School_admin,
        ),
        KlassController.deleteKlass
    );

module.exports = router;