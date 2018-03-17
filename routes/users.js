var router = require('express').Router();
var db = require('../modules/database/index');

/* --------- create user --------- */

// db.sequelize.sync().then(function() {
//     db.User.create({
//         email: "b@bom.com", 
//         password: "1234", 
//         name: "D7d7"
//     }).then(function (user){
//     user.save();
//     console.log("ROW CREATED")
//     });
// });


router.get('/', function (req, res) {
    db.sequelize.sync().then(function () {
        db.User.findAll().then(function (users) {
            res.render('user', { users: users });
        });
    });
})

router.get("/register", function (req, res) {
    res.render("register");
});

router.post("/register", function (req, res) {
    db.sequelize.sync().then(function () {
        db.User.create({
            email: req.body.email,
            password: req.body.password,
            name: req.body.name
        }).then(function (user) {
            user.save();
            console.log("USER REGISTERED")
            res.redirect('/users');
        });
    });
});

router.get("/signin", function (req, res) {
    res.render("login");
});

router.post("/signin", function (req, res) {
    
});

module.exports = router;