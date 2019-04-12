const fs = require('fs');

const { qRequest, dowloadFile } = require('../utils.js');

function downloadDF(date) {
  dates = date.split('-');
  const year = dates[0];
  const month = dates[1];
  const urlData = `https://pesquisadje-api.tjdft.jus.br/v1/diarios/disponiveis/${month}/${year}`
  console.log(urlData);
  return qRequest({
    url: urlData
  })
    .then(res => {
      const data= JSON.parse(res.body);
      data.forEach(d => {
        if (d.dataDisponibilizacao === date) {
          const url = `https://pesquisadje-api.tjdft.jus.br/v1/diarios/pdf/2019/${d.numero}.pdf#page=0`
          
          const folder = `download/${date}/tjdft_dje_${date}`
          const folders = folder.split('/');
          let initial;
          folders.forEach(f=>{
            if(!initial){
              initial=f;
            }else{
              initial=initial+'/'+f;
            }
            if (!fs.existsSync(initial)) {
              fs.mkdirSync(initial);
            }  
          })
          
          dowloadFile(url, folder+`/tjdft_1_${date}.pdf`);
        }
      })
    })
}

module.exports = { downloadDF };
