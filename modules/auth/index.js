'use strict';

var passport = require('passport');
var jwtStrat = require('./jwt').Strategy;
var localStrat = require('./local').Strategy;

//use jwt strategy
passport.use(jwtStrat);

//use local strategy
passport.use(localStrat);

exports.authenticateLocal = passport.authenticate('local', { session: false})
exports.authenticateJwt = passport.authenticate('jwt', { session: false})
