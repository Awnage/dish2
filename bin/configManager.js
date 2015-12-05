/**
 * Dish config manager.
 *
 * The script requires nodejs depends on these libraries:
 *
 * npm install csvtojson
 * npm install urllib-sync
 * npm install yargs
 */

const fs = require('fs');
const argv = require('yargs').argv;

var config,
    configFile;

/**
* Returns the config.
*/
exports.getConf = function() {
  if (config) {
    return config;
  }
  else {
    return initAndGetConf();
  }
}

/**
* Returns a basic authentication string.
*/
exports.getAuth = function() {
  return this.getConf().api.username + ':' + this.getConf().api.password;
}

/**
* Returns the "file" command line argument.
*/
exports.getFile = function() {
  return argv.file;
}

/**
* Initalizes configuration.
*/
initAndGetConf = function() {
  try {
    configFile = fs.readFileSync('conf.json', 'utf8');
  }
  catch (ex) {
    throw new Error('Configuration file "conf.json" was not found or could not be parsed');
  }

  config = JSON.parse(configFile);
  return config;
}