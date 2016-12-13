const express = require("express");
const path = require("path");
const app = express();
const bodyParser = require("body-parser");
const morgan = require("morgan");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");

const config = require("./config.js");
const routes = require("./routes.js");
const User = require("./models/user.js");
const apiRoutes = require("./apiroutes.js");

app.set("PORT", process.env.PORT|| 9899);
mongoose.connect(config.db, function(err){
  console.log("[%s] DB CONN ATTEMPT", new Date().toLocaleString());
});
app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use(morgan("dev"));

app.use("/", routes);
app.use("/api", apiRoutes);

app.listen(app.get("PORT"), function(){
  console.log("[%s] App started. PORT: %s", new Date().toLocaleString(), app.get("PORT") );
});

// req.headers['authorization'] &&
// req.headers['authorization'].startsWith('JWT'))
