"use strict";

const express = require("express");
const path = require("path");
const app = express();
const bodyParser = require("body-parser");
const morgan = require("morgan");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const helmet = require("helmet");
const compression = require("compression");
const cookieParser = require("cookie-parser");
const exphbs = require("express-handlebars");

const config = require("./config.js");
const routes = require("./routes.js");
const User = require("./models/user.js");
const apiRoutes = require("./apiroutes.js");
require("./dbconn.js")();

app.set("PORT", process.env.PORT|| 9899);

app.use(cookieParser(config.cookieSecret, {
  httpOnly: true,
  maxAge: 3600
}));
app.use(compression({
  level: 5
}));
app.use(helmet());
app.use(express.static(path.join(__dirname, "public")));
app.set("views", path.join(__dirname, "public/views"));
app.engine(".hbs", exphbs({
  extname: ".hbs"
}));
app.set("view engine", ".hbs");
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use(morgan("dev"));

app.use("/", routes);
app.use("/api", apiRoutes);

app.get("*", (req, res) => {
  res.redirect("/");
});

// app.listen(app.get("PORT"), (err) => {
//   if(err){
//     console.error("ERROR: %s", err);
//   }else{
//     console.log("[%s] App started. \n\tPORT: %s\n\tENV: %s",
//       new Date().toLocaleString(),
//       app.get("PORT"), process.env.NODE_ENV
//     );
//   }
// });

module.exports = app;
