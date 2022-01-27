const express = require("express");
const router = express.Router();

const PlaygroundModel = require("../models/PlaygroundModel");
const TemplateModel = require("../models/TemplateModel");

router.get("/", (req, res) => {
  PlaygroundModel.findById(req.query.id, (error, success) => {
    if (error) {
        return res.status(500).json({ msg: "Sorry, internal server errors" });
    }
    return res.json(success);
    });
});

router.get("/template", (req, res) => {
    TemplateModel.findById(req.query.id, (error, success) => {
      if (error) {
        return res.status(500).json({ msg: "Sorry, internal server errors" });
      }
      return res.json(success);
    });
});

router.put("/update", (req, res) => {
    if (Object.keys(req.body.data).length !== 0) {
      TemplateModel.findOneAndUpdate(
        { _id: req.body._id },
        { $set: req.body.data },
        (error, success) => {
          if (error) {
            return res
              .status(500)
              .json({ msg: "Sorry, internal server errors" });
          }
          return res.json(success);
        }
      );
    }
})

module.exports = router;