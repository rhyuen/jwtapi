"use strict";

const config = require("./config.js");
const jwt = require("jsonwebtoken");

exports.isParamAuthJWT = (req, res, next) => {
  const token = req.body.token || req.query.token ||req.headers["x-access-token"];
  if(token){
    jwt.verify(token, config.jwtsecret, (err, decoded) => {
      if(err)
        if(err.name === "TokenExpiredError"){
          return res.json({success: false, message: err.message, expiredAt: err.expiredAt});
        }else{
          return res.json({success: false, message: "Token Auth Failed"});
        }
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
};

exports.isCookieAuthJWT = (req, res, next) => {
  const token = req.cookies.id_token;
  if(token){
    jwt.verify(token, config.jwtsecret, (err, decoded) => {
      if(err)
        if(err.name === "TokenExpiredError"){
          return res.json({success: false, message: err.message, expiredAt: err.expiredAt});
        }else{
          return res.json({success: false, message: "Token Auth Failed"});
        }
      else{
        console.dir(decoded);
        console.log("Token: " + token);
        req.decoded = decoded;
        req.body.token = token;
        next();
      }
    });
  }else{
    // return res.status(403).json({
    //   success:false,
    //   message: "Auth failed. No token provided."
    // });
    return res.status(403).redirect("/");
  }
};
