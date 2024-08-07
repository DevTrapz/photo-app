var express = require("express");
var router = express.Router();
const fs = require("fs");
const path = require("path");
require("dotenv").config();

const directoryPath = path.join(__dirname, process.env.IMAGE_DATA_DIR);

function getImages() {
  return new Promise((resolve, reject) => {
    fs.readdir(directoryPath, (err, files) => {
      if (err) {
        reject([]);
        return;
      }

      const images = files.filter((file) => file.endsWith(".jpg"));
      const shuffledImages = images.sort((a, b) => 0.5 - Math.random());
      resolve(shuffledImages);
    });
  });
}

router.get("/", async function (req, res, next) {
  try {
    const images = await getImages();
    res.send(images);
  } catch (err) {
    res.send(err);
  }
});

module.exports = router;
