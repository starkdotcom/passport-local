var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mongoose = require('mongoose');
const session = require('express-session');
var hbs = require('express-handlebars')
const Handlebars = require('handlebars');
var passport = require('passport');
var crypto = require('crypto');
var routes = require('./routes');
const dotenv = require("dotenv");
const MongoStore = require('connect-mongo')(session);
const connection = require('./config/database');
require('./config/passport');
//dotenv.config();



var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.engine('hbs',hbs({extname:'hbs',defaultLayout:'layout',layoutsDir:__dirname+'/views/',partialsDir:__dirname+'/views/'}));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//var secret = process.env.SECRET_KEY;
var secret = "hithisisaloginsignupusingpasssport";
bodyParser = require("body-parser");

app.use(express.static("public"));

app.use(bodyParser.urlencoded({ extended: false }));

sessionStore = new MongoStore({mongooseConnection:connection,collection:'sessions'}),
app.use(session({secret:secret,
cookie:{maxAge:1000*60*60*24},
resave: false,
saveUninitialized: true,
store:sessionStore,
}))


app.use(passport.initialize());
app.use(passport.session());


app.use('/', usersRouter);
app.use('/login', indexRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
