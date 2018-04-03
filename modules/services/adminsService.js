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
            exclude: ['createdAt','updatedAt']
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

exports.approveProfile = function(req, res, next){
    //pass the given profile id to the repositry to update profile
    const updatedProfileData = { isApproved: true };
    const userId = req.body.userId;
    profileRepo.updateProfile(userId, updatedProfileData)
    .then( profile => {
        return res.status(200).end();
    })
    .catch( err => {
        next(err);
    });
}