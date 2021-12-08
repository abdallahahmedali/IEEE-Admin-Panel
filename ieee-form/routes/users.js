var express = require('express');
var router = express.Router();
const User = require("../models").User;

/* GET users listing. */
router.get('/', function(req, res, next) {
  const users = User.findAll();
  users.then(users => res.render("users/index",{message:"",users:users}));
});

router.get('/add', function(req, res, next) {
  res.render("users/add",{message:""});
});

router.get('/edit/:id', function(req, res, next){
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
  User.destroy({
    where: {id : req.params.id}
  }).then(()=>res.redirect("/users"));
});
module.exports = router;
