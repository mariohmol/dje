
# dje

Download e leitura de Diários do Judiciário de diversos estados brasileiros.

Estados integrados:

*  TJAC, TJAL, TJAM, TJBA, TJCE, TJMS, TJRN, TJSC, TJSP, TJDFT, TJMA, TJMG

Estados não integrados:

* TJAP, TJES, TJGO, TJMT, TJPB, TJPE, TJPI, TJPR, TJRO, TJRR, TJRS, TJSE, TJSP, TJTO, TJRJ


## Status de Desenvolvimento

| tribunal | link                                                                            | status                  |
| :------- | :------------------------------------------------------------------------------ | :----------------------- |
| **TJAC**     | OK (n captcha)                        |
| **TJAL**     | OK (n captcha)                        |
| **TJAM**     | OK (n captcha)                        |
| **TJAP**     | não implementado (s captcha, mas tem link direto )  |
| **TJBA**     | OK (n captcha)                        |
| **TJCE**     | OK (n captcha)                        |
| **TJDFT**    | OK (n captcha)                        |
| **TJES**     | não implementado                        |
| **TJGO**     | não implementado                        |
| **TJMA**     | OK (n captcha)                        |
| **TJMG**     | OK (link direto) |
| **TJMS**     | OK (n captcha)                        |
| **TJMT**     | não implementado (link direto)                       |
| **TJPA**     | não implementad (SIM captcha , mas tem link direto )  |
| **TJPB**     | não implementado (link direto)                       |
| **TJPE**     | não implementado (link direto)                       |
| **TJPI**     | não implementado                        |
| **TJPR**     | não implementado                        |
| **TJRJ**     | não (s captcha, mas tem link direto)   |
| **TJRN**     | OK (n captcha)                        |
| **TJRO**     | não implementado                        |
| **TJRR**     | não implementado                        |
| **TJRS**     | não implementado                        |
| **TJSC**     | OK (n captcha)                        |
| **TJSE**     | não implementado  (link direto)                        |
| **TJSP**     | OK                        |
| **TJTO**     | não implementado (link direto)                       |



## Guia de Desenvolvimento

### COLABORE!

Precisamos de ajuda para finalizar os estados, veja as ISSUES!


### Instalar 

Instale o R e o NPM na máquina.

Instalação:

```sh
npm intall
npm run install
npm run start
```

Em `reader/index.js` execute download e leitura do pdf como os exemplos abaixo:

```js

readerDownload('2019-04-11');
readerDownload('2019-04-12','TJMG,TJSP');

```


## Usando o R


``` r
knitr::kable(tibble::tribble(
  ~tribunal, ~link, ~captcha,
  'TJAC','https://diario.tjac.jus.br/edicoes.php','n',
  'TJAL','https://www2.tjal.jus.br/cdje/index.do','n',
  'TJAM','https://consultasaj.tjam.jus.br/cdje/index.do','n',
  'TJAP','http://tucujuris.tjap.jus.br/tucujuris/pages/consultar-dje/consultar-dje.html','s, mas tem link direto',
  'TJBA','https://diario.tjba.jus.br/diario/internet/pesquisar.wsp','n',
  'TJCE','http://esaj.tjce.jus.br/cdje/index.do','n',
  'TJDFT','https://pesquisadje.tjdft.jus.br/','n',
  'TJES','https://sistemas.tjes.jus.br/ediario/index.php/pesquisa','n',
  'TJGO','http://tjdocs.tjgo.jus.br/pastas/333','n',
  'TJMA','http://www.tjma.jus.br/inicio/diario','n',
  'TJMG','https://dje.tjmg.jus.br/diarioJudiciarioData.do','s, resolvido no decryptr',
  'TJMS','https://esaj.tjms.jus.br/cdje/index.do','n',
  'TJMT','https://www.tjmt.jus.br/Dje','n',
  'TJPA','https://dje.tjpa.jus.br/ClientDJEletronico/app/home.html','s, mas tem link direto',
  'TJPB','https://app.tjpb.jus.br/dje/paginas/diario_justica/publico/buscas.jsf','n',
  'TJPE','https://www.tjpe.jus.br/dje/djeletronico','n',
  'TJPI','https://www.tjpi.jus.br/site/modules/diario/BuscaAvancada.find.mtw','n',
  'TJPR','https://www.tjpr.jus.br/arquivos-diario-da-justica','n',
  'TJRJ','https://www3.tjrj.jus.br/consultadje/consultaDJE.aspx','s, mas tem link direto',
  'TJRN','https://www.diario.tjrn.jus.br/djonline/goto.jsf','n',
  'TJRO','https://www.tjro.jus.br/diario_oficial/','n',
  'TJRR','http://diario.tjrr.jus.br/calendario.php','n',
  'TJRS','http://www.tjrs.jus.br/busca/?tb=dj','n',
  'TJSC','http://busca.tjsc.jus.br/dje-consulta/#/main','n',
  'TJSE','http://www.diario.tjse.jus.br/diario/internet/pesquisar.wsp','n',
  'TJSP','https://dje.tjsp.jus.br/cdje/index.do','n',
  'TJTO','https://wwa.tjto.jus.br/diario/pesquisa/arquivos','n'
))
```