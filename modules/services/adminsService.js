var HTTPError = require('./../helpers/index').HTTPError;
var userRepo = require('./../repositries/userRepository');


exports.getSecret = function(req, res){
    return res.status(200).json(
        {
            msg: "don't tell anybody without a valid token!",
            user: req.user
        }
    );
}