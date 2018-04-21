var Education = require('./../database').Education;
var userRepo = require('./../repositries/userRepository');
var profileRepo = require('./../repositries/profileRepository');

function getEById(id){
    return Education.findById(id);
}
//build Education
exports.build = async function(userId, data){
    let profile = await userRepo.getUserProfile(userId);
    return profileRepo.setProfileEducation(profile.id, data);
}

//update Education
exports.updateWE = async function(eId, data){
    let e = await getEById(eId);
    return e.update({...data});
}

//get all of caller
exports.getAll = async function(userId){
    let profile = await userRepo.getUserProfile(userId);
    return profile.getEducations();
}
//delete by id
exports.deleteById = async function(eId){
    let e = await getEById(eId);
    return e.destroy()
}