
var router = require('express').Router();
var WEService = require('./../modules/services/workExperiencesService');
var auth = require('./../modules/auth'),
    authenticateJwt   = auth.authenticateJwt;

/* add work experience */
router.post("/", authenticateJwt, WEService.addWE);

/* update work experience */
router.put("/:workexperience_id", authenticateJwt, WEService.updateWE);

/* get all workexperiences of caller */
router.get("/", authenticateJwt, WEService.getAll);

/* get workexperience of another user */
router.get("/users/:id", authenticateJwt, WEService.getWEByUsersId);

/* delete work experience by id */
router.delete('/:workexperience_id', authenticateJwt, WEService.deleteById);

module.exports = router;