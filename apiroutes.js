const express = require("express");
const User = require("./models/user.js");
const jwt = require("jsonwebtoken");
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
      if(user.password !== req.body.password){
        res.json({
          success: false,
          message: "Auth failed. User pw wrong."
        });
      }else{
        const token = jwt.sign(user, config.jwtsecret, {
          expiresIn: 1440
        });
        res.json({
          success: true,
          message: "Auth Success. Token attached",
          token:token
        });
      }
    }
  });
});

apiRouter.use((req, res, next) => {

});

apiRouter.get("/users", (req, res) => {
  User.find({}, (err, users) => {
    if(err)
      return res.send(err);
    res.json({users: users});
  });
});

module.exports = apiRouter;
