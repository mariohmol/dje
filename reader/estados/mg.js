const fs = require('fs');
const extract = require('extract-zip');
var querystring = require('querystring');
const cheerio = require('cheerio');

const { qRequest, dowloadFile, createFolders, saveFile } = require('../utils.js');

function downloadMG(date) {
  dates = date.split('-');
  const year = dates[0];
  const month = dates[1];
  const day = dates[2];


  return new Promise((resolve, reject) => {

    const keys = Object.keys(COMARCAS);

    for (i = 0; i < keys.length; i++) {
      const comarca = keys[i];
      const urlData = `https://www8.tjmg.jus.br/juridico/diario/index.jsp?dia=${day}${month}&completa=` + comarca;

      const folder = `download/${date}/tjmg_dje_${date}_txt`;
      const file = `/tjmg_${i}_${date}`;

      if (fs.existsSync(folder + file + '.html') || fs.existsSync(folder + file + '.zip')) {
        console.log('exists');
        continue;
      }
      console.log('Loading Link ', urlData);
      qRequest({
        url: urlData,
      })
        .then(res => {
          const $ = cheerio.load(res.body)

          const links = $('.corpo a');

          createFolders(folder);
          if (!links || links.length === 0) {
            console.log(`Saving file`, folder + file);
            saveFile(folder + file + '.html', res.body)
          } else {
            for (j = 0; j < links.length; j++) {
              const link = links[j];
              const href = link.attribs.href;//link.href;
              console.log(href)
              if (href && href.indexOf('.zip') > 0) {
                dowloadFile('https://www8.tjmg.jus.br/juridico/diario/' + href, folder + file + '.zip')
                  .then(c => {
                    const dir = __dirname + '/../../' + folder;
                    console.log(folder + file + '.zip', dir);
                    extract(folder + file + '.zip', { dir }, function (err) {
                      if (err) {
                        console.error(err)
                      } else {
                        console.log('unzipped');
                      }
                    });
                  });
              }
            }
          }
        })
    }

    resolve();
  })
}


