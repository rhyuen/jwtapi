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

router.get("/browse", (req, res) => {
  res.sendFile(path.join(__dirname, "public/views/browse.html"));
});

router.get("/user/:id", (req, res) => {
  // let userId = req.params.id;
  // User.findById({id: userId}, (err, foundUser) => {
  //   if(err)
  //     res.json({message: err});
  //   else{
  //     res.json({message: "Found a matching user"});
  //      res.render("publicprofile", {});
  //   }
  // });
  console.log("Request URL");
  console.log("URL USER ID: %s", req.params.id);
  res.json({message: "Mountain Blade, PARAMID: " + req.params.id, "requestURL": req.originalUrl});
});

router.post("/setup", (req, res) => {

  var currUser = new User();
  currUser.name = req.body.newusername;
  currUser.password =  currUser.generateHash(req.body.newpassword);
  currUser.admin = true;

  currUser.save(function(err, user){
    if(err){
      return console.error("[%s] ERROR: %s", new Date().toLocaleString(), err);
    }else{
      res.redirect("/");
    }          
  });
});

module.exports = router;
