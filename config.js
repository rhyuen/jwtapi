const nconf = require("nconf");

nconf.file("keys.json");

module.exports = {
  "jwtsecret": process.env.jwtsecret || nconf.get("jwtsecret"),
  db: process.env.db || nconf.get("db")
};
