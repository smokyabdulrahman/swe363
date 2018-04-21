var router = require('express').Router();
var profilesService = require('./../modules/services/profilesService');
var auth = require('./../modules/auth'),
    authenticateJwt   = auth.authenticateJwt;

router.get('/', authenticateJwt, profilesService.getPublications);
router.get('/user/:id', authenticateJwt, profilesService.getUserPublications);

router.post('/', authenticateJwt, profilesService.setPublication);

router.put('/:id', authenticateJwt, profilesService.updatePublication);

router.delete('/:id', authenticateJwt, profilesService.deletePublication);

router.get('/search/:keyword', authenticateJwt, profilesService.searchPublication);

module.exports = router;