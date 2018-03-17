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
        User.findOne({ username: username }, function (err, user) {
            //if there is an error retriving the user
            if (err) { 
                return done(err); 
            }
            //if user does not exsist
            if (!user) { 
                return done(null, false);
            }
            //if password is not correct
            if (!user.verifyPassword(password)) { 
                return done(null, false); 
            }
            //return user to next middleware
            return done(null, user);
        });
    }
);