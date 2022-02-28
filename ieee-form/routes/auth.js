// var express = require('express');
// var router = express.Router();
// const sendgrid = require('@sendgrid/mail');
// const { application } = require('express');
// const { render } = require('ejs');
// const mail = require('@sendgrid/mail');
const bcrypt = require('bcrypt');

var express = require('express');
const { request } = require('../app');
var router = express.Router();
const session = require('express-session');
const User = require("../models").User;
// sendgrid.setApiKey();

/* GET home page. */


router.get('/login',function(req,res,next){
  res.render("login");
});

router.get('/register',function(req,res,next){
  res.render("register");
});

router.get('/logout',function(req,res,next){
  req.session.loggedin = false;
  req.session.user = null;
  res.redirect("/auth/login");
});

// [POST Req]
router.post('/login',function(req,res,next){
  console.log(req.body.password);
  var application = req.body;
  const user = User.findAll({
    where: {
      email: application.email,
    }
  }).then((user)=>{
    if(user[0] && req.body.password){
      bcrypt.compare(application.password, user[0].password, function (err, result) {
        if(result == true){
          req.session.loggedin = true;
          req.session.user = user[0];
          res.locals.session = req.session;
          res.redirect("/users");
        }
      });
    }else{
      res.redirect('/');
    }
  });
    
});

router.post('/register',function(req,res,next){
  var application = req.body;
  bcrypt.hash(application.password, 5, function (err, hash) {
    console.log(hash);
    // Storing user data
    User.create({
      fullname:application.name,
      email:application.email,
      university:application.uni,
      gender:application.gender,
      workshop: application.workshops,
      password: hash
    }).then(user=>{
      req.session.loggedin = true;
      req.session.user = user;
      res.locals.session = req.session;
      res.redirect("/users");
    });
  });
    
});

module.exports = router;
