var User = require('./../database').User;
var Profile = require('./../database').Profile;
var HTTPError = require('./../helpers/index').HTTPError;

function getUserById(id){
    return User.findById(id);
}

function getProfileById(id){
    return Profile.findById(id);
}

exports.registerUser = function(data, cb){
    if(data){
        var user = User.build({
            name: data.name,
            email: data.email,
            password: data.password
        })
        user.save()
        .then(savedUser => {cb(null,savedUser)})
        .catch( err => {
            console.log(err);
            cb(new HTTPError(400, err.errors[0].message), null);
        });
    }
    else {
        cb(new HTTPError(400, "No user data!"), null);
    }
}

exports.setUserProfile = async function(id, data, cb){
    var user = await getUserById(id);    
    var profile = await Profile.build({
        phone: data.phone,
        bio: data.bio,
        webURL: data.webURL,
        office: data.office
    });
    user.setProfile(profile).then( profile => {
        cb(null, profile);
    })
    .catch( err => {
        cb(err, null);
    });
}

exports.getUserProfile = async function(id, cb){
    var user = await getUserById(id);
    return await user.getProfile();
}

exports.updateUserProfile = async function(id, data, cb){
    var profile = await getProfileById(id);
    await Profile.update({
        phone: data.phone,
        bio: data.bio,
        webURL: data.webURL,
        office: data.office
    }, {where: {
        UserId: id
    }})
    .then(() => {
        cb(null, profile);
    })
    .catch(err => {
        cb(err, null);
    });
}

exports.updateUser = async function(id, data, cb){
    //data can be emtpy or containing what ever needs to be updated
    var user = await getUserById(id);
    user.update({...data})//spread data accross the pacific ocean.
    .then( updatedUser => {
        cb(null, updatedUser);
    })
    .catch(err => {
        cb(err, null);
    });
}
