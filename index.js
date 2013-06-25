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
    spawn('rm', ['-rf', DOC_PATH], { stdio: 'inherit'});
  }

  if (options.build) {
    spawn('nico', ['build', '-C', theme], { stdio: 'inherit'});
  }

  if (options.server || options.watch) {
    options.port = options.port || '8000';
    console.log(options.port);
    spawn('nico', ['server', '-C', theme, options.watch && '--watch', '--port', options.port], { stdio: 'inherit'});    
  }

  if (options.publish) {
    spawn('spm', ['publish', '--doc', DOC_PATH], { stdio: 'inherit'});  
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
