const mongoose = require("mongoose");

// Schema
const Schema = mongoose.Schema;

const AssetSchema = new Schema({
  playgroundId: String,
  url: String,
  uid: String,
  directory: String,
  name: String,
  width: Number,
  height: Number,
  date: {
    type: String,
    default: Date.now(),
  },
});

module.exports = mongoose.model("AssetModel", AssetSchema);
