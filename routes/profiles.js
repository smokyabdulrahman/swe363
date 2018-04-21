
var router = require('express').Router();
var profilesService = require('./../modules/services/profilesService');
var auth = require('./../modules/auth'),
    authenticateLocal = auth.authenticateLocal,
    authenticateJwt   = auth.authenticateJwt;


module.exports = router;