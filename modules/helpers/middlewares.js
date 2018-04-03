var HTTPError = require("./index").HTTPError;

/* check if user is an admin */
exports.isAdmin = function(req, res, next){
    const user = req.user;
    if(user.isAdmin === false)
        res.json(new HTTPError(400, "You are not an admin!")).end();
    next();
}