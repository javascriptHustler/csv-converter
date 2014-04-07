/**
 * Parsing Module
 * Each parsing module must export a function
 * with a paramter. The paramter will contain each
 * object that will be included in your JSON file.
 * 
 * For understanding console log row
 */
module.exports = function(row) {
  
  /**
   * This example 
   * Takes the employees.csv file on the root
   * and only take two key values from the csv and creates
   * a JSON object only from that.
   * 
   * For understanding console log conversion
   */
  var conversion = {};

  conversion.name = row['Employee Name'];
  conversion.album = row['Best Album'];

  /**
   * Validation
   *
   * If you don't want something to make it the JSON file
   * return false, and that row will omitted
   */
  if(conversion.name == 'West, Kanye') return false;
 
  /**
   * What ever object the object you return
   * will be placed in the JSON file
   */
  return conversion;
  // return false;

};