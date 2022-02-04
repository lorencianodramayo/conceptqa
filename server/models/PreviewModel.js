const mongoose = require("mongoose");

// Schema
const Schema = mongoose.Schema;

const PreviewSchema = new Schema({
  template: Object,
  defaultValues: Object,
  playgroundId: String,
  variantName: String,
  date: {
    type: String,
    default: Date.now(),
  },
});

module.exports = mongoose.model("PreviewModel", PreviewSchema);
