var HTTPError = require('./../helpers/index').HTTPError;
var workExperienceRepo = require('./../repositries/workExperienceRepository');
var userRepo = require('./../repositries/userRepository');
var helpers = require('./../helpers/middlewares');
//add workexperience to caller
exports.addWE = function(req, res, next){
    workExperienceRepo.build(helpers.getCurrentUser().id, req.body)
    .then( we => {
        return res.redirect("/users/profile");
    })
    .catch(err => {
        console.log(err);
        res.json(new HTTPError(400, "Missing info"));
    });
}

//update workexperience to caller
exports.updateWE = function(req, res, next){
    let weId = req.params.workexperience_id;
    workExperienceRepo.updateWE(weId, req.body)
    .then( we => {
        return res.redirect("/users/profile");
    })
    .catch(err => {
        return res.json(new HTTPError(400, "missing info"));
    });
}

//getall workexperiences of caller
exports.getAll = function(req, res, next){
    workExperienceRepo.getAll(req.user.id)
    .then(wes => {
        return res.json(wes);
    })
    .catch( err => {
        console.log(err);
        return res.status(400).json(err);
    });
}

//getall workexperiences of given user with id
exports.getWEByUsersId = async function(req, res, next){
    let userId = req.params.id;
    workExperienceRepo.getAll(userId)
    .then(wes => {
        return res.json(wes);
    })
    .catch( err => {
        console.log(err);
        return res.status(400).json(err);
    });
}

function isOwnerOfPublication(userId, weId){
    return new Promise(async function(resolve, reject) {
        let profile = await userRepo.getUserProfile(userId);
        profile.getWorkExperiences({
            where: {
                id: weId
            }
        })
        .then( we => {
            if(we.length !== 0)
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
    let workexperience_id = req.params.workexperience_id;
    isOwnerOfPublication(helpers.getCurrentUser().id, workexperience_id).then( _ => {
        workExperienceRepo.deleteById(workexperience_id)
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