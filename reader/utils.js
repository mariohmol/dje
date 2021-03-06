const request = require('request');
const https = require('https');
const fs = require('fs');

/**
 *  "file.jpg"
 */
const dowloadFile = function (url, fileName) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(fileName);
    console.log(`Download file`, url);
    const request = https.get(url, function (response) {
      response.pipe(file)
        .on('finish', function () { resolve(); });

    });
  })
}


const saveFile = function (fileName, content) {
  fs.writeFileSync(fileName, content)
}

const qRequest = function (options, json = false) {
  options.timeout = 25000;
  const q = new Promise((resolve, reject) => {
    // logger.info(inspect(options, { showHidden: false, depth: null }));
    request(options, function (error, response, body) {
      if (error) {
        reject(error);
      } else {
        if (json) {
          if (response.body) {
            try {
              resolve(JSON.parse(response.body));
            } catch (e) {
              resolve(response.body);
            }
            return;
          }
        }
        resolve(response);
      }
    });
  });

  return q;
};

function createFolders(folder) {
  const folders = folder.split('/');
  let initial;
  folders.forEach(f => {
    if (!initial) {
      initial = f;
    } else {
      initial = initial + '/' + f;
    }
    if (!fs.existsSync(initial)) {
      fs.mkdirSync(initial);
    }
  })
}
module.exports = { qRequest, dowloadFile, createFolders, saveFile }