const express = require("express");
const router = express.Router();
const Multer = require("multer");
const AdmZip = require("adm-zip");
const { Storage } = require("@google-cloud/storage");
const uuid = require("uuid");

const uuidv1 = uuid.v1;

require("dotenv").config();

router.post("/", (req, res) => {
  res.json({
    status: "done",
  });
});

module.exports = router;
