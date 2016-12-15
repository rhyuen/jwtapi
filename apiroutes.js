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

      if(!user.validPassword(req.body.password)){
        res.json({
          success: false,
          message: "Auth failed. User pw wrong."
        });
      }else{
        const token = jwt.sign(user.name, config.jwtsecret);
        res.json({
          success: true,
          message: "Auth Success. Token attached",
          token:token
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
        return res.json({success: false, message: "Token Auth Failed"});
      else{
        req.decoded = decoded;
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
    res.json({users: users});
  });
});



module.exports = apiRouter;
