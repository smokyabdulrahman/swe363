'use strict';

var passport = require('passport');
var jwtStrat = require('./jwt').Strategy;
var localStrat = require('./local').Strategy;

passport.session();

//use jwt strategy
passport.use(jwtStrat);

//use local strategy
passport.use(localStrat);

exports.authenticateLocal = passport.authenticate('local')
exports.authenticateJwt = passport.authenticate('jwt', { session: false})
