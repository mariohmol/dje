const request = require('request');
const https = require('https');
const fs = require('fs');

/**
 *  "file.jpg"
 */
const dowloadFile = function (url, fileName) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(fileName);
    const request = https.get(url, function (response) {
      response.pipe(file);
      resolve();
    });
  })
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

module.exports = { qRequest, dowloadFile }