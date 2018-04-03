var router = require('express').Router();
var adminsService = require('./../modules/services/adminsService');
var usersService = require('./../modules/services/usersService');

var isAdmin = require('./../modules/helpers/middlewares').isAdmin;
var auth = require('./../modules/auth'),
    authenticateLocal = auth.authenticateLocal,
    authenticateJwt   = auth.authenticateJwt;

router.post('/login', authenticateLocal, usersService.signInUser);
router.get('/secret', authenticateJwt, isAdmin, adminsService.getSecret);
router.get('/profiles/pending', authenticateJwt, isAdmin, adminsService.getProfileRequests);
router.put('/profiles/approve', authenticateJwt, isAdmin, adminsService.approveProfile);

module.exports = router;