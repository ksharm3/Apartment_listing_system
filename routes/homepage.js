const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
    try{    
        if(req.session.user)
        {
            username=req.session.user.username;
            res.render("homepage", {title: "homepage", authenticated: "authenticated", username: username})
        }
        else
        res.render("homepage", {title: "homepage"});
    }catch(e){
        res.send(404).json({error: e});
    }
  });

  module.exports = router;