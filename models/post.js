const mongoose = require("mongoose");
const postSchema = mongoose.Schema({
  title: {type: String, required: true},
  body: {type: String, required: true},
  user: {type: String, required: true},
  tags: String
}, {
  timeStamps: {
    createdAt: "created_at"
  }
});

module.exports = mongoose.model("Post", postSchema);
