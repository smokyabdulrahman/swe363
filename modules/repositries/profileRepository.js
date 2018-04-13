var Profile = require('./../database').Profile;
var Publication = require('./../database').Publication;

exports.getProfiles = function(filters){
    return Profile.findAll(filters);
}

function getProfileById(id){
    return Profile.findById(id);
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
     
    //console.log(profile.getPublications());

    var publication = await Publication.build({
        author: data.author,
        address: data.address,
        booktitle: data.booktitle,
        school: data.school
    });
    profile.addPublication(publication, {
        where: {ProfileId: id}
    }).then( publication => {
        cb(null, publication);
    })
    .catch( err => {
        cb(err, null);
    });
}
