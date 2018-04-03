var router = require('express').Router();
var adminsService = require('./../modules/services/adminsService');
var usersService = require('./../modules/services/usersService');

var isAdmin = require('./../modules/helpers/middlewares').isAdmin;
var auth = require('./../modules/auth'),
    authenticateLocal = auth.authenticateLocal,
    authenticateJwt   = auth.authenticateJwt;

router.post('/login', authenticateLocal, usersService.signInUser);
router.get('/secret', authenticateJwt, isAdmin, adminsService.getSecret);

module.exports = router;