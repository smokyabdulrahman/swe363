
var router = require('express').Router();
var profileService = require('./../modules/services/profilesService');
var auth = require('./../modules/auth'),
    authenticateLocal = auth.authenticateLocal,
    authenticateJwt   = auth.authenticateJwt;

router.delete('/:id', authenticateJwt, profileService.deleteProfile);    

module.exports = router;