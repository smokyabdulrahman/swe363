require('dotenv').config();
var express             = require('express');
var path                = require('path');
var bodyParser          = require('body-parser');
var passport            = require('passport');
var auth                = require('./modules/auth');
var db                  = require('./modules/database');
var User                = db.User;

var app = express();

app.use(require("express-session")({
  secret: "demoapp",
  resave: false,
  saveUninitialized: false
}));

passport.serializeUser(function(user, done) {
  done(null, user);
});
passport.deserializeUser(function(user, done) {
  done(null, user);
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(passport.initialize());

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept, Authorization");
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
  next();
});

app.use(function(req,res,next){
  res.locals.currentUser = req.user;
  next();
})

// ejs view engine
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));

/**
 * Define Main routes of the system.
 */
app.use("/users", require("./routes/users"));
app.use("/admins", require("./routes/admins"));
app.use("/users/profiles", require("./routes/profiles"));
app.use("/publications", require("./routes/publications"));
app.use("/workexperiences", require("./routes/workExperiences"));
app.use("/educations", require("./routes/educations"));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});


// error handlers

// development error handler
// will print stacktrace
app.use(function(err, req, res, next) {
  res.status(err.status || err.errorCode || 500);
  res.send({
      error: err
  });
  next(err);
});

app.listen(3000, () => console.log('Example app listening on port 3000!'))