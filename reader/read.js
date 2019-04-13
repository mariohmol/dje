const fs = require('fs');
const es = require('event-stream');
const async = require('async');
const path = require('path');

const readFile = function (file, terms, found = {}, cb = null) {
  lineNr = 0;
  let linein = false;
  let currentLine;
  let currentTerm;

  var s = fs.createReadStream(file)
    .pipe(es.split())
    .pipe(es.mapSync(function (line) {

      // pause the readstream
      s.pause();
      // console.log(line , '-------------')
      lineNr += 1;

      if (linein) {
        if (line.length < 5) {
          linein = false
          found[currentTerm] = currentLine;
        } else {
          currentLine = currentLine + ' ' + line;
        }
      }

      terms.forEach(term => {
        if (line.indexOf(term) >= 0) {
          currentLine = line;
          currentTerm = term;
          linein = true;
        }
      });


      // process line here and call s.resume() when rdy
      // function below was for logging memory usage

      // resume the readstream, possibly from a callback
      s.resume();
    })
      .on('error', function (err) {
        if (cb) {
          cb()
        }
        console.log('Error while reading file.', err);
      })
      .on('end', function () {
        if (cb) {
          console.log(found)
          cb(found)
        }
        console.log('Read entire file: ', file)
      })
    );

}

const readFolder = function (folder, terms) {

  return new Promise((resolve, reject) => {
    let found = {};
    // Read all files in ./incrementals folder
    fs.readdir(folder, (e, files) => {
      if (!files) {
        return;
      }
      async.filterSeries(files.sort(), (file, cb) => {
        console.log('File: ', folder + '/' + file);
        if (file.indexOf('.zip') > 0 || file.indexOf('.html') > 0) {
          cb();
        } else {
          readFile(folder + '/' + file, terms, found, cb);
        }
      }, (err, validFiles) => {
        console.log(validFiles);  // => Prints a list of all valid files
      });
      resolve(found);
    });
  })

}

function readAllLines(folder) {
  fs.readFile(path.join(folder, file), (err, data) => {
    const lines = data.toString().split('\r\n');

    let previous = extractTimestamp(lines[1]);

    if (latest && latest !== previous) {
      return cb();
    }

    latest = extractTimestamp(lines[0]);

    cb(null, true);
  });
}

const readTerms = function (day, terms) {
  const termsByTJ = {};
  terms.forEach(t => {
    if (termsByTJ[t.tj]) {
      termsByTJ[t.tj].push(t.term);
    } else {
      termsByTJ[t.tj] = [t.term];
    }
  });

  for (key in termsByTJ) {
    const folderTJ = `download/${day}/tj${key}_dje_${day}_txt/`
    readFolder(folderTJ, termsByTJ[key])
      .then(found => {
        console.log(found);
      })
  }
}
module.exports = { readFile, readFolder, readAllLines, readTerms };
