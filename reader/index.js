const { exec } = require('child_process');
const { ESTADOS } = require('./data.js');
const fs = require('fs');
const PDFParser = require('pdf2json');

//TJAC,TJSP,TJSC,
const executar = null; //"";
const logs = {};
const data = '2019-04-11';
let count = 0;
const total = Object.keys(ESTADOS).length;
for (let estado in ESTADOS) {
  if (executar && executar.indexOf(estado) < 0) {
    logs[estado] = { data, status: false, obs: 'pulou' };
    count++;
    continue
  }
  // "Rscript --vanilla run.R TJSP 2019-04-11"
  const comando = `Rscript --vanilla run.R ${estado} ${data}`;
  console.log('Executando ', comando);
  exec(comando, (err, stdout, stderr) => {
    count++;
    if (err) {
      console.error('ERROR:', err);
      logs[estado] = { data, status: false, obs: 'error', err, stdout, stderr };
      if (count == total) {
        finalExecution();
      }
      // node couldn't execute the command
      return;
    }

    // the *entire* stdout and stderr (buffered)
    console.log(`stdout: ${stdout}`);
    if (stdout.indexOf('EXISTS') >= 0) {
      logs[estado] = { data, status: true, obs: 'existe', err, stdout, stderr };
    } else if (stdout.indexOf('OK!') >= 0) {
      logs[estado] = { data, status: true, obs: 'ok', err, stdout, stderr };
    }
    else {
      logs[estado] = { data, status: true, obs: '', err, stdout, stderr };
    }

    console.log(`stderr: ${stderr}`);
    if (count == total) {
      finalExecution();
    }
  });
}


function finalExecution() {
  console.log(logs);

  fs.writeFile("logs.json",  JSON.stringify(logs, null, 2), 'utf8', function (err) {
    if (err) {
        console.log("An error occured while writing JSON Object to File.");
        return console.log(err);
    }
 
    console.log("JSON file has been saved.");
});
}






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

