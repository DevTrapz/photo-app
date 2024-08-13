var express = require("express");
var router = express.Router();
const path = require("path");
const getFiles = require("../utils/getFiles");
require("dotenv").config();

const directoryPath = path.join(__dirname, process.env.PHOTO_DATA_DIR);

router.get("/", async function (req, res, next) {
  try {
    const images = await getFiles(".jpg", directoryPath);
    res.send(images);
  } catch (err) {
    res.send(err);
  }
});

module.exports = router;
