const express = require('express');
const router = express.Router();
const data = require("../data");
const logout = data.logout;

router.get('/', async (req, res) => {
    let session_id = req.session.id;
    let username = req.session.user.username;
    console.log("Huuuuuuuuuuuu", username);
    await logout.logout(username,session_id);
    req.session.destroy();
    res.render("homepage", {title: "homepage"});
  });

  module.exports = router;