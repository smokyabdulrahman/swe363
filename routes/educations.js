
var router = require('express').Router();
var EService = require('./../modules/services/educationService');
var auth = require('./../modules/auth'),
    authenticateJwt   = auth.authenticateJwt;

/* add education */
router.post("/", EService.addE);

/* update education by id */
router.post("/:education_id", EService.updateE);

/* get all educations of caller */
router.get("/", authenticateJwt, EService.getAll);

/* get educations of another user */
router.get("/users/:id", authenticateJwt, EService.getEByUsersId);

/* delete education by id */
router.delete('/:education_id', EService.deleteById);

module.exports = router;