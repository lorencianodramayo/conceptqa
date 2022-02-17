const express = require("express");
const router = express.Router();

const CreativesModel = require("../models/CreativesModel");

router.post("/", (req, res) => {
    CreativesModel.deleteMany({}, (err, data) => {
        if (err) {
          return res.status(500).json({ msg: "Sorry, internal server errors" });
        }

        JSON.parse(req.body.data).map((data, index) => {
          let obj = {};
          obj = data;
          const creatives = new CreativesModel(obj);

          creatives.save((error, result) => {
            if (error) {
              return res
                .status(500)
                .json({ msg: "Sorry, internal server errors" });
            }
          });

          return;
        });

        return res.status(200).json({ msg: "OK" });

    });
});


router.get("/get", (req, res) => {
  CreativesModel.find({}, (error, success) => {
    if (error) {
      return res.status(500).json({ msg: "Sorry, internal server errors" });
    }
    return res.json(success);
  });
});


module.exports = router;