const express = require("express");
const router = express.Router();

const PreviewModel = require("../models/PreviewModel");

router.get("/", (req, res) => {
    PreviewModel.find(req.query, (error, success) => {
      if (error) {
        return res.status(500).json({ msg: "Sorry, internal server errors" });
      }
      return res.json(success);
    });
});

module.exports = router;
