var HTTPError = require('./../helpers/index').HTTPError;
var emailHelper = require('./../helpers/emailHelper');
var userRepo = require('./../repositries/userRepository');
var profileRepo = require('./../repositries/profileRepository');
var jwt = require('jsonwebtoken');

//set profiles's publication
exports.setPublication = async function(req, res, next){
    let profile = await userRepo.getUserProfile(req.user.id);
    let publication_data = req.body;
    profileRepo.setProfilePublication(profile.id, publication_data, (err, publication) => {
        if(err || !publication){
            console.log(err, publication);
            next(err);
        }      
        return res.json(publication);
    });
}