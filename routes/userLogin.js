const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const data = require("../data");
const login = data.login;

//var salt = bcrypt.genSaltSync(16);

router.get("/",async (req, res) => {
    try{
        if(req.session.user)
        {
            username=req.session.user.username;
            res.render("homepage", {title: "homepage", authenticated: authenticated, username: username})
        }
        else
        res.render("login", {title: "Welcome, please login to your account"});
    }catch(e){
        res.send(404).json({error: e});
    }
});

router.post("/", async (req, res) => {

    try{    
        let username = req.body.Username;
        let password= req.body.Password;
        let session_id= req.session.id;
        /*loggingUser= */ await login.authenticateUser(username,password,session_id);
        
        req.session.user={username: username};
        res.render("homepage", {title: "homepage", authenticated: "authenticated", username: username})

    }catch(e){
        let error = e.toString();
        res.render("login", {title: "Welcome, please login to your account", failed: "failed", error: error})
    }
      
});

module.exports = router;