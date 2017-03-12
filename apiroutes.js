"use strict";

const express = require("express");
const path = require("path");
const jwt = require("jsonwebtoken");
const validator = require("validator");
const User = require("./models/user.js");
const Post = require("./models/post.js");
const config = require("./config.js");
const auth = require("./auth.js");


const apiRouter = express.Router();

apiRouter.post("/authenticate", (req, res) => {
  let cleanFormName = validator.escape(req.body.name);

  User.findOne({name: cleanFormName}, (err, user) => {
    if(err) throw err;
    if(!user)
      res.json({
        success: false,
        message: "Auth failed.  User doesn't exist."
      });
    else{
      if(!user.validPassword(req.body.password)){
        res.json({
          success: false,
          message: "Auth failed. User pw wrong."
        });
      }else{
        const tokenOptions = {
          issuer: "TestServer",
          expiresIn: "10h"
        };
        console.log("USERNAME: %s",  user.name);
        var tokenPayload = {
          //Add a "sub" field for user ID.
          username: user.name,
          jti: "34343409",
          iat: Math.floor(Date.now()/1000)
        };
        jwt.sign(tokenPayload, config.jwtsecret, tokenOptions, (err, token) => {
          if(err){
            return console.error(err);
          }
          // res.json({
          //   success: true,
          //   message: "Auth Success. Token attached",
          //   token: token
          // });

          res.cookie("id_token", token, {
            expires: new Date(Date.now() + 36000),
            httpOnly: true
          });
          res.status(200).send({message: "cookie set."});
        });
      }
    }
  });
});

apiRouter.get("/users", (req, res) => {
  User.find({}, (err, users) => {
    if(err)
      return res.send(err);
    res.json({users: users});
  });
});

apiRouter.get("/user", auth.isCookieAuthJWT, (req, res) => {
  res.render("user");
});


apiRouter.get("/edit", auth.isCookieAuthJWT, (req, res) => {
  console.log("EDIT PATH");
  console.log(req.decoded);
  var zeName = req.decoded.username.toString();
  User.findOne({name: zeName}, (err, foundUser) => {
    if(err){
      console.log(err);
      return res.sendFile(path.join(__dirname, "public/views/error.html"));
    }
    else{
      return res.render("edit", {
        name: foundUser.name
      });
    }
  });
});

apiRouter.post("/edit", auth.isCookieAuthJWT, (req, res) => {

});


apiRouter.get("/posts", auth.isCookieAuthJWT, (req, res) => {
  Post.find({user: req.decoded.username}, (err, posts) => {
    if(err){
      console.error("[%s] %s", new Date().toLocaleString(), err);
      return res.json({status: "Error", message: "Something is amiss in the force."});
    }
    res.json({message: "SUCCESS. Posts retrieved.", post: posts});
  });
});

apiRouter.post("/posts", auth.isCookieAuthJWT, (req, res) => {

  var newPost = new Post({
    title: req.body.form_title,
    body: req.body.form_post,
    user: req.decoded.username,
    tags: req.body.form_tags
  });

  newPost.save((err, latestPost)=>{
    if(err){
      console.error("[%s] %s", new Date().toLocaleString(), err);
      return res.json({status: "Error", message: "Something is amiss in the force."});
    }
    res.json({message: "New Post Added.", post: latestPost});
  });
});


apiRouter.get("/logout", (req, res) => {
  res.cookie("id_token", "LOGGEDOUT", {
    expires: new Date(Date.now() - 36000),
    httpOnly: true
  });
  res.redirect("/");
});


module.exports = apiRouter;
