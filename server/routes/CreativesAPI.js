const express = require("express");
const router = express.Router();

const CreativesModel = require("../models/CreativesModel");

router.post("/", (req, res) => {

    CreativesModel.deleteMany({}, (err, data) => {
        console.log(data);
    })
    console.log(req);
    return res.send({msg: "hello"})
});

module.exports = router;