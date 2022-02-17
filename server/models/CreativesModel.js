const mongoose = require("mongoose");

// Schema
const Schema = mongoose.Schema;

const CreativesModelSchema = new Schema({
  name: String,
  encoded: Blob,
  mimeType: String,
  date: {
    type: String,
    default: Date.now(),
  },
});

module.exports = mongoose.model("CreativesModel", CreativesModelSchema);
