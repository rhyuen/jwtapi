const express = require("express");
const path = require("path");
const jwt = require("jsonwebtoken");
const User = require("./models/user.js");
const Item = require("./models/item.js");
const Post = require("./models/post.js");
const config = require("./config.js");

const apiRouter = express.Router();

apiRouter.get("/", (req, res) => {
  res.json({message: "User API Routes"});
});

apiRouter.post("/authenticate", (req, res) => {
  User.findOne({name: req.body.name}, (err, user) => {
    if(err)
      throw err;
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
          username: user.name
        };
        jwt.sign(tokenPayload, config.jwtsecret, tokenOptions, (err, token) => {
          if(err){
            return console.error(err);
          }
          res.json({
            success: true,
            message: "Auth Success. Token attached",
            token: token
          });
        });
      }
    }
  });
});



function isAuthJwt(req, res, next){
  const token = req.body.token || req.query.token ||req.headers["x-access-token"];
  if(token){
    jwt.verify(token, config.jwtsecret, (err, decoded) => {
      if(err)
        // if(err.name === "TokenExpiredError"){
        //   return res.json({success: false, message: err.message, expiredAt: err.expiredAt});
        // }else{
        //   return res.json({success: false, message: "Token Auth Failed"});
        // }
        console.log(err);
      else{
        req.decoded = decoded;
        req.body.token = token;
        next();
      }
    });
  }else{
    return res.status(403).json({
      success:false,
      message: "Auth failed. No token provided."
    });
  }
}

apiRouter.get("/users", isAuthJwt, (req, res) => {

  User.find({}, (err, users) => {
    if(err)
      return res.send(err);
    res.json({users: users, token: req.body.token});
  });
});

apiRouter.get("/user", isAuthJwt, (req, res) => {
  res.render("user");
});

//ONLY GETS ITEMS BASED ON USER's TOKEN.
apiRouter.get("/items", isAuthJwt, (req, res) => {
  Item.find({owner: req.decoded}, (err, items) => {
    if(err)
      return res.send(err);
    res.json({token: req.body.token, items: items});
  });
});

apiRouter.get("/edit", isAuthJwt, (req, res) => {
  res.render("edit");
});


apiRouter.get("/posts", isAuthJwt, (req, res) => {
  console.log("POST REQ DECODED: %s", req.decoded);
  console.dir(req.decoded);
  Post.find({user: req.decoded.username}, (err, posts) => {
    if(err){
      console.error("[%s] %s", new Date().toLocaleString(), err);
      return res.json({status: "Error", message: "Something is amiss in the force."});
    }
    res.json({message: "SUCCESS. Posts retrieved.", post: posts});
  });
});

apiRouter.post("/posts", isAuthJwt, (req, res) => {
  console.log("POSTS hit");
  console.log(req.body);
  var newPost = new Post();
  newPost.title = req.body.form_title;
  newPost.body = req.body.form_post;
  console.log("REQ DECODED: %s", req.decoded);
  newPost.user = req.decoded.username;
  newPost.tags = req.body.form_tags;
  newPost.save((err, latestPost)=>{
    if(err){
      console.error("[%s] %s", new Date().toLocaleString(), err);
      return res.json({status: "Error", message: "Something is amiss in the force."});
    }
    res.json({message: "New Post Added.", post: latestPost});
  });
});

apiRouter.post("/items", isAuthJwt, (req, res) => {
   var currItem = new Item();
   currItem.itemName = req.body.newitemname;
   currItem.quantity = req.body.quantity;
   currItem.owner = req.decoded;
   currItem.save(function(err, latestItem){
    if(err)
      return res.send(err);
    res.json({message: "New Item added.", item: latestItem});
  });
});

apiRouter.get("/logout", (req, res) => {
  //Expire the User's Token.
  res.redirect("/");
});


module.exports = apiRouter;
