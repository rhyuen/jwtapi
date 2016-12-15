const mongoose = require("mongoose");
const itemSchema = mongoose.Schema({
  itemName: String,
  quantity: Number,
  owner: String
});

module.exports = mongoose.Model("Item", itemSchema);
