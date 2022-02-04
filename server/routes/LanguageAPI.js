const express = require("express");
const router = express.Router();

const LanguageModel = require("../models/LanguageModel");

router.post("/", (req, res) => {
  const languages = new LanguageModel(req.body);

  //saving entries
  languages.save((error, result) => {
    if (error) {
      return res.status(500).json({ msg: "Sorry, internal server errors" });
    }

    return res.json(result);
  });
});

router.get("/languageAll", (req, res) => {
  LanguageModel.find({}, (error, success) => {
    if (error) {
      return res.status(500).json({ msg: "Sorry, internal server errors" });
    }
    return res.json(success);
  });
});

module.exports = router;