/**
 * 

> dje@1.0.0 start /Users/mariohmol/dje
> node reader/index.js

Executando  Rscript --vanilla run.R TJAC 2019-04-11
Executando  Rscript --vanilla run.R TJAL 2019-04-11
Executando  Rscript --vanilla run.R TJAM 2019-04-11
Executando  Rscript --vanilla run.R TJAP 2019-04-11
Executando  Rscript --vanilla run.R TJBA 2019-04-11
Executando  Rscript --vanilla run.R TJCE 2019-04-11
Executando  Rscript --vanilla run.R TJDFT 2019-04-11
Executando  Rscript --vanilla run.R TJES 2019-04-11
Executando  Rscript --vanilla run.R TJGO 2019-04-11
Executando  Rscript --vanilla run.R TJMA 2019-04-11
Executando  Rscript --vanilla run.R TJMG 2019-04-11
Executando  Rscript --vanilla run.R TJMS 2019-04-11
Executando  Rscript --vanilla run.R TJMT 2019-04-11
Executando  Rscript --vanilla run.R TJPA 2019-04-11
Executando  Rscript --vanilla run.R TJPB 2019-04-11
Executando  Rscript --vanilla run.R TJPE 2019-04-11
Executando  Rscript --vanilla run.R TJPI 2019-04-11
Executando  Rscript --vanilla run.R TJPR 2019-04-11
Executando  Rscript --vanilla run.R TJRJ 2019-04-11
Executando  Rscript --vanilla run.R TJRN 2019-04-11
Executando  Rscript --vanilla run.R TJRO 2019-04-11
Executando  Rscript --vanilla run.R TJRR 2019-04-11
Executando  Rscript --vanilla run.R TJRS 2019-04-11
Executando  Rscript --vanilla run.R TJSC 2019-04-11
Executando  Rscript --vanilla run.R TJSE 2019-04-11
Executando  Rscript --vanilla run.R TJSP 2019-04-11
Executando  Rscript --vanilla run.R TJTO 2019-04-11
ERROR: { Error: Command failed: Rscript --vanilla run.R TJAP 2019-04-11
Error in purrr::map2_chr(date, booklet, ~get_dje_link(tj, .x, u_dje, .y)) : 
  objeto 'booklet' não encontrado
Calls: download_dje ... <Anonymous> -> mutate.tbl_df -> mutate_impl -> <Anonymous>
Execução interrompida

    at ChildProcess.exithandler (child_process.js:273:12)
    at ChildProcess.emit (events.js:180:13)
    at maybeClose (internal/child_process.js:936:16)
    at Socket.stream.socket.on (internal/child_process.js:353:11)
    at Socket.emit (events.js:180:13)
    at Pipe._handle.close [as _onclose] (net.js:541:12)
  killed: false,
  code: 1,
  signal: null,
  cmd: 'Rscript --vanilla run.R TJAP 2019-04-11' }
ERROR: { Error: Command failed: Rscript --vanilla run.R TJMG 2019-04-11
Error in purrr::map2_chr(date, booklet, ~get_dje_link(tj, .x, u_dje, .y)) : 
  objeto 'booklet' não encontrado
Calls: download_dje ... <Anonymous> -> mutate.tbl_df -> mutate_impl -> <Anonymous>
Execução interrompida

    at ChildProcess.exithandler (child_process.js:273:12)
    at ChildProcess.emit (events.js:180:13)
    at maybeClose (internal/child_process.js:936:16)
    at Process.ChildProcess._handle.onexit (internal/child_process.js:220:5)
  killed: false,
  code: 1,
  signal: null,
  cmd: 'Rscript --vanilla run.R TJMG 2019-04-11' }
ERROR: { Error: Command failed: Rscript --vanilla run.R TJES 2019-04-11
Error in purrr::map2_chr(date, booklet, ~get_dje_link(tj, .x, u_dje, .y)) : 
  objeto 'booklet' não encontrado
Calls: download_dje ... <Anonymous> -> mutate.tbl_df -> mutate_impl -> <Anonymous>
Execução interrompida

    at ChildProcess.exithandler (child_process.js:273:12)
    at ChildProcess.emit (events.js:180:13)
    at maybeClose (internal/child_process.js:936:16)
    at Process.ChildProcess._handle.onexit (internal/child_process.js:220:5)
  killed: false,
  code: 1,
  signal: null,
  cmd: 'Rscript --vanilla run.R TJES 2019-04-11' }
ERROR: { Error: Command failed: Rscript --vanilla run.R TJPE 2019-04-11
Error in purrr::map2_chr(date, booklet, ~get_dje_link(tj, .x, u_dje, .y)) : 
  objeto 'booklet' não encontrado
Calls: download_dje ... <Anonymous> -> mutate.tbl_df -> mutate_impl -> <Anonymous>
Execução interrompida

    at ChildProcess.exithandler (child_process.js:273:12)
    at ChildProcess.emit (events.js:180:13)
    at maybeClose (internal/child_process.js:936:16)
    at Process.ChildProcess._handle.onexit (internal/child_process.js:220:5)
  killed: false,
  code: 1,
  signal: null,
  cmd: 'Rscript --vanilla run.R TJPE 2019-04-11' }
ERROR: { Error: Command failed: Rscript --vanilla run.R TJDFT 2019-04-11
Error in purrr::map2_chr(date, booklet, ~get_dje_link(tj, .x, u_dje, .y)) : 
  objeto 'booklet' não encontrado
Calls: download_dje ... <Anonymous> -> mutate.tbl_df -> mutate_impl -> <Anonymous>
Execução interrompida

    at ChildProcess.exithandler (child_process.js:273:12)
    at ChildProcess.emit (events.js:180:13)
    at maybeClose (internal/child_process.js:936:16)
    at Process.ChildProcess._handle.onexit (internal/child_process.js:220:5)
  killed: false,
  code: 1,
  signal: null,
  cmd: 'Rscript --vanilla run.R TJDFT 2019-04-11' }
ERROR: { Error: Command failed: Rscript --vanilla run.R TJTO 2019-04-11
Error in purrr::map2_chr(date, booklet, ~get_dje_link(tj, .x, u_dje, .y)) : 
  objeto 'booklet' não encontrado
Calls: download_dje ... <Anonymous> -> mutate.tbl_df -> mutate_impl -> <Anonymous>
Execução interrompida

    at ChildProcess.exithandler (child_process.js:273:12)
    at ChildProcess.emit (events.js:180:13)
    at maybeClose (internal/child_process.js:936:16)
    at Process.ChildProcess._handle.onexit (internal/child_process.js:220:5)
  killed: false,
  code: 1,
  signal: null,
  cmd: 'Rscript --vanilla run.R TJTO 2019-04-11' }
ERROR: { Error: Command failed: Rscript --vanilla run.R TJPI 2019-04-11
Error in purrr::map2_chr(date, booklet, ~get_dje_link(tj, .x, u_dje, .y)) : 
  objeto 'booklet' não encontrado
Calls: download_dje ... <Anonymous> -> mutate.tbl_df -> mutate_impl -> <Anonymous>
Execução interrompida

    at ChildProcess.exithandler (child_process.js:273:12)
    at ChildProcess.emit (events.js:180:13)
    at maybeClose (internal/child_process.js:936:16)
    at Socket.stream.socket.on (internal/child_process.js:353:11)
    at Socket.emit (events.js:180:13)
    at Pipe._handle.close [as _onclose] (net.js:541:12)
  killed: false,
  code: 1,
  signal: null,
  cmd: 'Rscript --vanilla run.R TJPI 2019-04-11' }
ERROR: { Error: Command failed: Rscript --vanilla run.R TJGO 2019-04-11
Error in purrr::map2_chr(date, booklet, ~get_dje_link(tj, .x, u_dje, .y)) : 
  objeto 'booklet' não encontrado
Calls: download_dje ... <Anonymous> -> mutate.tbl_df -> mutate_impl -> <Anonymous>
Execução interrompida

    at ChildProcess.exithandler (child_process.js:273:12)
    at ChildProcess.emit (events.js:180:13)
    at maybeClose (internal/child_process.js:936:16)
    at Process.ChildProcess._handle.onexit (internal/child_process.js:220:5)
  killed: false,
  code: 1,
  signal: null,
  cmd: 'Rscript --vanilla run.R TJGO 2019-04-11' }
ERROR: { Error: Command failed: Rscript --vanilla run.R TJRS 2019-04-11
Error in purrr::map2_chr(date, booklet, ~get_dje_link(tj, .x, u_dje, .y)) : 
  objeto 'booklet' não encontrado
Calls: download_dje ... <Anonymous> -> mutate.tbl_df -> mutate_impl -> <Anonymous>
Execução interrompida

    at ChildProcess.exithandler (child_process.js:273:12)
    at ChildProcess.emit (events.js:180:13)
    at maybeClose (internal/child_process.js:936:16)
    at Process.ChildProcess._handle.onexit (internal/child_process.js:220:5)
  killed: false,
  code: 1,
  signal: null,
  cmd: 'Rscript --vanilla run.R TJRS 2019-04-11' }
ERROR: { Error: Command failed: Rscript --vanilla run.R TJMA 2019-04-11
Error in purrr::map2_chr(date, booklet, ~get_dje_link(tj, .x, u_dje, .y)) : 
  objeto 'booklet' não encontrado
Calls: download_dje ... <Anonymous> -> mutate.tbl_df -> mutate_impl -> <Anonymous>
Execução interrompida

    at ChildProcess.exithandler (child_process.js:273:12)
    at ChildProcess.emit (events.js:180:13)
    at maybeClose (internal/child_process.js:936:16)
    at Socket.stream.socket.on (internal/child_process.js:353:11)
    at Socket.emit (events.js:180:13)
    at Pipe._handle.close [as _onclose] (net.js:541:12)
  killed: false,
  code: 1,
  signal: null,
  cmd: 'Rscript --vanilla run.R TJMA 2019-04-11' }
ERROR: { Error: Command failed: Rscript --vanilla run.R TJPA 2019-04-11
Error in purrr::map2_chr(date, booklet, ~get_dje_link(tj, .x, u_dje, .y)) : 
  objeto 'booklet' não encontrado
Calls: download_dje ... <Anonymous> -> mutate.tbl_df -> mutate_impl -> <Anonymous>
Execução interrompida

    at ChildProcess.exithandler (child_process.js:273:12)
    at ChildProcess.emit (events.js:180:13)
    at maybeClose (internal/child_process.js:936:16)
    at Socket.stream.socket.on (internal/child_process.js:353:11)
    at Socket.emit (events.js:180:13)
    at Pipe._handle.close [as _onclose] (net.js:541:12)
  killed: false,
  code: 1,
  signal: null,
  cmd: 'Rscript --vanilla run.R TJPA 2019-04-11' }
ERROR: { Error: Command failed: Rscript --vanilla run.R TJRJ 2019-04-11
Error in purrr::map2_chr(date, booklet, ~get_dje_link(tj, .x, u_dje, .y)) : 
  objeto 'booklet' não encontrado
Calls: download_dje ... <Anonymous> -> mutate.tbl_df -> mutate_impl -> <Anonymous>
Execução interrompida

    at ChildProcess.exithandler (child_process.js:273:12)
    at ChildProcess.emit (events.js:180:13)
    at maybeClose (internal/child_process.js:936:16)
    at Process.ChildProcess._handle.onexit (internal/child_process.js:220:5)
  killed: false,
  code: 1,
  signal: null,
  cmd: 'Rscript --vanilla run.R TJRJ 2019-04-11' }
ERROR: { Error: Command failed: Rscript --vanilla run.R TJPB 2019-04-11
Error in purrr::map2_chr(date, booklet, ~get_dje_link(tj, .x, u_dje, .y)) : 
  objeto 'booklet' não encontrado
Calls: download_dje ... <Anonymous> -> mutate.tbl_df -> mutate_impl -> <Anonymous>
Execução interrompida

    at ChildProcess.exithandler (child_process.js:273:12)
    at ChildProcess.emit (events.js:180:13)
    at maybeClose (internal/child_process.js:936:16)
    at Process.ChildProcess._handle.onexit (internal/child_process.js:220:5)
  killed: false,
  code: 1,
  signal: null,
  cmd: 'Rscript --vanilla run.R TJPB 2019-04-11' }
ERROR: { Error: Command failed: Rscript --vanilla run.R TJSE 2019-04-11
Error in purrr::map2_chr(date, booklet, ~get_dje_link(tj, .x, u_dje, .y)) : 
  objeto 'booklet' não encontrado
Calls: download_dje ... <Anonymous> -> mutate.tbl_df -> mutate_impl -> <Anonymous>
Execução interrompida

    at ChildProcess.exithandler (child_process.js:273:12)
    at ChildProcess.emit (events.js:180:13)
    at maybeClose (internal/child_process.js:936:16)
    at Process.ChildProcess._handle.onexit (internal/child_process.js:220:5)
  killed: false,
  code: 1,
  signal: null,
  cmd: 'Rscript --vanilla run.R TJSE 2019-04-11' }
ERROR: { Error: Command failed: Rscript --vanilla run.R TJPR 2019-04-11
Error in purrr::map2_chr(date, booklet, ~get_dje_link(tj, .x, u_dje, .y)) : 
  objeto 'booklet' não encontrado
Calls: download_dje ... <Anonymous> -> mutate.tbl_df -> mutate_impl -> <Anonymous>
Execução interrompida

    at ChildProcess.exithandler (child_process.js:273:12)
    at ChildProcess.emit (events.js:180:13)
    at maybeClose (internal/child_process.js:936:16)
    at Process.ChildProcess._handle.onexit (internal/child_process.js:220:5)
  killed: false,
  code: 1,
  signal: null,
  cmd: 'Rscript --vanilla run.R TJPR 2019-04-11' }
ERROR: { Error: Command failed: Rscript --vanilla run.R TJRR 2019-04-11
Error in purrr::map2_chr(date, booklet, ~get_dje_link(tj, .x, u_dje, .y)) : 
  objeto 'booklet' não encontrado
Calls: download_dje ... <Anonymous> -> mutate.tbl_df -> mutate_impl -> <Anonymous>
Execução interrompida

    at ChildProcess.exithandler (child_process.js:273:12)
    at ChildProcess.emit (events.js:180:13)
    at maybeClose (internal/child_process.js:936:16)
    at Socket.stream.socket.on (internal/child_process.js:353:11)
    at Socket.emit (events.js:180:13)
    at Pipe._handle.close [as _onclose] (net.js:541:12)
  killed: false,
  code: 1,
  signal: null,
  cmd: 'Rscript --vanilla run.R TJRR 2019-04-11' }
ERROR: { Error: Command failed: Rscript --vanilla run.R TJRO 2019-04-11
Error in purrr::map2_chr(date, booklet, ~get_dje_link(tj, .x, u_dje, .y)) : 
  objeto 'booklet' não encontrado
Calls: download_dje ... <Anonymous> -> mutate.tbl_df -> mutate_impl -> <Anonymous>
Execução interrompida

    at ChildProcess.exithandler (child_process.js:273:12)
    at ChildProcess.emit (events.js:180:13)
    at maybeClose (internal/child_process.js:936:16)
    at Socket.stream.socket.on (internal/child_process.js:353:11)
    at Socket.emit (events.js:180:13)
    at Pipe._handle.close [as _onclose] (net.js:541:12)
  killed: false,
  code: 1,
  signal: null,
  cmd: 'Rscript --vanilla run.R TJRO 2019-04-11' }
ERROR: { Error: Command failed: Rscript --vanilla run.R TJMT 2019-04-11
Error in purrr::map2_chr(date, booklet, ~get_dje_link(tj, .x, u_dje, .y)) : 
  objeto 'booklet' não encontrado
Calls: download_dje ... <Anonymous> -> mutate.tbl_df -> mutate_impl -> <Anonymous>
Execução interrompida

    at ChildProcess.exithandler (child_process.js:273:12)
    at ChildProcess.emit (events.js:180:13)
    at maybeClose (internal/child_process.js:936:16)
    at Process.ChildProcess._handle.onexit (internal/child_process.js:220:5)
  killed: false,
  code: 1,
  signal: null,
  cmd: 'Rscript --vanilla run.R TJMT 2019-04-11' }
stdout: # A tibble: 6 x 5
  date    booklet link                             file                   result
  <fct>     <dbl> <chr>                            <chr>                  <chr> 
1 2019-0…      11 http://www.dje.tjsp.jus.br/cdje… download/tjsp_dje_201… EXISTS
2 2019-0…      12 http://www.dje.tjsp.jus.br/cdje… download/tjsp_dje_201… EXISTS
3 2019-0…      13 http://www.dje.tjsp.jus.br/cdje… download/tjsp_dje_201… EXISTS
4 2019-0…      14 http://www.dje.tjsp.jus.br/cdje… download/tjsp_dje_201… EXISTS
5 2019-0…      15 http://www.dje.tjsp.jus.br/cdje… download/tjsp_dje_201… EXISTS
6 2019-0…      18 http://www.dje.tjsp.jus.br/cdje… download/tjsp_dje_201… EXISTS

stderr: 
stdout: # A tibble: 4 x 5
  date    booklet link                              file                  result
  <fct>     <int> <chr>                             <chr>                 <chr> 
1 2019-0…       1 http://www.tjms.jus.br/cdje/down… download/tjms_dje_20… EMPTY 
2 2019-0…       2 http://www.tjms.jus.br/cdje/down… download/tjms_dje_20… EMPTY 
3 2019-0…       3 http://www.tjms.jus.br/cdje/down… download/tjms_dje_20… EMPTY 
4 2019-0…       4 http://www.tjms.jus.br/cdje/down… download/tjms_dje_20… EMPTY 

stderr: Downloading 'download/tjms_dje_2019-04-11/tjms_1_2019-04-11.pdf'... 
Downloading 'download/tjms_dje_2019-04-11/tjms_2_2019-04-11.pdf'... 
Downloading 'download/tjms_dje_2019-04-11/tjms_1_2019-04-11.pdf'... EMPTY!
Downloading 'download/tjms_dje_2019-04-11/tjms_3_2019-04-11.pdf'... 
Downloading 'download/tjms_dje_2019-04-11/tjms_2_2019-04-11.pdf'... EMPTY!
Downloading 'download/tjms_dje_2019-04-11/tjms_4_2019-04-11.pdf'... 
Downloading 'download/tjms_dje_2019-04-11/tjms_3_2019-04-11.pdf'... EMPTY!
Downloading 'download/tjms_dje_2019-04-11/tjms_4_2019-04-11.pdf'... EMPTY!

stdout: # A tibble: 4 x 5
  date    booklet link                              file                  result
  <fct>     <int> <chr>                             <chr>                 <chr> 
1 2019-0…       1 http://busca.tjsc.jus.br/dje-con… download/tjsc_dje_20… EXISTS
2 2019-0…       2 http://busca.tjsc.jus.br/dje-con… download/tjsc_dje_20… EXISTS
3 2019-0…       3 http://busca.tjsc.jus.br/dje-con… download/tjsc_dje_20… EXISTS
4 2019-0…       4 http://busca.tjsc.jus.br/dje-con… download/tjsc_dje_20… EXISTS

stderr: Warning messages:
1: In stri_extract_first_regex(string, pattern, opts_regex = opts(pattern)) :
  argument is not an atomic vector; coercing
2: In stri_extract_first_regex(string, pattern, opts_regex = opts(pattern)) :
  argument is not an atomic vector; coercing
3: In stri_extract_first_regex(string, pattern, opts_regex = opts(pattern)) :
  argument is not an atomic vector; coercing
4: In stri_extract_first_regex(string, pattern, opts_regex = opts(pattern)) :
  argument is not an atomic vector; coercing

stdout: # A tibble: 1 x 5
  date    booklet link                              file                  result
  <fct>     <dbl> <chr>                             <chr>                 <chr> 
1 2019-0…       1 http://diario.tjac.jus.br/edicoe… download/tjac_dje_20… EXISTS

stderr: 
stdout: # A tibble: 1 x 5
  date       booklet link  file                                           result
  <fct>        <dbl> <chr> <chr>                                          <chr> 
1 2019-04-11       1 <NA>  download/tjba_dje_2019-04-11/tjba_1_2019-04-1… ERROR 

stderr: Downloading 'download/tjba_dje_2019-04-11/tjba_1_2019-04-11.pdf'... 
Downloading 'download/tjba_dje_2019-04-11/tjba_1_2019-04-11.pdf'... ERROR!
Warning messages:
1: Expected 2 pieces. Missing pieces filled with `NA` in 9 rows [1, 2, 3, 4, 5, 6, 7, 8, 9]. 
2: In stri_detect_regex(string, pattern, negate = negate, opts_regex = opts(pattern)) :
  argument is not an atomic vector; coercing

ERROR: { Error: Command failed: Rscript --vanilla run.R TJRN 2019-04-11
Error in curl::curl_fetch_memory(url, handle = handle) : 
  SSL: no alternative certificate subject name matches target host name 'www.diario.tjrn.jus.br'
Calls: download_dje ... request_fetch -> request_fetch.write_memory -> <Anonymous>
Execução interrompida

    at ChildProcess.exithandler (child_process.js:273:12)
    at ChildProcess.emit (events.js:180:13)
    at maybeClose (internal/child_process.js:936:16)
    at Socket.stream.socket.on (internal/child_process.js:353:11)
    at Socket.emit (events.js:180:13)
    at Pipe._handle.close [as _onclose] (net.js:541:12)
  killed: false,
  code: 1,
  signal: null,
  cmd: 'Rscript --vanilla run.R TJRN 2019-04-11' }
stdout: # A tibble: 2 x 5
  date    booklet link                              file                  result
  <fct>     <int> <chr>                             <chr>                 <chr> 
1 2019-0…       1 http://esaj.tjce.jus.br/cdje/dow… download/tjce_dje_20… OK    
2 2019-0…       2 http://esaj.tjce.jus.br/cdje/dow… download/tjce_dje_20… OK    

stderr: Downloading 'download/tjce_dje_2019-04-11/tjce_1_2019-04-11.pdf'... 
Downloading 'download/tjce_dje_2019-04-11/tjce_2_2019-04-11.pdf'... 
Downloading 'download/tjce_dje_2019-04-11/tjce_1_2019-04-11.pdf'... OK!
Downloading 'download/tjce_dje_2019-04-11/tjce_2_2019-04-11.pdf'... OK!

stdout: # A tibble: 3 x 5
  date    booklet link                              file                  result
  <fct>     <int> <chr>                             <chr>                 <chr> 
1 2019-0…       1 http://esaj.tjam.jus.br/cdje/dow… download/tjam_dje_20… OK    
2 2019-0…       2 http://esaj.tjam.jus.br/cdje/dow… download/tjam_dje_20… OK    
3 2019-0…       3 http://esaj.tjam.jus.br/cdje/dow… download/tjam_dje_20… OK    

stderr: Downloading 'download/tjam_dje_2019-04-11/tjam_1_2019-04-11.pdf'... 
Downloading 'download/tjam_dje_2019-04-11/tjam_2_2019-04-11.pdf'... 
Downloading 'download/tjam_dje_2019-04-11/tjam_1_2019-04-11.pdf'... OK!
Downloading 'download/tjam_dje_2019-04-11/tjam_3_2019-04-11.pdf'... 
Downloading 'download/tjam_dje_2019-04-11/tjam_3_2019-04-11.pdf'... OK!
Downloading 'download/tjam_dje_2019-04-11/tjam_2_2019-04-11.pdf'... OK!

stdout: # A tibble: 2 x 5
  date    booklet link                              file                  result
  <fct>     <dbl> <chr>                             <chr>                 <chr> 
1 2019-0…       2 http://www2.tjal.jus.br/cdje/dow… download/tjal_dje_20… OK    
2 2019-0…       3 http://www2.tjal.jus.br/cdje/dow… download/tjal_dje_20… OK    

stderr: Downloading 'download/tjal_dje_2019-04-11/tjal_2_2019-04-11.pdf'... 
Downloading 'download/tjal_dje_2019-04-11/tjal_3_2019-04-11.pdf'... 
Downloading 'download/tjal_dje_2019-04-11/tjal_2_2019-04-11.pdf'... OK!
Downloading 'download/tjal_dje_2019-04-11/tjal_3_2019-04-11.pdf'... OK!

{ TJSP: { data: '2019-04-11', status: true, obs: 'existe' },
  TJMS: { data: '2019-04-11', status: true, obs: '' },
  TJSC: { data: '2019-04-11', status: true, obs: 'existe' },
  TJAC: { data: '2019-04-11', status: true, obs: 'existe' },
  TJBA: { data: '2019-04-11', status: true, obs: '' },
  TJCE: { data: '2019-04-11', status: true, obs: '' },
  TJAM: { data: '2019-04-11', status: true, obs: '' },
  TJAL: { data: '2019-04-11', status: true, obs: '' } }
 */