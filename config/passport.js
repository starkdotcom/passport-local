const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const connection = require('./database');
const User = connection.models.User;
const validPasssword = require('../lib/passwordUtils').validPassword;

const customFields = {
  usernameField:'email',
  passwordField: 'password'
};
const  verifyCallback = (username, password, done)=> {
    User.findOne({ username: username }).then((user)=>{
      if (!user) {
        return done(null, false);
      }
      const isValid = validPasssword(password, user.hash, user.salt);
      if (isValid){
        return done(null, user);
      }
      else{
        return done(null, false);
      }
    }).catch((err)=>{
      done(err);
    });
  }

const strategy = new LocalStrategy(customFields, verifyCallback);
passport.use(strategy);
passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user);
  });
}); 