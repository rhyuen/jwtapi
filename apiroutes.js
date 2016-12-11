const express = require("express");
const User = require("./models/user.js");

const apiRouter = express.Router();

apiRouter.get("/", (req, res) => {
  res.json({message: "User API Routes"});
});

apiRouter.get("/users", (req, res) => {
  User.find({}, (err, users) => {
    if(err)
      return res.send(err);
    res.json({users: users});
  });
});

module.exports = apiRouter;
