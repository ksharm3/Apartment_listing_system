const express = require('express');
const router = express.Router();
//const data1 = require('../data/users');
const data = require('../data');
const { addUser } = require('../data/users');
//var bodyParser = require('body-parser');
//app.use(bodyParser.OptionsJson);
const userData = data.users;

router.get('/signup', async (req, res) => {
    try {
    
          res.render('signup', {});
        }
       catch (e) 
        {
            res.status(500).send();
        }
});

router.post("/signup", async (req, res) => {
    try{
        //newUserData=req.body;
        username=req.body.Username;
        email=req.body.EmailId;
        password=req.body.Password;
        console.log(username);
        console.log(email);
        console.log(password);
        const newUser = await userData.addUser(username,email,password);
        res.status(200);
        console.log("hello");
    }catch(e) {
        res.status(500).json({error: e});
    }

});

module.exports = router;