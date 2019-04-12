const PDFParser = require('pdf2json');
const fs = require('fs');

const { ESTADOS } = require('./data.js');

function readPdfLines(mainUpload) {

  return new Promise((resolve, reject) => {
    const pdfParser = new PDFParser();
    pdfParser.on('pdfParser_dataError', errData => {
      reject(errData);
    });
    pdfParser.on('pdfParser_dataReady', pdfData => {
      const texts = pdfData.formImage.Pages[0].Texts;
      const lines = {};

      texts.forEach(text => {
        const y = text.y;
        const val = decodeURIComponent(text.R[0].T);
        if (lines[y]) {
          lines[y].push(val);
        } else {
          lines[y] = [val];
        }
      });

      // texts.forEach(text => {
      //   if (text.y < 28) {
      //     console.log('TEXT>>>>>>>>>>', text, text.R[0].T);
      //   }
      //   const y = text.y;
      //   const val = decodeURIComponent(text.R[0].T);
      //   if (lines[y]) {
      //     if (lastX[y] + 1.6 >  text.x ) {
      //       const l = lines[y].length - 1;
      //       lines[y][l] += ' ' + val;
      //     } else if (lastX[y] + 0.240 > text.x ) {
      //       const l = lines[y].length - 1;
      //       lines[y][l] +=  val;
      //     } else {
      //       lines[y].push(val);
      //     }
      //     lastX[y] = text.x;
      //   } else {
      //     lastX[y] = text.x;
      //     lines[y] = [val];
      //   }
      // });

      resolve(lines);
    });

    pdfParser.loadPDF(mainUpload);
  });
}

module.exports = { readPdfLines };