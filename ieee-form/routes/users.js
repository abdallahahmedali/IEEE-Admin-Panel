var express = require('express');
var router = express.Router();
const User = require("../models").User;


function isLoggedin(req,res) {
  if(req.session.loggedin != true){
    res.redirect("/auth/login");
  }
}

/* GET users listing. */
router.get('/', function(req, res, next) {
  isLoggedin(req,res);
  
  User.findAll().then(users => res.render("users/index",{message:"",users:users,session:req.session}));
});

router.get('/add', function(req, res, next) {
  isLoggedin(req,res);
  res.render("users/add",{message:""});
});

router.get('/edit/:id', function(req, res, next){
  isLoggedin(req,res);
  const user = User.findAll({
    where: {
      id : req.params.id
    }
  }).then(user=>res.render("users/edit",{message:"",user:user}));
});

router.post('/update', function(req, res, next){
  User.update({
    fullname: req.body.fullname,
    email: req.body.email,
    gender: req.body.gender,
    university: req.body.uni,
    workshop: req.body.workshops
  },
  {
    where: {
      id : req.body.id
    }
  }).then(()=> res.redirect("/users"));
});

router.get('/delete/:id', function(req, res, next){
  isLoggedin(req,res);
  User.destroy({
    where: {id : req.params.id}
  }).then(()=>res.redirect("/users"));
});
module.exports = router;