const COMARCAS = {
  // "tjmg|edital": "TJMG:Editais",
  "2inst|adm": "2ª INSTÂNCIA: Administrativo",
  "2inst|jud": "2ª Inst. Judicial",
  "capital|j1": "CAPITAL: Belo Horizonte",
  "interior|0002": "Abaeté",
  "interior|0003": "Abre-Campo",
  "interior|0005": "Açucena",
  "interior|0009": "Águas Formosas",
  "interior|0011": "Aimorés",
  "interior|0012": "Aiuruoca",
  "interior|0015": "Além Paraíba",
  "interior|0016": "Alfenas",
  "interior|0017": "Almenara",
  "interior|0019": "Alpinópolis",
  "interior|0021": "Alto Rio Doce",
  "interior|0023": "Alvinópolis",
  "interior|0026": "Andradas",
  "interior|0028": "Andrelândia",
  "interior|0034": "Araçuaí",
  "interior|0035": "Araguari",
  "interior|0040": "Araxá",
  "interior|0042": "Arcos",
  "interior|0043": "Areado",
  "interior|0778": "Arinos",
  "interior|0049": "Baependi",
  "interior|0051": "Bambuí",
  "interior|0054": "Barão de Cocais",
  "interior|0056": "Barbacena",
  "interior|0059": "Barroso",
  "interior|0064": "Belo Vale",
  "interior|0027": "Betim",
  "interior|0069": "Bicas",
  "interior|0071": "Boa Esperança",
  "interior|0073": "Bocaiúva",
  "interior|0074": "Bom Despacho",
  "interior|0080": "Bom Sucesso",
  "interior|0081": "Bonfim",
  "interior|0082": "Bonfinópolis de Minas",
  "interior|0083": "Borda da Mata",
  "interior|0084": "Botelhos",
  "interior|0086": "Brasília de Minas",
  "interior|0089": "Brasópolis",
  "interior|0090": "Brumadinho",
  "interior|0091": "Bueno Brandão",
  "interior|0092": "Buenópolis",
  "interior|0093": "Buritis",
  "interior|0095": "Cabo Verde",
  "interior|0097": "Cachoeira de Minas",
  "interior|0045": "Caeté",
  "interior|0103": "Caldas",
  "interior|0878": "Camanducaia",
  "interior|0106": "Cambuí",
  "interior|0107": "Cambuquira",
  "interior|0109": "Campanha",
  "interior|0110": "Campestre",
  "interior|0111": "Campina Verde",
  "interior|0112": "Campo Belo",
  "interior|0115": "Campos Altos",
  "interior|0116": "Campos Gerais",
  "interior|0118": "Canápolis",
  "interior|0120": "Candeias",
  "interior|0123": "Capelinha",
  "interior|0126": "Capinópolis",
  "interior|0132": "Carandaí",
  "interior|0133": "Carangola",
  "interior|0134": "Caratinga",
  "interior|0137": "Carlos Chagas",
  "interior|0140": "Carmo da Mata",
  "interior|0141": "Carmo de Minas",
  "interior|0142": "Carmo do Cajuru",
  "interior|0143": "Carmo do Paranaíba",
  "interior|0144": "Carmo do Rio Claro",
  "interior|0879": "Carmópolis de Minas",
  "interior|0151": "Cássia",
  "interior|0153": "Cataguases",
  "interior|0155": "Caxambu",
  "interior|0166": "Cláudio",
  "interior|0175": "Conceição Mato Dentro",
  "interior|0172": "Conceição das Alagoas",
  "interior|0177": "Conceição do Rio Verde",
  "interior|0180": "Congonhas",
  "interior|0183": "Conselheiro Lafaiete",
  "interior|0184": "Conselheiro Pena",
  "interior|0182": "Conquista",
  "interior|0079": "Contagem",
  "interior|0775": "Coração de Jesus",
  "interior|0191": "Corinto",
  "interior|0193": "Coromandel",
  "interior|0194": "Coronel Fabriciano",
  "interior|0205": "Cristina",
  "interior|0208": "Cruzília",
  "interior|0209": "Curvelo",
  "interior|0216": "Diamantina",
  "interior|0220": "Divino",
  "interior|0223": "Divinópolis",
  "interior|0232": "Dores do Indaiá",
  "interior|0236": "Elói Mendes",
  "interior|0239": "Entre Rios de Minas",
  "interior|0240": "Ervália",
  "interior|0241": "Esmeraldas",
  "interior|0242": "Espera Feliz",
  "interior|0243": "Espinosa",
  "interior|0248": "Estrela do Sul",
  "interior|0249": "Eugenópolis",
  "interior|0251": "Extrema",
  "interior|0259": "Ferros",
  "interior|0261": "Formiga",
  "interior|0267": "Francisco Sá",
  "interior|0271": "Frutal",
  "interior|0273": "Galiléia",
  "interior|0105": "Governador Valadares",
  "interior|0278": "Grão-Mogol",
  "interior|0280": "Guanhães",
  "interior|0281": "Guapé",
  "interior|0283": "Guaranésia",
  "interior|0284": "Guarani",
  "interior|0287": "Guaxupé",
  "interior|0295": "Ibiá",
  "interior|0297": "Ibiraci",
  "interior|0114": "Ibirité",
  "interior|0301": "Igarapé",
  "interior|0303": "Iguatama",
  "interior|0309": "Inhapim",
  "interior|0312": "Ipanema",
  "interior|0313": "Ipatinga",
  "interior|0317": "Itabira",
  "interior|0319": "Itabirito",
  "interior|0322": "Itaguara",
  "interior|0324": "Itajubá",
  "interior|0325": "Itamarandiba",
  "interior|0327": "Itambacuri",
  "interior|0329": "Itamoji",
  "interior|0330": "Itamonte",
  "interior|0331": "Itanhandu",
  "interior|0332": "Itanhomi",
  "interior|0334": "Itapajipe",
  "interior|0335": "Itapecerica",
  "interior|0338": "Itaúna",
  "interior|0342": "Ituiutaba",
  "interior|0343": "Itumirim",
  "interior|0344": "Iturama",
  "interior|0346": "Jaboticatubas",
  "interior|0347": "Jacinto",
  "interior|0348": "Jacuí",
  "interior|0349": "Jacutinga",
  "interior|0351": "Janaúba",
  "interior|0352": "Januária",
  "interior|0355": "Jequeri",
  "interior|0358": "Jequitinhonha",
  "interior|0362": "João Monlevade",
  "interior|0363": "João Pinheiro",
  "interior|0145": "Juiz de Fora",
  "interior|0372": "Lagoa da Prata",
  "interior|0148": "Lagoa Santa",
  "interior|0377": "Lajinha",
  "interior|0378": "Lambari",
  "interior|0382": "Lavras",
  "interior|0384": "Leopoldina",
  "interior|0386": "Lima Duarte",
  "interior|0388": "Luz",
  "interior|0390": "Machado",
  "interior|0392": "Malacacheta",
  "interior|0393": "Manga",
  "interior|0394": "Manhuaçu",
  "interior|0395": "Manhumirim",
  "interior|0396": "Mantena",
  "interior|0398": "Mar de Espanha",
  "interior|0400": "Mariana",
  "interior|0405": "Martinho Campos",
  "interior|0407": "Mateus Leme",
  "interior|0408": "Matias Barbosa",
  "interior|0411": "Matozinhos",
  "interior|0414": "Medina",
  "interior|0416": "Mercês",
  "interior|0417": "Mesquita",
  "interior|0418": "Minas Novas",
  "interior|0421": "Miradouro",
  "interior|0422": "Miraí",
  "interior|0427": "Montalvânia",
  "interior|0428": "Monte Alegre de Minas",
  "interior|0429": "Monte Azul",
  "interior|0430": "Monte Belo",
  "interior|0431": "Monte Carmelo",
  "interior|0432": "Monte Santo de Minas",
  "interior|0434": "Monte Sião",
  "interior|0435": "Morada Nova de Minas",
  "interior|0433": "Montes Claros",
  "interior|0439": "Muriaé",
  "interior|0440": "Mutum",
  "interior|0441": "Muzambinho",
  "interior|0443": "Nanuque",
  "interior|0444": "Natércia",
  "interior|0446": "Nepomuceno",
  "interior|0447": "Nova Era",
  "interior|0188": "Nova Lima",
  "interior|0450": "Nova Ponte",
  "interior|0451": "Nova Resende",
  "interior|0452": "Nova Serrana",
  "interior|0453": "Novo Cruzeiro",
  "interior|0456": "Oliveira",
  "interior|0459": "Ouro Branco",
  "interior|0460": "Ouro Fino",
  "interior|0461": "Ouro Preto",
  "interior|0467": "Palma",
  "interior|0471": "Pará de Minas",
  "interior|0470": "Paracatu",
  "interior|0472": "Paraguaçu",
  "interior|0473": "Paraisópolis",
  "interior|0474": "Paraopeba",
  "interior|0476": "Passa-Quatro",
  "interior|0477": "Passa-Tempo",
  "interior|0479": "Passos",
  "interior|0480": "Patos de Minas",
  "interior|0481": "Patrocínio",
  "interior|0486": "Peçanha",
  "interior|0487": "Pedra Azul",
  "interior|0491": "Pedralva",
  "interior|0210": "Pedro Leopoldo",
  "interior|0498": "Perdizes",
  "interior|0499": "Perdões",
  "interior|0508": "Piranga",
  "interior|0511": "Pirapetinga",
  "interior|0512": "Pirapora",
  "interior|0514": "Pitangui",
  "interior|0515": "Piumhi",
  "interior|0517": "Poço Fundo",
  "interior|0518": "Poços de Caldas",
  "interior|0520": "Pompéu",
  "interior|0521": "Ponte Nova",
  "interior|0522": "Porteirinha",
  "interior|0525": "Pouso Alegre",
  "interior|0527": "Prados",
  "interior|0528": "Prata",
  "interior|0529": "Pratápolis",
  "interior|0534": "Presidente Olegário",
  "interior|0540": "Raul Soares",
  "interior|0542": "Resende Costa",
  "interior|0543": "Resplendor",
  "interior|0231": "Ribeirão das Neves",
  "interior|0549": "Rio Casca",
  "interior|0554": "Rio Novo",
  "interior|0555": "Rio Paranaíba",
  "interior|0556": "Rio Pardo de Minas",
  "interior|0557": "Rio Piracicaba",
  "interior|0558": "Rio Pomba",
  "interior|0559": "Rio Preto",
  "interior|0560": "Rio Vermelho",
  "interior|0567": "Sabará",
  "interior|0568": "Sabinópolis",
  "interior|0569": "Sacramento",
  "interior|0570": "Salinas",
  "interior|0572": "Santa Bárbara",
  "interior|0245": "Santa Luzia",
  "interior|0582": "Santa Maria do Suaçuí",
  "interior|0592": "Santa Rita de Caldas",
  "interior|0596": "Santa Rita Sapucaí",
  "interior|0598": "Santa Vitória",
  "interior|0604": "Santo Antônio do Monte",
  "interior|0607": "Santos Dumont",
  "interior|0610": "São Domingos do Prata",
  "interior|0611": "São Francisco",
  "interior|0620": "São Gonçalo Sapucaí",
  "interior|0621": "São Gotardo",
  "interior|0624": "São João da Ponte",
  "interior|0625": "São João Del Rey",
  "interior|0627": "São João do Paraíso",
  "interior|0628": "São João Evangelista",
  "interior|0629": "São João Nepomuceno",
  "interior|0637": "São Lourenço",
  "interior|0642": "São Romão",
  "interior|0643": "São Roque de Minas",
  "interior|0647": "São Sebastião Paraíso",
  "interior|0657": "Senador Firmino",
  "interior|0671": "Serro",
  "interior|0672": "Sete Lagoas",
  "interior|0674": "Silvianópolis",
  "interior|0680": "Taiobeiras",
  "interior|0684": "Tarumirim",
  "interior|0685": "Teixeiras",
  "interior|0686": "Teófilo Otôni",
  "interior|0687": "Timóteo",
  "interior|0689": "Tiros",
  "interior|0692": "Tombos",
  "interior|0693": "Três Corações",
  "interior|0058": "Três Marias",
  "interior|0694": "Três Pontas",
  "interior|0696": "Tupaciguara",
  "interior|0697": "Turmalina",
  "interior|0699": "Ubá",
  "interior|0701": "Uberaba",
  "interior|0702": "Uberlândia",
  "interior|0704": "Unaí",
  "interior|0707": "Varginha",
  "interior|0708": "Várzea da Palma",
  "interior|0710": "Vazante",
  "interior|0290": "Vespasiano",
  "interior|0713": "Viçosa",
  "interior|0718": "Virginópolis",
  "interior|0720": "Visconde Rio Branco"
}
module.exports = { downloadMG };
