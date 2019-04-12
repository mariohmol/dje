
<!-- README.md is generated from README.Rmd. Please edit that file -->

# dje

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

| tribunal | link                                                                            | captcha                  |
| :------- | :------------------------------------------------------------------------------ | :----------------------- |
| TJAC     | <https://diario.tjac.jus.br/edicoes.php>                                        | n                        |
| TJAL     | <https://www2.tjal.jus.br/cdje/index.do>                                        | n                        |
| TJAM     | <https://consultasaj.tjam.jus.br/cdje/index.do>                                 | n                        |
| TJAP     | <http://tucujuris.tjap.jus.br/tucujuris/pages/consultar-dje/consultar-dje.html> | s, mas tem link direto   |
| TJBA     | <https://diario.tjba.jus.br/diario/internet/pesquisar.wsp>                      | n                        |
| TJCE     | <http://esaj.tjce.jus.br/cdje/index.do>                                         | n                        |
| TJDFT    | <https://pesquisadje.tjdft.jus.br/>                                             | n                        |
| TJES     | <https://sistemas.tjes.jus.br/ediario/index.php/pesquisa>                       | n                        |
| TJGO     | <http://tjdocs.tjgo.jus.br/pastas/333>                                          | n                        |
| TJMA     | <http://www.tjma.jus.br/inicio/diario>                                          | n                        |
| TJMG     | <https://dje.tjmg.jus.br/diarioJudiciarioData.do>                               | s, resolvido no decryptr |
| TJMS     | <https://esaj.tjms.jus.br/cdje/index.do>                                        | n                        |
| TJMT     | <https://www.tjmt.jus.br/Dje>                                                   | n                        |
| TJPA     | <https://dje.tjpa.jus.br/ClientDJEletronico/app/home.html>                      | s, mas tem link direto   |
| TJPB     | <https://app.tjpb.jus.br/dje/paginas/diario_justica/publico/buscas.jsf>         | n                        |
| TJPE     | <https://www.tjpe.jus.br/dje/djeletronico>                                      | n                        |
| TJPI     | <https://www.tjpi.jus.br/site/modules/diario/BuscaAvancada.find.mtw>            | n                        |
| TJPR     | <https://www.tjpr.jus.br/arquivos-diario-da-justica>                            | n                        |
| TJRJ     | <https://www3.tjrj.jus.br/consultadje/consultaDJE.aspx>                         | s, mas tem link direto   |
| TJRN     | <https://www.diario.tjrn.jus.br/djonline/goto.jsf>                              | n                        |
| TJRO     | <https://www.tjro.jus.br/diario_oficial/>                                       | n                        |
| TJRR     | <http://diario.tjrr.jus.br/calendario.php>                                      | n                        |
| TJRS     | <http://www.tjrs.jus.br/busca/?tb=dj>                                           | n                        |
| TJSC     | <http://busca.tjsc.jus.br/dje-consulta/#/main>                                  | n                        |
| TJSE     | <http://www.diario.tjse.jus.br/diario/internet/pesquisar.wsp>                   | n                        |
| TJSP     | <https://dje.tjsp.jus.br/cdje/index.do>                                         | n                        |
| TJTO     | <https://wwa.tjto.jus.br/diario/pesquisa/arquivos>                              | n                        |


## Guia de Desenvolvimento

Instalação:

`npm run install`


`download_dje(tj, dates = Sys.Date(), path = ".", verbose = FALSE)`

`download_dje('TJSP', '2019-04-11', path = "./download", verbose = TRUE)`




echo "library(dje) download_dje('TJSP', '2019-04-11', path = './download', verbose = TRUE)" | R --no-save


echo "download_dje('TJSP', '2019-04-11', path = './download', verbose = TRUE)" | echo "library(dje)" | R --no-save


