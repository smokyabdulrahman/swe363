var express             = require('express');
var app = express();
var path                = require('path');
var bodyParser          = require('body-parser');
// var passport            = require('passport');
// var auth                = require('./modules/auth');
var db                = require('./modules/database');


app.set("view engine", "ejs");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// app.use(passport.initialize());

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept, Token");
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
  next();
});

/**
 * Define Main routes of the system.
 */
app.use("/users", require("./routes/users"));

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