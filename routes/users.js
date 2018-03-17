
var router = require('express').Router();
var userService = require('./../modules/services/usersService');
// var token = jwt.sign(user.tokenize(), process.env.SECRET, {expiresIn: tokenTTL});

router.post('/register', userService.register);

module.exports = router;