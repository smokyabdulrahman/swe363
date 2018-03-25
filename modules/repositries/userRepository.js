var User = require('./../database').User;


function getUserById(id){
    return User.findById(id);
}

exports.registerUser = function(data){
    if(data){
        var user = User.build({
            name: data.name,
            email: data.email,
            password: data.password
        })
        user.save()
        .then(savedUser => {return savedUser})
        .catch( err => {
            next(err);
        });
    }
    else {
        next(new HTTPError(400, "No user data!"));
    }
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
