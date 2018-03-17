var db = require('./../database');
var HTTPError = require('./../helpers/index').HTTPError;
exports.register = function(req, res, next){
    var data = req.body;
    if(data){
        var user = db.User.build({
            name: data.name,
            email: data.email,
            password: data.password
        })
        user.save()
        .then( savedUser => {
            res.json(savedUser);
        })
        .catch( err => {
            next(err);
        });
    }
    else {
        next(new HTTPError(400, "No user data!"));
    }
}