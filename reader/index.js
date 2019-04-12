

const { readerDownload } = require('./download.js');
const { convertToText } = require('./convert.js');
const { readFile, readFolder } = require('./read.js');


function getDay(day){
  readerDownload(day);
  convertToText(day);
}
const terms = [
    '1111111-62.2016.8.26.0100'
  ]
const day = '2019-04-06';
const folder = `download/${day}/tjsp_dje_${day}_txt/`

getDay(day);
// convertToText(day);
// readFolder(folder,terms);
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


