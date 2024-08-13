var express = require("express");
var router = express.Router();
const path = require("path");
const getFiles = require("../utils/getFiles");
require("dotenv").config();

const photoDir = path.join(__dirname, process.env.PHOTO_DATA_DIR);
const videoDir = path.join(__dirname, process.env.VIDEO_DATA_DIR);
const shortDir = path.join(__dirname, process.env.SHORT_DATA_DIR);

router.get("/", async function (req, res, next) {
  try {
    var photos = await getFiles(".jpg", photoDir);
    var videos = await getFiles(".mp4", videoDir);
    var shorts = await getFiles(".mp4", shortDir);

    photos = photos.map((photo) => ({ photo }));
    videos = videos.map((video) => ({ video }));
    shorts = shorts.map((short) => ({ short }));
    var stream = [...photos, ...videos, ...shorts];
    stream = stream.sort((a, b) => 0.5 - Math.random());
    res.send(stream);
  } catch (err) {
    res.send(err);
  }
});

module.exports = router;
