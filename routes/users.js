var router = require('express').Router();
var userService = require('./../modules/services/usersService');
var helpers = require('./../modules/helpers/middlewares');
var auth = require('./../modules/auth'),
    authenticateLocal = auth.authenticateLocal,
    authenticateJwt   = auth.authenticateJwt;

// var token = jwt.sign(user.tokenize(), process.env.SECRET, {expiresIn: tokenTTL});

router.get("/login", (req, res) => {
 res.render("users/login");
});

router.get("/register", (req, res) => {
    res.render("users/register");
});

router.post('/register', userService.register);
router.post('/login', authenticateLocal, helpers.exposeUser, userService.signInUser);
router.get('/secret', authenticateJwt, userService.getSecret);
router.post('/update', authenticateJwt, userService.updateUser);

router.post('/profile', userService.setProfile);
router.get('/profile', userService.getProfile);
router.get('/personal-website/:user_id', userService.getWebsite);
router.get('/profile/:id', userService.getProfileByURL);
router.put('/profile', authenticateJwt, userService.updateProfile);

router.get('/', userService.getUsers);
router.get('/:user_id', userService.getUserByID);

module.exports = router;