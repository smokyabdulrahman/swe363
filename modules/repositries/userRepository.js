var User = require('./../database').User;
var Profile = require('./../database').Profile;

function getUserById(id){
    return User.findById(id);
}

exports.registerUser = function(data, cb){
    if(data){
        var user = User.build({
            name: data.name,
            email: data.email,
            password: data.password
        })
        user.save()
        .then(savedUser => {cb(savedUser)})
        .catch( err => {
            next(err);
        });
    }
    else {
        next(new HTTPError(400, "No user data!"));
    }
}

exports.setUserProfile = async function(id, data, cb){
    var user = await getUserById(id);
    var profile = await Profile.build({
        phone: data.phone,
        bio: data.bio,
        nickname: data.nickname
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
