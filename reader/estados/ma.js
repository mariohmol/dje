const fs = require('fs');
var querystring = require('querystring');
const cheerio = require('cheerio');

const { qRequest, dowloadFile, createFolders } = require('../utils.js');

function downloadMA(date) {
  dates = date.split('-');
  const year = dates[0];
  const month = dates[1];
  const day = dates[2];

  const urlData = `http://www.tjma.jus.br/inicio/diario`

  const dateJoin= `${day}${month}${year}`;

  var form = {
    dtaInicio: `${day}/${month}/${year}`,
    dtaTermino: `${day}/${month}/${year}`,
    btnConsultar: `Consultar`
  };

  var formData = querystring.stringify(form);
  var contentLength = formData.length;


  return qRequest({
    headers: {
      'Content-Length': contentLength,
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    url: urlData,
    body: formData,
    method: 'POST'
  })
    .then(res => {
      const $ = cheerio.load(res.body)
      const links = $('#list-diario a');
      const folder = `download/${date}/tjma_dje_${date}`;
      for(i=0;i<links.length;i++){
        const link = links[i];
        const href = link.attribs.href;
        createFolders(folder);
        // && href.indexOf(dateJoin)>0
        if(href.indexOf('.pdf')>0){
          dowloadFile(href, folder + `/tjma_${i}_${date}.pdf`);
        }
      }
    })
}

module.exports = { downloadMA };
