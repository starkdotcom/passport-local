var express = require('express');
var router = express.Router();
const passport=require('passport');
const connection = require('../config/database');
const genPassword = require('../lib/passwordUtils').genPassword;
const User = connection.models.User;


router.get('/', function(req, res, next) {res.render('index');})

router.post('/',passport.authenticate('local',{failureRedirect:'/login/login-failure',successRedirect:'/login/login-success'}))

router.get('/login-failure', function(req, res, next) {res.render('failure')})

router.get('/login-success', function(req, res, next) {res.render('success')})
      
  
router.get('/register', function(req, res, next) {res.render('signup',{'signupErr':req.session.signupErr});});
 
router.post('/register',function(req,res,next){
  console.log(req.body)
  const saltHash = genPassword(req.body.password);
  const salt = saltHash.salt;
  const hash = salt.hash;
  const newUser = new User({
    username:req.body.email,
    hash: hash,
    salt: salt
  });
  newUser.save().then((user)=>{
    console.log(user);
    
  });
  res.redirect('/login/register')

})
  
  module.exports = router;

