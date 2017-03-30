const mongoose = require("mongoose");
const bcrypt = require('bcrypt-nodejs');

const userSchema = mongoose.Schema({
  name: String,
  password: String,
  location: String,
  gender: String,
  birthDate: String,
  admin: Boolean
}, {
  timestamps: {
    createdAt: "created_at"
  }
});

userSchema.methods.generateHash = (password) => {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

//apparently, this method doesn't seem to work when it's in ES6 or I'm doing something wrong...
//incorrect arguments or somethign to that effect.
//userSchmea.methods.validPassword = (password) => {
  //password validation stuff.
//}

userSchema.methods.validPassword = function(password){
  return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model("User", userSchema);
