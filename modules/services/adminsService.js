var HTTPError = require('./../helpers/index').HTTPError;
var userRepo = require('./../repositries/userRepository');
var Profile = require('../database').Profile;
var profileRepo = require('./../repositries/profileRepository');
var userRepo = require('./../repositries/userRepository');
var user;

exports.signInAdmin = function (req, res){    
    res.redirect("/admins/panel");
    user = res.locals.currentUser;
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
    console.log(user);
    
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
        return res.render("admins/panel", {users: users, currentUser: user});
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
        return res.redirect("/admins/panel");
    })
    .catch( err => {
        next(err);
    });
}

exports.addProfile = function(req, res, next){
    //pass the given profile id to the repositry to update profile
    const profileData = req.body;
    const userId = req.params.userId;
    userRepo.setUserProfile(userId, profileData, (err, data) => {
        if(err)
            next(err);
        return res.redirect("/admins/panel");
    });
}

exports.addUser = function(req, res, next){
    //pass the given profile id to the repositry to update profile
    const userData = req.body;
    userRepo.registerUser(userData, (err, user) => {
        if(err){
            console.log(err);
            next(err);
        }
        return res.redirect("/admins/panel");
    })
}

exports.logout = function(req, res, next){
    user = null;
    req.logout();
    res.redirect("/admins/login");
}