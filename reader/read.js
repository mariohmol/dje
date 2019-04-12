const fs = require('fs');
const es = require('event-stream');
const async = require('async');
const path = require('path');

const readFile = function (file, terms, cb=null) {
  lineNr = 0;
  let currentProcess;
  let found = [];
  var s = fs.createReadStream(file)
    .pipe(es.split())
    .pipe(es.mapSync(function (line) {

      // pause the readstream
      s.pause();

      lineNr += 1;
      terms.forEach(term => {
        if (line.indexOf(term) >= 0) {
          console.log(line)
          found.push(line)
        }
      });


      // process line here and call s.resume() when rdy
      // function below was for logging memory usage
      // console.log(lineNr);

      // resume the readstream, possibly from a callback
      s.resume();
    })
      .on('error', function (err) {
        if(cb){
          cb()
        }
        console.log('Error while reading file.', err);
      })
      .on('end', function () {
        if(cb){
          cb()
        }
        console.log('Read entire file: ', file)
      })
    );

}

const readFolder = function (folder ,terms) {
  
  // Read all files in ./incrementals folder
  fs.readdir(folder, (e, files) => {
    async.filterSeries(files.sort(), (file, cb) => {
      console.log('File: ', folder+'/'+file);
      readFile(folder+'/' + file, terms, cb);
    }, (err, validFiles) => {
      console.log(validFiles);  // => Prints a list of all valid files
    });
  });
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
module.exports = { readFile, readFolder, readAllLines };
