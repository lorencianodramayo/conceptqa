const express = require("express");
const router = express.Router();
const Multer = require("multer");
const AdmZip = require("adm-zip");
const { Storage } = require("@google-cloud/storage");
const uuid = require("uuid");

const uuidv1 = uuid.v1;

require("dotenv").config();
//Models
const PlaygroundModel = require('../models/PlaygroundModel');
const TemplateModel = require("../models/TemplateModel");
const PreviewModel = require("../models/PreviewModel");

//bucket settings
const storage = new Storage({
  projectId: process.env.GCLOUD_PROJECT_ID,
  credentials: {
    client_email: process.env.GCLOUD_CLIENT_EMAIL,
    private_key: process.env.GCLOUD_PRIVATE_KEY,
  },
});
//get bucket config
const bucket = storage.bucket(process.env.GCS_BUCKET);
//multer settings
const multi_upload = Multer({
  storage: Multer.memoryStorage(),
  limits: {
    fileSize: 100 * 1024 * 1024,
  },
}).array("upload", 100);

router.post("/", (req, res) => {
  const newPlayground = new PlaygroundModel(req.body);
  newPlayground.save((error, result) => {
    if (error) {
      return res.status(500).json({ msg: "Sorry, internal server errors" });
    }

    return res.json(result);
  });
});

router.post("/upload", (req, res) => {
  let uid = uuidv1();
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
      let html = "",
        updatedIndex = "",
        newFile,
        count = 0,
        arrAssets = [];
      //getting entries from zip file
      zip.getEntries().forEach((entries, index) => {
        //checking if its is a directory
        if (!entries.isDirectory) {
          newFile = `${uid}/${entries.entryName}`;
          //checking if the file name is index.html
          if(entries.name === 'index.html'){
            //parsing html
            html = entries.getData().toString("utf8");
            //updating html to get defaultValues
            updatedIndex =
              html.split("</html>")[0] +
              `<script>
                 setTimeout(() => {
                    parent.postMessage({
                      type: 'DEFAULT_VALUES',
                      defaultValues,
                      possibleValues: typeof possibleValues !== 'undefined'? possibleValues : {}
                    }, '*');
                  }, 500);

                  window.addEventListener("message",
                  (event) => {
                      if(typeof event.data === "object"){
                          defaultValues= event.data;
                      }else{
                        if(event.data === "pause"){
                          gwd.auto_PauseBtnClick();
                        }else if(event.data === "play"){
                          gwd.auto_PlayBtnClick();
                        }else{
                          if(typeof Adlib!=='undefined'){
                              Adlib.localTimeline = function(status){
                                status = status||null;
                                switch(status){
                                    case "PLAY":
                                      if(_obj.timelineEvent == null){
                                          var t = "0.0";
                                          _obj.timelineEvent = setInterval(function(){
                                              t = (gsap.globalTimeline.time().toFixed(1)> 0.5)? gsap.globalTimeline.time().toFixed(1) : t ;
                                              parent.postMessage({
                                                type: 'CREATIVE_TIME', t
                                              }, '*');
                                          }, 100);
                                      }
                                    break;
                                    case "PAUSE":
                                        clearInterval(_obj.timelineEvent);
                                        _obj.timelineEvent=null;
                                    break;
                                    case "END":
                                        clearInterval(_obj.timelineEvent);
                                        _obj.timelineEvent=null;
                                    break;
                                }
                              }
                            }
                        }
                      }
                  },
                  false
              );
            </script></html>`;
            //reconvert updated index to utf8
            entries.setData(Buffer.from(updatedIndex, "utf8"));
          }else if([".png", ".jpg", ".jpeg", ".gif"].some((t) =>
              entries.name.includes(t)
            )){
              entries.name.substring(0,2) !== "._" ?
              arrAssets.push(entries.name) : null
          }

          //end if
          let file = bucket.file(newFile);
          let fileStream = file.createWriteStream();

          fileStream.on("error", (err) => console.log(err));
  
          fileStream.on("finish", () => {
            if (file.name.includes("index.html")) {
              indexList = 1;
            }
            count++;

            if (count === zip.getEntries().length - 1 && indexList !== 0) {
              const bucketTemplate = new TemplateModel({
                url: process.env.GCS_BUCKET,
                uid: uid,
                directory: entries.entryName.split("/")[0],
                name: entries.entryName.split("/")[0].split('-')[1],
                width: entries.entryName
                  .toLowerCase()
                  .split("/")[0]
                  .split("-")[0]
                  .split("x")[0],
                height: entries.entryName
                  .toLowerCase()
                  .split("/")[0]
                  .split("-")[0]
                  .split("x")[1],
                assets: arrAssets
              });

              //saving entries
              bucketTemplate.save((error, result) => {
                if (error) {
                  return res
                    .status(500)
                    .json({ msg: "Sorry, internal server errors" });
                }

                return res.json(result);
              });
            }
          });
          fileStream.end(entries.getData());
        }
      })
    }
  });
});

router.put("/update", (req, res) => {
  if(Object.keys(req.body.data).length !== 0){
    PlaygroundModel.findOneAndUpdate(
      { _id: req.body._id },
      { $push: { templates: req.body.data } },
      (error, success) => {
        if (error) {
          return res.status(500).json({ msg: "Sorry, internal server errors" });
        }
        return res.json(success);
      }
    );
  }
});

router.post("/savePreview", (req, res) => {
  const preview = new PreviewModel(req.body);

  //saving entries
  preview.save((error, result) => {
    if (error) {
      return res.status(500).json({ msg: "Sorry, internal server errors" });
    }

    return res.json(result);
  });
});

module.exports = router;
