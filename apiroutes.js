const express = require("express");
const path = require("path");
const User = require("./models/user.js");
const Item = require("./models/item.js");
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
        console.log("JWT VERIFY cb value. isAuthJWT Scope: %s", decoded);
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
  //res.sendFile(path.join(__dirname, "public/views/user.html"));
});

//ONLY GETS ITEMS BASED ON USER's TOKEN.
apiRouter.get("/items", isAuthJwt, (req, res) => {
  Item.find({owner: req.decoded}, (err, items) => {
    if(err)
      return res.send(err);
    res.json({token: req.body.token, items: items});
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
  res.redirect("/");
});


module.exports = apiRouter;
