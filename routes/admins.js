var router = require('express').Router();
var adminsService = require('./../modules/services/adminsService');
var usersService = require('./../modules/services/usersService');

var isAdmin = require('./../modules/helpers/middlewares').isAdmin;
var auth = require('./../modules/auth'),
    authenticateLocal = auth.authenticateLocal,
    authenticateJwt   = auth.authenticateJwt;

router.get("/login", (req, res) => {
 res.render("admins/login");
});

router.get("/panel", adminsService.getProfileRequests);

router.post('/login', authenticateLocal, isAdmin, adminsService.signInAdmin);
router.get('/secret', authenticateJwt, isAdmin, adminsService.getSecret);
router.get('/profiles/pending', authenticateJwt, isAdmin, adminsService.getProfileRequests);
router.put('/profiles/approve', adminsService.approveProfile);
router.put('/profiles/reject', adminsService.rejectProfile);
router.post('/profiles/:userId/edit', adminsService.editProfile);

module.exports = router;