var User = require('./../database').User;



exports.registerUser = function(data, cb){
    if(data){
        var user = User.build({
            name: data.name,
            email: data.email,
            password: data.password
        })
        user.save()
        .then(savedUser => cb(savedUser))
        .catch( err => {
            next(err);
        });
    }
    else {
        next(new HTTPError(400, "No user data!"));
    }
}
