"use strict";

const express = require("express");
const path = require("path");
const validator = require("validator");
const bcrypt = require('bcrypt-nodejs');
const User = require("./models/user.js");
const Post = require("./models/post.js");
const Auth = require("./auth.js");



const router = express.Router();

router.get("/", (req, res) => {
  if(req.cookies.id_token){
    res.redirect("/api/user");
  }else{
    res.status(200).sendFile(path.join(__dirname, "public/views/index.html"));
  }
});

router.get("/register", (req, res) => {
  res.status(200).sendFile(path.join(__dirname, "public/views/register.html"));
});

router.get("/browse", (req, res) => {
  res.status(200).sendFile(path.join(__dirname, "public/views/browse.html"));
});

router.get("/user/:name", (req, res) => {
  let cleanURLParam = validator.escape(req.params.name);
  User.find({name: cleanURLParam}, (err, user) => {
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

router.post("/register", (req, res) => {

  let currUser = new User();
  currUser.name = validator.escape(req.body.newusername);
  currUser.password = currUser.generateHash(req.body.newpassword);
  currUser.admin = true;

  currUser.save((err, user) => {
    if(err){
      return console.error("[%s] ERROR: %s", new Date().toLocaleString(), err);
    }else{
      res.redirect("/");
    }
  });
});

router.get("/forgot", (req, res) => {
  res.status(200).sendFile(path.join(__dirname, "public/views/forgot.html"));
});

router.post("/forgot", (req, res) => {
  let cleanedEmail = validator.escape(req.body.forgot_email_address);
  let host = req.headers.host;
  console.log(cleanedEmail);
  require("./email.js")(host, cleanedEmail);
  res.redirect("/");
});

router.get("/reset", Auth.isParamAuthJWT, (req, res) => {
  res.status(200).sendFile(path.join(__dirname, "public/views/reset.html"));
});

router.post("/reset", Auth.isParamAuthJWT, (req, res) => {
  const latestHash = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(8), null);
  console.log("USERNAME: %s", req.decoded.username);
  console.log("HASH: %s", latestHash);
  User.update({name: req.decoded.username}, {$set: {password: latestHash}}, (err, updatedUser) => {
    if(err){
      console.error(
        "[%s] ERROR: %s",
        new Date().toLocaleString(),
        err
      );
      return res.redirect("/error")
    }else{
      console.dir(updatedUser);
      return res.redirect("/");
    }
  });
});

router.get("/error", (req, res) => {
  res.sendFile(path.join(__dirname, "public/views/error.html"));
});


module.exports = router;
