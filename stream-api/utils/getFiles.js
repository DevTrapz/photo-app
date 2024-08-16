const fs = require("fs");

function getFiles(fileExtension, directoryPath) {
  return new Promise((resolve, reject) => {
    fs.readdir(directoryPath, (err, files) => {
      if (err) {
        reject([]);
        return;
      }

      const images = files.filter((file) => file.endsWith(fileExtension));

      var shuffledImages = images;
      shuffle(shuffledImages);
      resolve(images);
    });
  });
}

// Fisher-Yates shuffling algorithm
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

module.exports = { getFiles, shuffle };
