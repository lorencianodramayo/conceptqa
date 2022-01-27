const mongoose = require("mongoose");

// Schema
const Schema = mongoose.Schema;

const TemplateSchema = new Schema({
  url: String,
  uid: String,
  directory: String,
  width: Number,
  height: Number,
  date: {
    type: String,
    default: Date.now(),
  },
});

module.exports = mongoose.model("TemplateModel", TemplateSchema);
