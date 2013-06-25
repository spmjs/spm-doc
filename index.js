var fs = require('fs');
var nico = require('nico');
var spawn = require('win-spawn');
var DOC_PATH = '_site';
var pkg = JSON.parse(fs.readFileSync('./package.json'));

try {
  var spm = require('spm');
} catch (e) {
  console.log(' You need install spm first');
  process.exit(2);
}
var grunt = require('spm-grunt');
var spmrc = require('spmrc');

module.exports = function(options) {
  
  if (options.clean) {
    spawn('rm', ['-rf', DOC_PATH], { stdio: 'inherit'});
  }

  if (options.build) {
    
  }

  if (options.server) {}

  if (options.watch) {}

  if (options.publish) {}

};
