var Profile = require('./../database').Profile;
var Publication = require('./../database').Publication;

exports.getProfiles = function(filters){
    return Profile.findAll(filters);
}

function getProfileById(id){
    return Profile.findById(id);
}

//delete profile by id
exports.deleteById = async function(profileId){
    let profile = await getProfileById(profileId);
    return profile.destroy();
}

exports.updateProfile = function(userId, profileNewData){
    return Profile.update({
        ...profileNewData
    },{
        where: {
            UserId: userId
        }
    });
}

exports.setProfilePublication = async function(id, data, cb){
    var profile = await getProfileById(id);
    profile.createPublication(data)
    .then( publication => {
        cb(null, publication);
    })
    .catch( err => {
        cb(err, null);
    });
}

exports.setProfileWorkExperience = async function(id, data){
    var profile = await getProfileById(id);
    return profile.createWorkExperience(data)
}

exports.setProfileEducation = async function(id, data){
    var profile = await getProfileById(id);
    return profile.createEducation(data)
}

exports.getProfilePublications = async function(id, data, cb){
    var profile = await getProfileById(id);
    return profile.getPublications();
}

exports.updateProfilePublication = async function(id, data, cb){
    await Publication.update({
        ...data
    }, {where: {
        id: id
    }})
    .then(() => {
        cb(null, data);
    })
    .catch(err => {
        cb(err, null);
    });
}
