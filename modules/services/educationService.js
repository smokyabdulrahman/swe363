var HTTPError = require('./../helpers/index').HTTPError;
var educationRepo = require('./../repositries/educationRepository');
var userRepo = require('./../repositries/userRepository');
var helpers = require('./../helpers/middlewares');

//add workexperience to caller
exports.addE = function(req, res, next){
    educationRepo.build(helpers.getCurrentUser().id, req.body)
    .then( e => {
        return res.redirect('/users/profile');
    })
    .catch(err => {
        console.log(err);
        return res.json(err);
    });
}

//update workexperience to caller
exports.updateE = function(req, res, next){
    let eId = req.params.education_id;
    educationRepo.updateWE(eId, req.body)
    .then( e => {
        return res.redirect('/users/profile');
    })
    .catch(err => {
        return res.json(err);
    });
}

//getall workexperiences of caller
exports.getAll = function(req, res, next){
    educationRepo.getAll(req.user.id)
    .then(wes => {
        return res.json(wes);
    })
    .catch( err => {
        console.log(err);
        return res.status(400).json(err);
    });
}

//getall workexperiences of given user with id
exports.getEByUsersId = async function(req, res, next){
    let userId = req.params.id;
    educationRepo.getAll(userId)
    .then(wes => {
        return res.json(wes);
    })
    .catch( err => {
        console.log(err);
        return res.status(400).json(err);
    });
}

function isOwnerOfEducation(userId, eId){
    return new Promise(async function(resolve, reject) {
        let profile = await userRepo.getUserProfile(userId);
        profile.getEducations({
            where: {
                id: eId
            }
        })
        .then( e => {
            if(e.length !== 0)
                resolve();
            reject();
        })
        .catch( err => {
            reject();
        });
    });
}
//delete work experience by id
exports.deleteById = async function(req, res, next){
    let education_id = req.params.education_id;
    isOwnerOfEducation(helpers.getCurrentUser().id, education_id).then( _ => {
        educationRepo.deleteById(education_id)
        .then(wes => {
            return res.json(wes);
        })
        .catch( err => {
            console.log(err);
            return res.status(400).json(err);
        });
    })
    .catch( _ => {
        return res.json(new HTTPError(400, "You don't have the authority or experience doesn't exists"));
    })
}