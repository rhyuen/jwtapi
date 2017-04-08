"use strict";

const nodemailer = require("nodemailer");
const config = require("./config.js");
const jwt = require("jsonwebtoken");

module.exports = function(host, userEmailAddress){

  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      //Service EmailAddress
      user: config.email.from_address,
      //Service Password
      pass: config.email.from_pw
    }
  }, {
    //This from field seems to do nothing...It's not even in the EMAIL SOURCE
    from: "noply@tilders.everwhere",
    headers: {
      //You can see this in the email source headers
      "emailHeader": "Password Reset for Tilders"
    }
  });

  const tokenPayload = {
    username: userEmailAddress,
    jti: "99991234",
    iat: Math.floor(Date.now()/1000)
  };
  const tokenOptions = {
    expiresIn: Math.floor(Date.now()/1000) + (1200), //20 minutes
    issuer: "EMAIL RESET"
  };

  const resetToken = jwt.sign(tokenPayload, config.jwtsecret, tokenOptions);
  //const resetPwLink = "https://yarr-reader.now.sh/";
  const resetPwLinkAlt = host + "/reset?token=" + resetToken;
  const designateFromEmailAddr = `Noreply Tilders <${config.email.from_vanity_email}>`;
  const designateToEmailAddr = (process.env.NODE_ENV === "development") ? config.email.test_email_address: userEmailAddress;
  const emailHeading = "Reset Password from Tilders";
  let emailText = `Hey, we heard that you lost your TILDERS password.  Very unfortunate.\n\nUse the following link within the next 15 minutes to reset your password:\n\n${resetPwLinkAlt}\n\nThanks,\n\nThe person at Tilders.`;
  let mailOptions = {
    from: designateFromEmailAddr,
    to: designateToEmailAddr,
    subject:emailHeading,
    text: emailText
  };

  transporter.sendMail(mailOptions, (err, info) => {
    if(err)
      return console.log("[%s] ERROR: %s", new Date().toLocaleString(), err);
    console.log(
      "[%s]: The email has been sent.\nDetails: %s",
      new Date().toLocaleString(),
      info.response
    );
  });
};
