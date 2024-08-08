const fs = require("fs");

function getFiles(fileExtension, directoryPath) {
  return new Promise((resolve, reject) => {
    fs.readdir(directoryPath, (err, files) => {
      if (err) {
        reject([]);
        return;
      }

      const images = files.filter((file) => file.endsWith(fileExtension));
      const shuffledImages = images.sort((a, b) => 0.5 - Math.random());
      resolve(shuffledImages);
    });
  });
}

module.exports = getFiles;
