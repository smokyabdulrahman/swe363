
var router                              = require('express').Router();


router.get('/', function(req, res){
    console.log(req,res);
})

module.exports = router;