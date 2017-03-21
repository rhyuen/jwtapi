"use strict";

const nconf = require("nconf");

nconf.file("keys.json");

module.exports = {
  jwtsecret: process.env.jwtsecret || nconf.get("jwtsecret"),
  db: process.env.db || nconf.get("db"),
  cookieSecret: process.env.cookieSecret || nconf.get("cookieSecret"),
  email: {
    "from_address": process.env.from_address || nconf.get("email:from_address"),
    "from_pw": process.env.from_pw || nconf.get("email:from_pw"),
    "from_vanity_email" : process.env.from_vanity_email || nconf.get("email:from_vanity_email"),
    "test_email_address": process.env.test_email_address || nconf.get("email:test_email_address"),    
  },


  test: {
    jwtsecret: process.env.jwtsecret || nconf.get("jwtsecret"),
    db: process.env.db || nconf.get("db"),
    cookieSecret: process.env.cookieSecret || nconf.get("cookieSecret"),
  },
  dev: {
    jwtsecret: process.env.jwtsecret || nconf.get("jwtsecret"),
    db: process.env.db || nconf.get("db"),
    cookieSecret: process.env.cookieSecret || nconf.get("cookieSecret"),
  },
  prod: {
    jwtsecret: process.env.jwtsecret || nconf.get("jwtsecret"),
    db: process.env.db || nconf.get("db"),
    cookieSecret: process.env.cookieSecret || nconf.get("cookieSecret"),
  }
};
