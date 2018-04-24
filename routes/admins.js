var router = require('express').Router();
var adminsService = require('./../modules/services/adminsService');
var usersService = require('./../modules/services/usersService');
var helpers = require('./../modules/helpers/middlewares');
var auth = require('./../modules/auth'),
    authenticateLocal = auth.authenticateLocal,
    authenticateJwt   = auth.authenticateJwt;

router.get("/login", (req, res) => {
 res.render("admins/login");
});

router.get("/panel", adminsService.getProfileRequests);

router.post('/login', authenticateLocal, helpers.isAdmin, helpers.exposeUser, adminsService.signInAdmin);
router.get('/secret', authenticateJwt, helpers.isAdmin, adminsService.getSecret);
router.get('/profiles/pending', authenticateJwt, helpers.isAdmin, adminsService.getProfileRequests);
router.put('/profiles/approve', adminsService.approveProfile);
router.put('/profiles/reject', adminsService.rejectProfile);
router.post('/profiles/:userId/edit', adminsService.editProfile);
router.post('/profiles/:userId/add', adminsService.addProfile);
router.post('/users/add', adminsService.addUser);
router.get('/logout', adminsService.logout);

module.exports = router;