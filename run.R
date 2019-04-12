# Rscript --vanilla run.R TJSP 2019-04-11
library(dje) 
args = commandArgs(trailingOnly=TRUE)
#message('Tribunal: ',args[0])
#message(args[1])
#message('Data: ')
#message(args[2])

#download_dje('TJSP', '2019-04-11', path = 'download', verbose = TRUE)
download_dje(args[1], args[2], path = 'download', verbose = TRUE)
