const express = require("express");
const router = express.Router();
const Multer = require("multer");
const AdmZip = require("adm-zip");
const { Storage } = require("@google-cloud/storage");
const uuid = require("uuid");
const arr = [];

const uuidv1 = uuid.v1;

require("dotenv").config();

const multi_upload = Multer({
  storage: Multer.memoryStorage(),
  limits: {
    fileSize: 10 * 1024 * 1024,
  },
}).array("upload", 100);

router.post("/", (req, res) => {
  res.json({
    status: "done",
  });
});

router.post("/upload", (req, res) => {
  multi_upload(req, res, function (err) {
    if (err instanceof Multer.MulterError) {
      // A Multer error occurred when uploading.
      res
        .status(500)
        .send({ error: { message: `Multer uploading error: ${err.message}` } })
        .end();
      return;
    } else if (err) {
      // An unknown error occurred when uploading.
      if (err.name == "ExtensionError") {
        res
          .status(413)
          .send({ error: { message: err.message } })
          .end();
      } else {
        res
          .status(500)
          .send({
            error: { message: `unknown uploading error: ${err.message}` },
          })
          .end();
      }
      return;
    }
    //unzipping file
    if (req.files[0].mimetype.includes("zip")) {
      const zip = new AdmZip(req.files[0].buffer);
      let html = '',
      updatedIndex = '';
      //getting entries from zip file
      zip.getEntries().forEach((entries, index) => {
        //checking if its is a directory
        if (!entries.isDirectory) {
          //checking if the file name is index.html
          if(entries.name === 'index.html'){
            //parsing html
            html = entries.getData().toString("utf8");
            //updating html to get defaultValues
            updatedIndex =
              html.split("</html>")[0] +
              `<script>
                  window.addEventListener("message",
                  (event) => {
                      if(typeof event.data === "object"){
                          defaultValues= event.data;
                      }else{
                        if(event.data === "pause"){
                          gwd.auto_PauseBtnClick();
                        }else{
                          gwd.auto_PlayBtnClick();
                        }
                      }
                  },
                  false
              );
              </script></html>`;
          }
        }
      })
    }
    
    res.status(200).end("Your files uploaded.");
  });
});


module.exports = router;
