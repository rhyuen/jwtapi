"use strict";

const nodemailer = require("nodemailer");
const config = require("./config.js");


module.exports = function(userEmailAddress){

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

  const resetPwLink = "https://yarr-reader.now.sh/";
  const designateFromEmailAddr = `Noreply Tilders <${config.email.from_vanity_email}>`;
  const designateToEmailAddr = (process.env.NODE_ENV === "development") ? config.email.test_email_address: userEmailAddress;
  const emailHeading = "Reset Password from Tilders";
  let emailText = `Hey, we heard that you lost your TILDERS password.  ' +
                 'Very unfortunate.\n\nUse the following link within ' + 
                 'the next 24 hours to reset your password:' +
                 '\n\n${resetPwLink}\n\nThanks,\n\nThe person at Tilders.`;
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
