
var router = require('express').Router();
var userService = require('./../modules/services/usersService');
var authenticateLocal = require('./../modules/auth').authenticateLocal;

// var token = jwt.sign(user.tokenize(), process.env.SECRET, {expiresIn: tokenTTL});

router.post('/register', userService.register);
router.post('/login', authenticateLocal, userService.signInUser);

module.exports = router;