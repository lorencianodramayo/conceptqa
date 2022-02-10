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

router.put("/update", (req, res) => {
  PreviewModel.findOneAndUpdate(
    { _id: req.body._id },
    { $set: req.body.data },
    (error, success) => {
      if (error) {
        return res.status(500).json({ msg: "Sorry, internal server errors" });
      }
      return res.json(success);
    }
  );
});

router.put("/delete", (req, res) => {
  PreviewModel.findOneAndDelete({ _id: req.body._id }, (error, success) => {
    if (error) {
      return res.status(500).json({ msg: "Sorry, internal server errors" });
    }
    return res.json(success);
  });
})

module.exports = router;
