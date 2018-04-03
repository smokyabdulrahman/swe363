var Profile = require('./../database').Profile;

exports.getProfiles = function(filters){
    return Profile.findAll(filters);
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