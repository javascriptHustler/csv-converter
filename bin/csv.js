#!/usr/bin/env node

/**
 * Module dependencies.
 */
var fs          = require('fs'),
  csv           = require('commander'),
  validate      = require('../lib/validate');

/**
 * Confingure CSV command line utility
 */
csv
  .version('1.3.2')
  .option('-i, --inputCSVFile [path]', 'Path to the CSV file you would like to convert to JSON.')
  .option('-p, --parsingModule [module]', 'A module that will contain parsing logic for your JSON object.')
  .parse(process.argv);

/**
 * Declarations
 */
var csvFilePath, parsingModule;

/**
 * Validate CSV File & Parsing Module
 */
csvFilePath = validate.csvFile(csv.inputCSVFile);
parsingModule = validate.parsingModule(csv.parsingModule);

/**
 * File doesn't exist return false
 * create JSON file based off of name of
 * csvFile
 */
if ( !csvFilePath ) return false;

outputJSONFile = csvFilePath.replace('.csv', '.json');

if ( !parsingModule ) {
  require('../lib/convert')(csvFilePath, outputJSONFile, function(row) {
    return row;
  });
  return true;
}

require('../lib/convert')(csvFilePath, outputJSONFile, require(parsingModule));



