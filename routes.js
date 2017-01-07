const express = require("express");
const path = require("path");
const User = require("./models/user.js");
const Post = require("./models/post.js");


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

router.get("/user/:name", (req, res) => {

  User.find({name: req.params.name}, (err, user) => {
    if(err)
      console.log(err);
    //USER NOT FOUND CASE
    if(user.length === 0){
      return res.render("public_user_profile", {
        username: "A disturbance in the force there is.",
        tags: "The dark side is strong in you, young padawan.",
        postCount: "Midichlorians, there are none."
      });
    }
    res.render("public_user_profile", {
      username: user.name,
      tags: "tagsAreHere",
      postCount: 10
    });
  });
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

router.get("/error", (req, res) => {
  res.sendFile(path.join(__dirname, "public/views/error.html"));
});

module.exports = router;
