const express = require("express");
const User = require("./models/user.js");
const path = require("path");

const router = express.Router();

router.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public/views/index.html"));
});

router.get("/setup", (req, res) => {
  res.sendFile(path.join(__dirname, "public/views/register.html"));
});

router.post("/setup", (req, res) => {

  var currUser = new User();
  currUser.name = req.body.newusername;
  currUser.password =  currUser.generateHash(req.body.newpassword);
  currUser.admin = true;

  currUser.save(function(err, user){
    if(err)
      throw err;
    res.json({success: true, data: user});
  });
});

module.exports = router;
