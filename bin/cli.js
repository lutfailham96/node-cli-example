#!/usr/bin/env node

const yargs = require('yargs');
const { proceedFile, isFileExist, } = require('../src/utils/common');

const argv = yargs
  .option('type', {
    alias: 't',
    description: 'Output type',
    type: 'string',
  })
  .option('output', {
    alias: 'o',
    description: 'Output file name',
    type: 'string',
  })
  .help()
  .alias('help', 'h').argv;

// default options
const defaultInputFile = "/var/log/nginx/error.log";

// reserved input vars
let inputFile = argv._[0];
let outputFile = "";
let outputFileType = "";

if (!inputFile) {
  inputFile = defaultInputFile;
}

if (!isFileExist(inputFile)) {
  console.error("No such file or directory:", inputFile);
  return;
}

// filter input file type
switch(argv.type) {
  case inputType.json:
    outputFileType = inputType.json;
    break;
  case inputType.text:
    outputFileType = inputType.text;
    break;
  default:
    console.error("Unknown output file type");
    return;
}

outputFile = !argv.output ? inputFile : argv.output

proceedFile(outputFileType, inputFile, outputFile)
