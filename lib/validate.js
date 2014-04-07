/**
 * Module dependencies.
 */
var fs          = require('fs'),
    path        = require('path'),
    Error       = require('./errors');


// Combine these two methods

/**
 * @method csvFile
 * @param {String} fileName - Name of csv file
 */
module.exports.csvFile = function(fileName) {
  var directory, exist;

  exist = fs.existsSync(fileName);

  if ( !exist ) {
    
    directory = __dirname + '/' + fileName;
    exist = fs.existsSync(directory);

  } else {
    
    directory = fileName;

  }

  if ( exist ) return directory;

  new Error('CSV File doesn\'t exist');
  return false;
};

/**
 * @method parsingModule 
 * @param {String} fileName - Name of csv file
 */
module.exports.parsingModule = function(fileName) {
  var directory, exist;

  exist = fs.existsSync(fileName);

  if ( !exist ) {
    
    directory = __dirname + '/' + fileName;
    exist = fs.existsSync(directory);

  } else {
    
    directory = path.resolve(fileName);

  }

  if ( exist ) return directory;

  new Error('Parsing module file doesn\'t exist');
  return false;
};