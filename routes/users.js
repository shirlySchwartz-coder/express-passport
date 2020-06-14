const express = require("express");
const router = express.Router();
const passport = require('passport');
const path = require('path');
const {data} = require('../data/data.json');

const user= {name: "shirly", password: "1111", email:"test@tes.t"};
const usersList = [];
usersList.push(user,...data);
console.log('usersList', usersList);

//check if user authorized
const isUserAut = (req, res, next) => {
  if (req.isAuthenticated()) return next();
  res.redirect("/login");
};

//Login Page
router.route('/login')
  .get((req, res) => {
  res.sendFile(path.join(__dirname, '../pages/login.html'));
  })
  .post((req, res) =>{
    passport.authenticate('local', {
      successRedirect: '../',
      failureRedirect: '/login',
      failureFlash: true,
      successFlash: 'Welcome!'
    })
    //(req, res, next); //?
  })

router.route('/logout')
   .get(isUserAut, (req, res) => {
    req.logout(); // passport logout
    res.redirect('/login');
});

//Register Page
router.route('/register')
  .get((req, res) => {
    res.sendFile(path.join(__dirname, '../pages/register.html'));
  })

  .post(isUserAut, (req, res) => {
    const {name, password, email} = req.body;
    console.log(name, password, email);
    if (name && password && email){
      try{
        const newUser= new user(name, password, email);
        usersList.push(...newUser);
        console.log('users', usersList);
        //res.redirect('/');
      }catch {
        //res.redirect('./register');
      } 
    }else{
      alert("Some Details are missing");
    }
  })

router.route('/')
  .get((req, res, next) => {
    console.log(data);
    //res.json(data);
    res.redirect(301, 'http://localhost:3000')
  })

module.exports = router;










   
   