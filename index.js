var path = require('path');
var spmrc = require('spmrc');
var spawn = require('win-spawn');
var DOC_PATH = '_site';
var theme = getTheme();

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
    cleanDoc();
  }

  if (options.build) {
    buildDoc();
  }

  if (options.server || options.watch) {
    options.port = options.port || '8000';
    spawn('nico', ['server', '-C', theme,
      options.watch && '--watch', '--port', options.port], { stdio: 'inherit'});    
  }

  if (options.publish) {
    cleanDoc();
    buildDoc();
    spawn('spm', ['publish', '--doc', DOC_PATH,
      '-s', options.source || 'default'], { stdio: 'inherit'});  
  }

};


function getTheme() {
  var pkg = require(path.resolve('package.json'));
  var theme = 'alice';

  if (pkg.family !== 'alice') {
    // output 中全是样式才用 alice
    var output = pkg.spm.output;
    if (output) {
      for (var i in output) {
        var f = output[i];
        if (!/\.(css|stylus|less)$/.test(f)) {
          theme = 'arale';
          break;
        }
      }
    }
  }
  return path.join(
    spmrc.get('user.home'),
    '.spm/themes/' + theme + '/nico.js'
  );
}

function cleanDoc() {
  spawn('rm', ['-rf', DOC_PATH], { stdio: 'inherit'});  
}

function buildDoc() {
  spawn('nico', ['build', '-C', theme], { stdio: 'inherit'});   
}
