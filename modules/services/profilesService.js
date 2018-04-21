
var HTTPError = require('./../helpers/index').HTTPError;
var emailHelper = require('./../helpers/emailHelper');
var userRepo = require('./../repositries/userRepository');
var profileRepo = require('./../repositries/profileRepository');
var publicationRepo = require('./../repositries/publicationRepository');

var jwt = require('jsonwebtoken');

//delete user's profiles
exports.deleteProfile = async function(req, res){    
    let profileId = req.params.id;
    isOwnerOfProfile(req.user.id, profileId).then( _ => {
        profileRepo.deleteById(profileId)
        .then(wes => {
            return res.json(wes);
        })
        .catch( err => {
            console.log(err);
            return res.status(400).json(err);
        });
    })
    .catch( _ => {
        return res.json(new HTTPError(400, "You don't have the authority or profile doesn't exists"));
    })
}

function isOwnerOfProfile(userId, profileId){
    return new Promise(async function(resolve, reject) {
        let user = await userRepo.getUserById(userId);
        
        user.getProfile()
        .then( profile => {
            if(profile.id == profileId)
                resolve();
            reject();
        })
        .catch( err => {
            reject();
        });
    });
}

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

//delete profiles's publication
exports.deletePublication = async function(req, res){
    let publicationId = req.params.id;
    isOwnerOfPublication(req.user.id, publicationId).then( _ => {
        publicationRepo.deleteById(publicationId)
        .then(wes => {
            return res.json(wes);
        })
        .catch( err => {
            console.log(err);
            return res.status(400).json(err);
        });
    })
    .catch( _ => {
        return res.json(new HTTPError(400, "You don't have the authority or publication doesn't exists"));
    })
}

function isOwnerOfPublication(userId, publicationId){
    return new Promise(async function(resolve, reject) {
        let profile = await userRepo.getUserProfile(userId);
        profile.getPublications({
            where: {
                id: publicationId
            }
        })
        .then( publication => {
            if(publication.length !== 0)
                resolve();
            reject();
        })
        .catch( err => {
            reject();
        });
    });
}

//search publication
exports.searchPublication = async function(req, res, next){
    let keyword = req.params.keyword;
    let publications = await publicationRepo.search(keyword);
    return res.json(publications);
}