var HTTPError = require('./../helpers/index').HTTPError;
var userRepo = require('./../repositries/userRepository');
var jwt = require('jsonwebtoken');

exports.register = function(req, res, next){
    var data = req.body;
    userRepo.registerUser(data, user => {
        res.status(200);
    });
}

/**
 * Sign in the user.
 * @param {Object}          user            User model object.
 * @param {Object}          res             Express res object.
 */
exports.signInUser = function (req, res){
    //Sign the user to be used as access token.
    //generate token and return it to him.
    var token = jwt.sign(req.user.dataValues, process.env.SECRET);
    return res.status(200).json({token: token});
}//End of signInUser.

exports.getSecret = function(req, res){
    return res.status(200).json({msg: "don't tell anybody without a valid token!"});
}