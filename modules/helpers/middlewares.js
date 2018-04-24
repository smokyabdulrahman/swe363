var HTTPError = require("./index").HTTPError;
var user;
/* check if user is an admin */
exports.isAdmin = function(req, res, next){
    const user = req.user;
    if(user.isAdmin === false)
        res.json(new HTTPError(400, "You are not an admin!")).end();
    next();
}

exports.exposeUser = function(req, res, next) {
    res.locals.currentUser = req.user;
    next();
};

exports.setCurrentUser = function(currentUser) {
    user = currentUser;
}

exports.getCurrentUser = function () {
    return user;
}