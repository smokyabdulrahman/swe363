'use strict';

var User = require('./../database').User;
var LocalStrategy = require('passport-local').Strategy;
var opts = {};

//the username you should use is the user email
opts.usernameField = 'email';

//the password field you should check as the password is password
opts.passwordField = 'password';

module.exports.Strategy = new LocalStrategy(
    opts, //pass options
    function(username, password, done) {
        //we should change this database statement to sql
        User.findOne({
            where: { email: username }
        })
        .then( user => {
            //if user does not exsist
            if (!user) { 
                return done(null, false);
            }
            //check password
            user.verifyPassword(password).then( res => {
                //if password is not correct
                if (!res) {
                    return done(null, false);
                }
                //return user to next middleware
                return done(null, user);
            });
        })
        .catch(err => {
            //if there is an error retriving the user
            return done(err); 
        });
    }
);