var WorkExperience = require('./../database').WorkExperience;
var userRepo = require('./../repositries/userRepository');
var profileRepo = require('./../repositries/profileRepository');

const Op = require('sequelize').Op;

function getWEById(id){
    return WorkExperience.findById(id);
}
//build workE
exports.build = async function(userId, data){
    let profile = await userRepo.getUserProfile(userId);
    return profileRepo.setProfileWorkExperience(profile.id, data);
}

//update workE
exports.updateWE = async function(weId, data){
    let we = await getWEById(weId);
    return we.update({...data});
}

//get all of caller
exports.getAll = async function(userId){
    let profile = await userRepo.getUserProfile(userId);
    console.log(profile);
    return profile.getWorkExperiences();
}
//delete by id
exports.deleteById = async function(weId){
    let we = await getWEById(weId);
    return we.destroy()
}

exports.search = function(keyword){
    return Publication.findAll({
        where:{
            [Op.or]: [
                {
                    author: {
                    [Op.like]: `%${keyword}%`
                    }
                },
                {
                    booktitle: {
                    [Op.like]: `%${keyword}%`
                    }
                }
            ]
        }
    });
}