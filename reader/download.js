const moment = require('moment');
const fs = require('fs');
const { exec } = require('child_process');
const { downloadDF } = require('./estados/df.js');
const { downloadMA } = require('./estados/ma.js');
const { downloadMG } = require('./estados/mg.js');

const { ESTADOS } = require('./data.js');

const readerDownload = function (readDate = null, tribunais = null) {

  return new Promise((resolve, reject) => {
    //TJAC,TJSP,TJSC,
    const executar = tribunais || null;
    const logs = {};
    const data = readDate || dateToString(new Date());
    let count = 0;
    const total = Object.keys(ESTADOS).length;
    for (let estado in ESTADOS) {
      if (!ESTADOS[estado] ||
        (executar && executar.indexOf(estado) < 0)) {
        count++;
        newLog({ data, status: false, obs: 'pulou', estado, count, total });
        continue
      }

      if (estado === 'TJDFT') {
        downloadDF(data)
          .then(c => {
            count++;
            newLog({ data, status: true, obs: 'ok', estado, count, total });
          }).catch(err => {
            count++;
            newLog({ data, status: false, obs: 'error', err, estado, count, total });
          })
        continue;
      } else if (estado === 'TJMA') {
        downloadMA(data)
          .then(c => {
            count++;
            newLog({ data, status: true, obs: 'ok', estado, count, total });
          }).catch(err => {
            count++;
            newLog({ data, status: false, obs: 'error', err, estado, count, total });
          })
        continue;
      }else if (estado === 'TJMG') {
        downloadMG(data)
          .then(c => {
            count++;
            newLog({ data, status: true, obs: 'ok', estado, count, total });
          }).catch(err => {
            count++;
            newLog({ data, status: false, obs: 'error', err, estado, count, total });
          })
        continue;
      }
      

      // "Rscript --vanilla run.R TJSP 2019-04-11"
      const comando = `Rscript --vanilla run.R ${estado} ${data}`;
      console.log('Executando ', comando);

      exec(comando, (err, stdout, stderr) => {
        count++;
        if (err) {
          // console.error('ERROR:', err);
          newLog({ data, status: false, obs: 'error', err, stdout, stderr, estado, count, total });
          if (count == total) {
            finalExecution();
          }
          // node couldn't execute the command
          return;
        }

        // the *entire* stdout and stderr (buffered)
        // console.log(`stdout: ${stdout}`);
        if (stdout.indexOf('EXISTS') >= 0) {
          newLog({ data, status: true, obs: 'existe', err, stdout, stderr, estado, count, total });
        } else if (stdout.indexOf('OK!') >= 0) {
          newLog({ data, status: true, obs: 'ok', err, stdout, stderr, estado, count, total });
        }
        else {
          newLog({ data, status: true, obs: '', err, stdout, stderr, estado, count, total });
        }

        // console.log(`stderr: ${stderr}`);
        if (count == total) {
          finalExecution();
        }
      });
    }


    function finalExecution() {
      console.log(logs);

      fs.writeFile("logs/download.json", JSON.stringify(logs, null, 2), 'utf8', function (err) {
        if (err) {
          reject(err)
          console.log("An error occured while writing JSON Object to File.", err);
          return;
        }
        resolve();
        console.log("JSON file has been saved.");
      });
    }

    function newLog(obj) {
      logs[obj.estado] = obj;
      console.log(obj);

      if (obj.count == obj.total) {
        finalExecution();
      }
    }
  });
}


function dateToString(d) {
  return moment(d).format('YYYY-MM-DD');
}
module.exports = { readerDownload };