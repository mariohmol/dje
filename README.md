
# dje

Download e leitura de Diários do Judiciário de diversos estados brasileiros.

Estados integrados:

*  TJAC, TJAL, TJAM, TJBA, TJCE, TJMS, TJRN, TJSC, TJSP, TJDFT, TJMA, TJMG

Estados não integrados:

* TJAP, TJES, TJGO, TJMT, TJPB, TJPE, TJPI, TJPR, TJRO, TJRR, TJRS, TJSE, TJSP, TJTO, TJRJ


## Status de Desenvolvimento

| tribunal | link                                                                            | status                  |
| :------- | :------------------------------------------------------------------------------ | :----------------------- |
| TJAC     | <https://diario.tjac.jus.br/edicoes.php>                                        | sim (n captcha)                        |
| TJAL     | <https://www2.tjal.jus.br/cdje/index.do>                                        | sim (n captcha)                        |
| TJAM     | <https://consultasaj.tjam.jus.br/cdje/index.do>                                 | sim (n captcha)                        |
| TJAP     | <http://tucujuris.tjap.jus.br/tucujuris/pages/consultar-dje/consultar-dje.html> | não implementado (s captcha, mas tem link direto )  |
| TJBA     | <https://diario.tjba.jus.br/diario/internet/pesquisar.wsp>                      | sim (n captcha)                        |
| TJCE     | <http://esaj.tjce.jus.br/cdje/index.do>                                         | sim (n captcha)                        |
| TJDFT    | <https://pesquisadje.tjdft.jus.br/>                                             | sim (n captcha)                        |
| TJES     | <https://sistemas.tjes.jus.br/ediario/index.php/pesquisa>                       | não implementado                        |
| TJGO     | <http://tjdocs.tjgo.jus.br/pastas/333>                                          | não implementado                        |
| TJMA     | <http://www.tjma.jus.br/inicio/diario>                                          | sim (n captcha)                        |
| TJMG     | <https://dje.tjmg.jus.br/diarioJudiciarioData.do>                               | não (s, resolvido no decryptr) |
| TJMS     | <https://esaj.tjms.jus.br/cdje/index.do>                                        | sim (n captcha)                        |
| TJMT     | <https://www.tjmt.jus.br/Dje>                                                   | não implementado                        |
| TJPA     | <https://dje.tjpa.jus.br/ClientDJEletronico/app/home.html>                      | não implementad (sim captcha , mas tem link direto )  |
| TJPB     | <https://app.tjpb.jus.br/dje/paginas/diario_justica/publico/buscas.jsf>         | não implementado                        |
| TJPE     | <https://www.tjpe.jus.br/dje/djeletronico>                                      | não implementado                        |
| TJPI     | <https://www.tjpi.jus.br/site/modules/diario/BuscaAvancada.find.mtw>            | não implementado                        |
| TJPR     | <https://www.tjpr.jus.br/arquivos-diario-da-justica>                            | não implementado                        |
| TJRJ     | <https://www3.tjrj.jus.br/consultadje/consultaDJE.aspx>                         | não (s captcha, mas tem link direto)   |
| TJRN     | <https://www.diario.tjrn.jus.br/djonline/goto.jsf>                              | sim (n captcha)                        |
| TJRO     | <https://www.tjro.jus.br/diario_oficial/>                                       | não implementado                        |
| TJRR     | <http://diario.tjrr.jus.br/calendario.php>                                      | não implementado                        |
| TJRS     | <http://www.tjrs.jus.br/busca/?tb=dj>                                           | não implementado                        |
| TJSC     | <http://busca.tjsc.jus.br/dje-consulta/#/main>                                  | sim (n captcha)                        |
| TJSE     | <http://www.diario.tjse.jus.br/diario/internet/pesquisar.wsp>                   | não implementado                        |
| TJSP     | <https://dje.tjsp.jus.br/cdje/index.do>                                         | não implementado                        |
| TJTO     | <https://wwa.tjto.jus.br/diario/pesquisa/arquivos>                              | não implementado                        |



## Guia de Desenvolvimento

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