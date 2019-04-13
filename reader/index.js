

const { readerDownload } = require('./download.js');
const { convertToText } = require('./convert.js');
const { readFile, readFolder } = require('./read.js');


function getDay(day){
  readerDownload(day);
  convertToText(day);
}
const terms = [
    '1111111-62.2016.8.26.0100',
    '0352286-78.2019.8.13.0000',
    '6024116-34.2015.8.13.0024'
  ]
const day = '2019-04-08';
const state = 'mg';
const folder = `download/${day}/tj${state}_dje_${day}_txt/`
// readerDownload(day, 'TJMG');

// getDay(day);
// convertToText(day);
readFolder(folder,terms);
// readFile('download/2019-04-08/tjsp_dje_2019-04-08_txt/tjsp_11_2019-04-08.txt',terms);

/**
 * EXEMPLOS
 * 
 * readerDownload('2019-04-08');
 * readerDownload('2019-04-07', 'TJSP');
 * 
 * convertToText('2019-04-08');
 * 
 * readFile('download/2019-04-08/tjsp_dje_2019-04-08_txt/tjsp_11_2019-04-08.txt',[
  '1111111-62.2016.8.26.0100',
  '-62.2016.8.26.0100'
]);
 */
// 


