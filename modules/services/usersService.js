var HTTPError = require('./../helpers/index').HTTPError;
var emailHelper = require('./../helpers/emailHelper');
var userRepo = require('./../repositries/userRepository');
var jwt = require('jsonwebtoken');
var user;

exports.getUsers = function(req, res) {
    let users = userRepo.getAllUsers(function(err, users) {
        if (err) {
            return res.json(new HTTPError(400, "Couldn't retrieve users!"));            
        }
        return res.json(users)
    });
}

exports.getUserByID = function(req, res) {
    let id = req.params.user_id;
    let users = userRepo.getUserByID(id, function(err, user) {
        if (err) {
            return res.json(new HTTPError(400, "User not found!")); 
        }
        return res.json(user)
    });
}

exports.register = function(req, res, next){
    var data = req.body;
    userRepo.registerUser(data, (err,user) => {
        if(err)
            next(err);
        //send welcoming email
        const mailOptions = {
            from: '"Faculty Portofolio Sys Support" <welcome@kfupm.edu.sa>',
            to: data.email,
            subject: 'Welcome to KFUPM Faculty Portofolio Sys',
            text: `Hello ${data.name},
            We are happy to have you in our system.
            Best regards,`
        }
        emailHelper.sendEmail(mailOptions);
        return res.status(200).end();
    });
}

exports.updateUser = function(req, res, next){
    userRepo.updateUser(req.user.id, req.body, function(err, user) {
        if(err){
            return res.json(new HTTPError(400, "No user data!"));
        }
        return res.status(200).end();
    });
}

/**
 * Sign in the user.
 * @param {Object}          user            User model object.
 * @param {Object}          res             Express res object.
 */
exports.signInUser = function (req, res){
    //Sign the user to be used as access token.
    //generate token and return it to him.
    user = res.locals.currentUser;
    return res.redirect("/users/profile");
}//End of signInUser.

exports.getSecret = function(req, res){
    return res.status(200).json({msg: "don't tell anybody without a valid token!"});
}

//set user's profile
exports.setProfile = async function(req, res, next){
    let profile_data = req.body;
    userRepo.setUserProfile(req.user.id, profile_data, (err, profile) => {
        if(err || !profile){
            console.log(err, profile);
            next(err);
        }      
        return res.json(profile);
    });
}

//get user's profile
exports.getProfile = async function(req, res){
    let profile = await userRepo.getUserProfile(user.id);
    return res.render('users/profile', {profile: profile, currentUser: user});
}

//update user's profile
exports.updateProfile = async function(req, res){
    userRepo.updateUserProfile(req.user.id, req.body, (err, profile) => {
        if(err || !profile){
            console.log(err, profile);
            next(err);
        }
        return res.json(profile);
    });
}
