const express = require('express');
const router = express.Router();
//const data1 = require('../data/users');
const data = require('../data');
const { addUser } = require('../data/users');
//var bodyParser = require('body-parser');
//app.use(bodyParser.OptionsJson);
const userData = data.users;

router.get('/', async (req, res) => {
    try {
          //console.log("hello");
          res.render('signup', {title: "Welcome, please sign up to create account"});
        }
       catch (e) 
        {
            res.status(500).send();
        }
});

router.post("/", async (req, res) => {
    try{
        //newUserData=req.body;
        username=req.body.Username;
        email=req.body.EmailId;
        password=req.body.Password;
        console.log(username);
        console.log(email);
        console.log(password);
        /*const newUser =*/ await userData.addUser(username,email,password);
        res.status(200).render("afterSignUp", {})
        
    }catch(e){
        let error = e.toString();
        res.render("signup", {title: "Welcome, please sign up to create account", failed: "failed", error: error})
    }

});

module.exports = router;