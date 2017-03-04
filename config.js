"use strict";

const nconf = require("nconf");

nconf.file("keys.json");

module.exports = {
  jwtsecret: process.env.jwtsecret || nconf.get("jwtsecret"),
  db: process.env.db || nconf.get("db"),
  cookieSecret: process.env.cookieSecret || nconf.get("cookieSecret"),
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
