
var router = require('express').Router();
var userService = require('./../modules/services/usersService');
var auth = require('./../modules/auth'),
    authenticateLocal = auth.authenticateLocal,
    authenticateJwt   = auth.authenticateJwt;

// var token = jwt.sign(user.tokenize(), process.env.SECRET, {expiresIn: tokenTTL});

router.post('/register', userService.register);
router.post('/login', authenticateLocal, userService.signInUser);
router.get('/secret', authenticateJwt, userService.getSecret);
router.post('/update', authenticateJwt, userService.updateUser);
router.post('/profile', authenticateJwt, userService.setProfile);
router.get('/profile', authenticateJwt, userService.getProfile);

module.exports = router;