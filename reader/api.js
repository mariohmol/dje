const superagent = require('superagent');
const moment = require('moment');
const dotenv = require('dotenv');
dotenv.config();

const { readerDownload } = require('./download.js');
const { convertToText } = require('./convert.js');
const { readTerms } = require('./read.js');

const GET_URL_API = process.env.GET_URL_API;
const POST_URL_API = process.env.POST_URL_API;

const day = moment().add(-1, 'days').format('YYYY-MM-DD');
console.log(day);


async function getTerms() {
  const res = await superagent.get(GET_URL_API);
  console.log(res.body);
  return res.body;
}

async function postTerms(found) {
  const res = await superagent.get(POST_URL_API).send(found)
  console.log(res.body);
  return res.body;
}

function getDay(day) {
  readerDownload(day);
  convertToText(day);
}


async function run() {
  const terms = await getTerms();
  console.log(terms);
  // getDay(day);
  // const found = readTerms(day, terms);
  // const finalanswer = postTerms(found);
  // console.log(finalanswer);
}

if (require.main === module) {
  run();
}

