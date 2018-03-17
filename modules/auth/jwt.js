var JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt;
var opts = {}

//token will be found in request header, in Authorization field
opts.jwtFromRequest = ExtractJwt.fromAuthHeader();

//secret key to decrept the token
opts.secretOrKey = 'secret';

module.exports.Strategy = new JwtStrategy(opts, function(jwt_payload, done) {
    //we should change this database statement to sql
    User.findOne({id: jwt_payload.sub}, function(err, user) {
        //no token or wrong token
        if (err) {
            return done(err, false);
        }
        //user exists, go to the next middelware
        if (user) {
            return done(null, user);
        } 
        //user does not exist
        else {
            return done(null, false);
            // or you could create a new account
        }
    });
});