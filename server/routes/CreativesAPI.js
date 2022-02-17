const express = require("express");
const router = express.Router();

const CreativesModel = require("../models/CreativesModel");

router.get("/", (req, res) => {
    console.log(req.query)
    return res.send({msg: "hello"})
});

module.exports = router;