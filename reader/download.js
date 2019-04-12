const moment = require('moment');
const fs = require('fs');

const { exec } = require('child_process');
const { ESTADOS } = require('./data.js');

const readerDownload = function( readDate = null,tribunais = null) {

  return new Promise((resolve, reject) => {
    //TJAC,TJSP,TJSC,
    const executar = tribunais || null;
    const logs = {};
    const data = readDate || dateToString(new Date());
    let count = 0;
    const total = Object.keys(ESTADOS).length;
    for (let estado in ESTADOS) {
      if (executar && executar.indexOf(estado) < 0) {
        logs[estado] = { data, status: false, obs: 'pulou' };
        count++;
        continue
      }
      // "Rscript --vanilla run.R TJSP 2019-04-11"
      const comando = `Rscript --vanilla run.R ${estado} ${data}`;
      console.log('Executando ', comando);

      exec(comando, (err, stdout, stderr) => {
        count++;
        if (err) {
          console.error('ERROR:', err);
          logs[estado] = { data, status: false, obs: 'error', err, stdout, stderr };
          if (count == total) {
            finalExecution();
          }
          // node couldn't execute the command
          return;
        }

        // the *entire* stdout and stderr (buffered)
        console.log(`stdout: ${stdout}`);
        if (stdout.indexOf('EXISTS') >= 0) {
          logs[estado] = { data, status: true, obs: 'existe', err, stdout, stderr };
        } else if (stdout.indexOf('OK!') >= 0) {
          logs[estado] = { data, status: true, obs: 'ok', err, stdout, stderr };
        }
        else {
          logs[estado] = { data, status: true, obs: '', err, stdout, stderr };
        }

        console.log(`stderr: ${stderr}`);
        if (count == total) {
          finalExecution();
        }
      });
    }


    function finalExecution() {
      console.log(logs);

      fs.writeFile("logs.json", JSON.stringify(logs, null, 2), 'utf8', function (err) {
        if (err) {
          reject(err)
          console.log("An error occured while writing JSON Object to File.", err);
          return;
        }
        resolve();
        console.log("JSON file has been saved.");
      });
    }
  });
}


function dateToString(d){
  return moment(d).format('YYYY-MM-DD');
}
module.exports = { readerDownload };