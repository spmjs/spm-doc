var path = require('path');
var spmrc = require('spmrc');
var spawn = require('win-spawn');
var nico = require('nico');
var DOC_PATH = '_site', pkg;

try {
  var spm = require('spm');
} catch (e) {
  console.log(' You need install spm first');
  process.exit(2);
}
var grunt = require('spm-grunt');
var spmrc = require('spmrc');

module.exports = function(commander) {

  try {
    pkg = require(path.resolve('package.json'));
    pkg.spm.output;
  } catch(e) {
    console.log(  'Check if package.json and "spm" key existed.');
    process.exit();
  }

  commander.config = getThemePath();

  if (commander.clean) {
    cleanDoc();
  }

  if (commander.build) {
    nico.build(commander);
  }

  if (commander.server || commander.watch) {
    commander.port = commander.port || 8000;
    nico.server(commander);
  }

  if (commander.publish) {
    // spm 和 nico 同时用到了 source ，这里只给 spm 用
    var source = commander.source || 'default';
    commander.source = '';
    cleanDoc();
    nico.build(commander);
    spawn('spm', ['publish', '--doc', DOC_PATH, '-s', source], {stdio: 'inherit'});
  }

};

function getThemePath() {
  var theme = (function () {
    // 名称若恰好为 stylib ，强制使用 alice 模板
    if (pkg.family === 'alice' || pkg.name === 'stylib') {
      return 'alice';
    }
    // output 中全是样式才用 alice
    var output = pkg.spm.output;
    if (output) {
      for (var i in output) {
        var f = output[i];
        if (!/\.(css|stylus|less)$/.test(f)) return 'arale';
      }
    } else {
      return 'arale';
    }
    return 'alice';
  })();
  return path.join(
    spmrc.get('user.home'),
    '.spm/themes/' + theme + '/nico.js'
  );
}

function cleanDoc() {
  spawn('rm', ['-rf',DOC_PATH]);
}
