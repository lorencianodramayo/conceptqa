const express = require("express");
const router = express.Router();

const CreativesModel = require("../models/CreativesModel");

router.post("/", (req, res) => {
    CreativesModel.deleteMany({}, (err, data) => {
        if (err) {
          return res.status(500).json({ msg: "Sorry, internal server errors" });
        }
        console.log(req.body.data.length);

        [req.body.data].map((data, index) => {
          let obj = {};
          obj = data;
          const creatives = new CreativesModel(obj);

          creatives.save((error, result) => {
            if (error) {
              return res
                .status(500)
                .json({ msg: "Sorry, internal server errors" });
            }

            return res.json(result);
          });
        });
    });
});

module.exports = router;