var router = require('express').Router();
var profilesService = require('./../modules/services/profilesService');
var auth = require('./../modules/auth'),
    authenticateJwt   = auth.authenticateJwt;

router.get('/user/:id', authenticateJwt, profilesService.getUserPublications);

router.post('/', profilesService.setPublication);

router.post('/:id', profilesService.updatePublication);

router.get('/search/', profilesService.searchPublication);

router.get('/:publicationId', profilesService.getPublication);

router.delete('/:id', profilesService.deletePublication);

module.exports = router;