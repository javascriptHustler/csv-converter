/**
 * Module dependencies.
 */
var _     = require('underscore'),
  fs      = require('fs');

/**
 * Conversion
 * @param {String} csvFileName - Path of CVS File
 * @param {String} outputFile - Path to new output file
 * @param {requestCallback} cb - Should contain the parsing for you conversion
 */
module.exports = function(csvFileName, outputFile, cb) {

  /**
   * Uses csvtojson to create Converter class
   * @class
   * @classdesc Assign converter class
   */
  var Converter = require("csvtojson").core.Converter;

  /**
   *
   * @type {Object}
   */
  var csvConverter = new Converter(false);

  /**
   * Reads CSVFileName
   * @type {String}
   */
  var readStream = require("fs").createReadStream(csvFileName);

  fs.writeFile(outputFile);

  /**
   * Creates a stream and write to the JSON
   * @type {Stream}
   */
  var writeStream = require("fs").createWriteStream(outputFile);

  /**
   * Keeps track of when converting begins
   * @type {boolean}
   */
  var started = false;

  /**
   * Keeps track of all rows
   * @type {Array}
   */
  var rows = [];

  csvConverter.on("record_parsed",function(rowJSON){

    /**
     * Assign each row and pass to callback
     */
    var row = JSON.parse(JSON.stringify(rowJSON));

    /**
     * Create parsed row of data from converted json
     * @type {*}
     */
    var parsedRow = JSON.stringify(cb(row));

    /**
     * Create a collection or rows
     */
    rows.push({
      parsed: parsedRow,
      notParsed: row
    });

    /**
     * Write each parsed row
     */
    if ( parsedRow != 'false' ) {

      /**
       * If started is true write new line
       */
      if ( started ) {
        writeStream.write(",\n");
      }

      /**
       * Writing to file
       */
      writeStream.write(parsedRow);

    }

    if ( started == false ) {
      started = true;
    }

  });

  /**
   * Create open array at the beginning of file
   * @type {*}
   */
  writeStream.write("[\n"); //write array symbol

  csvConverter.on("end_parsed",function(){
    var errorMessage;

    writeStream.write("\n]");

    /**
     * Let user know all json objects that didn't come through
     */
    _.each(rows, function(row) {

      if ( row.parsed == 'false' ) {

        errorMessage = [
          '!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!',
          'This row can\'t be converted',
          '', JSON.stringify(row.notParsed), '',
          '!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!',
          ''
        ].join("\n");

      }

    });

  });

  /**
   * Begin conversion
   */
  csvConverter.from(readStream);

};