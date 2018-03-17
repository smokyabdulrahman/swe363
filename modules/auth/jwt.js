'use strict';

var User = require('./../database').User;
var JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt;
var opts = {}

//token will be found in request header, in Authorization field
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme('jwt');

//secret key to decrept the token
opts.secretOrKey = process.env.SECRET;

module.exports.Strategy = new JwtStrategy(opts, function(jwt_payload, done) {
    //we should change this database statement to sql
    User.findById(jwt_payload.id)
    .then(user => {
        //user exists, go to the next middelware
        if (user) {
            return done(null, user);
        } 
        //user does not exist
        else {
            return done(null, false);
        }
    })
    .catch( err => {
        //no token or wrong token
        if (err) {
            return done(err, false);
        }
    })
});