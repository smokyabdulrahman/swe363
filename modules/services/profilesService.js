
var HTTPError = require('./../helpers/index').HTTPError;
var emailHelper = require('./../helpers/emailHelper');
var userRepo = require('./../repositries/userRepository');
var profileRepo = require('./../repositries/profileRepository');
var publicationRepo = require('./../repositries/publicationRepository');

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

//get profiles's publications
exports.getPublications = async function(req, res){
    let profile = await userRepo.getUserProfile(req.user.id);
    
    let publications = await profileRepo.getProfilePublications(profile.id);
    return res.json(publications);
}

//get user profiles's publications
exports.getUserPublications = async function(req, res){
    let profile = await userRepo.getUserProfile(req.params.id);
    let publications = await profileRepo.getProfilePublications(profile.id);
    return res.json(publications);
}

//update profiles's publication
exports.updatePublication = async function(req, res){
    profileRepo.updateProfilePublication(req.params.id, req.body, (err, Publication) => {
        if(err || !Publication){
            console.log(err, Publication);
            next(err);
        }
        return res.json(Publication);
    });
}

//search publication
exports.searchPublication = async function(req, res, next){
    let keyword = req.params.keyword;
    let publications = await publicationRepo.search(keyword);
    return res.json(publications);
}