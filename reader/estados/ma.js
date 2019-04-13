const fs = require('fs');
var querystring = require('querystring');
const cheerio = require('cheerio');

const { qRequest, dowloadFile, createProjects } = require('../utils.js');

function downloadMA(date) {
  dates = date.split('-');
  const year = dates[0];
  const month = dates[1];
  const day = dates[2];

  const urlData = `http://www.tjma.jus.br/inicio/diario`


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
        createProjects(folder);
        if(href.indexOf('.pdf')>0){
          dowloadFile(href, folder + `/tjma_${i}_${date}.pdf`);
        }
      }
      

      // const data = JSON.parse(res.body);
      // data.forEach(d => {
      //   if (d.dataDisponibilizacao === date) {
      //     const url = `https://pesquisadje-api.tjdft.jus.br/v1/diarios/pdf/2019/${d.numero}.pdf#page=0`

      //     const folder = `download/${date}/tjdft_dje_${date}`
      //     const folders = folder.split('/');
      //     let initial;
      //     folders.forEach(f => {
      //       if (!initial) {
      //         initial = f;
      //       } else {
      //         initial = initial + '/' + f;
      //       }
      //       if (!fs.existsSync(initial)) {
      //         fs.mkdirSync(initial);
      //       }
      //     })

      //     dowloadFile(url, folder + `/tjdft_1_${date}.pdf`);
      //   }
      // })
    })
}

module.exports = { downloadMA };
