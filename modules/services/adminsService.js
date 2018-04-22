var HTTPError = require('./../helpers/index').HTTPError;
var userRepo = require('./../repositries/userRepository');
var Profile = require('../database').Profile;
var profileRepo = require('./../repositries/profileRepository');

exports.signInAdmin = function (req, res){
    res.redirect("/admins/panel");
}//End of signInUser.

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
        include: [{
            model: Profile,
        }]
    }
    //return to admin the result
    userRepo.getUsers(filters).then( users => {
        return res.render("admins/panel", {users: users});
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

exports.rejectProfile = function(req, res, next){
    //pass the given profile id to the repositry to update profile
    const updatedProfileData = { isApproved: false };
    const userId = req.body.userId;
    
    profileRepo.updateProfile(userId, updatedProfileData)
    .then( profile => {
        return res.status(200).end();
    })
    .catch( err => {
        next(err);
    });
}

exports.editProfile = function(req, res, next){
    //pass the given profile id to the repositry to update profile
    const updatedProfileData = req.body;
    const userId = req.params.userId;

    profileRepo.updateProfile(userId, updatedProfileData)
    .then( profile => {
        return res.status(200).end();
    })
    .catch( err => {
        next(err);
    });
}