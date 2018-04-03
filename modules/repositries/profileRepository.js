var Profile = require('./../database').Profile;

exports.getProfiles = function(filters){
    return Profile.findAll(filters);
}