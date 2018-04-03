var HTTPError = require('./../helpers/index').HTTPError;
var userRepo = require('./../repositries/userRepository');
var profileRepo = require('./../repositries/profileRepository');


exports.getSecret = function(req, res){
    return res.status(200).json(
        {
            msg: "don't tell anybody without a valid token!",
            user: req.user
        }
    );
}

exports.getProfileRequests = function(req, res, next){
    //get all profiles where isApproved is false
    const filters = {
        attributes: { 
            exclude: ['id','createdAt','updatedAt']
        },
        where: {
            isApproved: 0
        }
    }
    //return to admin the result
    profileRepo.getProfiles(filters).then( profiles => {
        return res.json(profiles).end();
    })
    .catch( err => {
        next(err)
    });
}