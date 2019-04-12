library(dje) 
#Rscript --vanilla parse.R tjsp 2019-04-11
args = commandArgs(trailingOnly=TRUE)
path = paste('./download/', args[2], '/',args[1],'_dje_',args[2],'/',  sep = "")
#file = paste(path ,args[1], '_',args[3],'_',args[2],'.pdf',  sep = "")
dje_to_text(path)