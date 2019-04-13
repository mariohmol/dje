# TODO

## RJ

Mais dificil, pegar pagina a pagina

'TJRJ','https://www3.tjrj.jus.br/consultadje/consultaDJE.aspx','s

TODO:
https://www3.tjrj.jus.br/consultadje/pdf.aspx?dtPub=12/04/2019&caderno=C&pagina=1


## TJAP


Pegar últimas publicações:

http://tucujuris.tjap.jus.br/tucujuris/pages/consultar-dje/consultar-dje.html

`.espaco-abaixo`

```html
<span data-bind="text: num_diario_formatado" class="numeros">65/2019</span>
<span data-bind="moment: dt_divulgacao, format: 'DD [de] MMMM [de] YYYY'">10 de Abril de 2019</span>
```

Link direto

http://tucujuris.tjap.jus.br/api/publico/download-diario?id=2660&numeroDiario=2019000065&captcha=


## TJES

Parece nao ter link de download


## TJGO

TODO:
Get Month Link:
http://tjdocs.tjgo.jus.br/pastas/6506
```html 
<span id="nome-arquivo"> <a href="/pastas/6521">05 - Maio</a></span>
```

Entra na pasta do mes:
http://tjdocs.tjgo.jus.br/pastas/6521

```html
<span id="nome-arquivo">
        <a href="/documentos/513336">DJE_2718_II_29032019.pdf</a>
      </span>
```

Download Direto:
http://tjdocs.tjgo.jus.br/documentos/514229/download


## TJMT

POST
https://www.tjmt.jus.br/Dje

ParamPesquisa: 1
NumeroEdicao: 
DataInicial: 12/04/2019
DataFinal: 12/04/2019
data: 12/04/2019,12/04/2019

```html
<div class="caderno-dje-row">
        <a href="http://sistemadje.tjmt.jus.br/publicacoes/10473-2019 C1 Tribunal de Justiça.pdf" target="_blank" id="1">
            <span class="sprite-dje sprite-ico-pdf"></span>
            Tribunal de Justiça 
        </a>
</div>
```


## TJPB

Usa JSF, tem q usar browser


## TJPE


Ultimos no link: https://www.tjpe.jus.br/dje/djeletronico?visaoId=tjdf.djeletronico.comum.internet.apresentacao.VisaoDiarioEletronicoInternetPorData

`#tabela_diariosConsultados`

```html
<tr><td style="text-align: CENTER;">2019</td><td style="text-align: CENTER;">70</td><td style="text-align: CENTER;">15/04/2019</td><td style="text-align: CENTER;"><a href="http://www.tjpe.jus.br/dje/DownloadServlet?dj=DJ70_2019-ASSINADO.PDF&amp;statusDoDiario=ASSINADO" class="downloadPdf" target="_blank" title="Visualizar Diário">Visualizar</a></td><td style="text-align: CENTER;"><a href="http://www.tjpe.jus.br/dje/DownloadServlet?dj=DJ70_2019-ASSINADO.PDF.P7S&amp;statusDoDiario=ASSINADO" class="downloadAssinado" target="_blank" title="Visualizar Diário">Visualizar</a></td></tr>
```
Link direto:
http://www.tjpe.jus.br/dje/DownloadServlet?dj=DJ70_2019-ASSINADO.PDF&statusDoDiario=ASSINADO

## TJPI

TODO: ??

https://www.tjpi.jus.br/site/modules/diario/BuscaAvancada.find.mtw


## TJPR

TODO:

POST :
https://portal.tjpr.jus.br/e-dj/publico/diario/pesquisar.do


FormData
```
pageSize: 10
pageNumber: 1
sortColumn: dataVeiculacao
sortOrder: desc
numero: 
dataVeiculacao: 12/04/2019
```

`<a href="javascript:downloadWindow('/e-dj/publico/diario/baixar.do?tjpr.url.crypto=5a959139cf5e5555');" class="link" title="Baixar">Baixar</a></td>
              <td>`

Baixar PDF da url : https://portal.tjpr.jus.br/e-dj/publico/diario/baixar.do?tjpr.url.crypto=5a959139cf5e5555


## TJRO

Pegar Links em: 

https://www.tjro.jus.br/diario_oficial/

Link direto: https://www.tjro.jus.br/novodiario/2019/20190412814-NR69.pdf

## TJRR

Link dieto: http://diario.tjrr.jus.br/dpj/dpj-20190412.pdf


## TJRS

Pegar os ID:

http://www.tjrs.jus.br/busca/?tb=dj

Usar no link pro PDF

http://www3.tjrs.jus.br/servicos/diario_justica/pag_move.php?tp=0&ed=6481&ult=&pag=&va=


## TJSE

POST
http://www.diario.tjse.jus.br/diario/internet/pesquisar.wsp
tmp_origem: 
tmp.diario.dt_inicio: 12/04/2019
tmp.diario.dt_fim: 12/04/2019
tmp.diario.cd_caderno: 
tmp.diario.cd_secao: 
tmp.diario.pal_chave: 
wi.token: 7QC8MY0ILEVCAWJBKN7S
tmp.diario.id_advogado: 


Ou pegar os ultimos
http://www.diario.tjse.jus.br/diario/internet/pesquisar.wsp

```html
<td class="grid_center"><a href="#" onclick="ver('5115');">
  <b>5115</b><br><i>(08 de Abril de 2019)</i><br>
  </a>&nbsp;
</td>
```

Link direto:
http://www.diario.tjse.jus.br/diario/diarios/5115.pdf

## TJTO


https://wwa.tjto.jus.br/diario/pesquisa/arquivos


```html
<a class="arquivo" href="http://wwa.tjto.jus.br/diario/diariopublicado/3469.pdf" title="Diário de Justiça nº 4479 publicado em 12/04/2019.">
    <div class="span3 well arquivo">
        <em class="fa fa-file-pdf-o pdf pull-left" aria-hidden="true"></em>
        <div class="arquivo-descricao" aria-hidden="true">
            <div>nº 4479</div>
            <div>12/04/2019</div>
        </div>
    </div>
</a>
```


Link direto:

http://wwa.tjto.jus.br/diario/diariopublicado/3469.pdf
\


