var router = require('express').Router();
var profilesService = require('./../modules/services/profilesService');
var auth = require('./../modules/auth'),
    authenticateJwt   = auth.authenticateJwt;

router.get('/search/:keyword', authenticateJwt, profilesService.searchPublication);

module.exports = router;