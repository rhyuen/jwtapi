const express = require("express");
const User = require("./models/user.js");

const router = express.Router();

router.get("/", (req, res) => {
  res.send("hi jwt tokens.");
});

router.get("/setup", (req, res) => {
  var currUser = new User({
    name: "asdf",
    password: "asdfasdf",
    admin: true
  });

  currUser.save(function(err, user){
    if(err)
      throw err;
    res.json({success: true, data: user});
  });
});

module.exports = router;
