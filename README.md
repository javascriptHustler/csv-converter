##Installation
Global
>npm install -g csv-converter

Locally
>npm install csv-converter
##Usage

```  
 $ csv --help

   Usage: csv [options]

   Options:
     -h, --help                       Output usage information
     -V, --version                    Output the version number
     -i, --inputCSVFile [path]        Path to the CSV file you would like to convert to JSON
     -p, --parsingModule [module]     A module that will contain parsing logic for your JSON object
     
    Examples:
     $ csv -h
     $ csv --help

```

##Examples
```
 Global - without parsingModule
 $ csv -i examples/employees.csv -i [pathToFile]
 
 Global - with parsingModule
 $ csv -i examples/employees.csv -i [pathToFile] - p [parsingModule]
 
 
 Local - without parsingModule
 $ node_modules/csv/bin/csv.js -i [pathToFile]
 
 Local - with parsingModule
 $ node_modules/csv/bin/csv.js -i [pathToFile] - p [parsingModule]
```

##Parsing Module
Most of the time you don't want "Company Name" as a property. You just want "company." Example json below.
```json
// obj["Company Name"] BAD
{
   "Company Name": "Best Buy"
},
// obj["company"] GOOD
{
   "company": "Best Buy"
}
```

There are also other flags with just converting csv files. Like what about omitting rows, and munipulating data, or adding concat rows. This is where the parsing module comes into the play.

The parsing module passes through each row in a loop until the stream is complete. Meaning you can return any new object based off the information given to you through the param.

###Examples Parsing Module
```js
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
```
