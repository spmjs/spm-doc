var path = require('path');
var spmrc = require('spmrc');
var spawn = require('win-spawn');
var DOC_PATH = '_site';

try {
  var spm = require('spm');
} catch (e) {
  console.log(' You need install spm first');
  process.exit(2);
}
var grunt = require('spm-grunt');
var spmrc = require('spmrc');

module.exports = function(options) {

  try {
    var pkg = require(path.resolve('package.json'));
    pkg.spm.output;
  } catch(e) {
    console.log(  'Check if package.json and "spm" key existed.');
    process.exit();
  }

  var theme = getTheme();

  if (options.clean) {
    runCommands([
      cleanDoc()
    ])();
  }

  if (options.build) {
    runCommands([
      buildDoc()
    ])();
  }

  if (options.server || options.watch) {
    options.port = options.port || '8000';
    spawn('nico', ['server', '-C', theme,
      options.watch && '--watch', '--port', options.port], { stdio: 'inherit'});    
  }

  if (options.publish) {
    runCommands([
      cleanDoc(),
      buildDoc(),
      'spm publish --doc ' + DOC_PATH + ' -s ' + (options.source || 'default')
    ])();
  }

};


function getTheme() {
  var theme = (function getTheme() {
    if (pkg.family === 'alice') return 'alice';
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
  return 'rm -rf ' + DOC_PATH;
}

function buildDoc() {
  return 'nico build -C ' + theme;
}

// Run command synchronously
// Example:
//   runCommands([
//     'touch a',
//     'rm a'
//   ])(done)
//
function runCommands(cmds) {
  return function(callback) {
    callback = callback || function() {};
    if (!cmds.length) {
      callback();
      return;
    }

    var cmd = cmds[0], output, out;
    var index = cmd.indexOf('>');
    if (index > -1) {
      output = cmd.substring(index + 1).replace(/(^\s+|\s+$)/g, '');
      cmd = cmd.substring(0, index).split(/\s+/);
    } else {
      cmd = cmd.split(/\s+/);
    }

    if (output) {
      out = fs.openSync(path.resolve(output), 'w');
    }

    spawn(cmd[0], cmd.slice(1), {stdio: [
      process.stdin,
      out ? out : process.stdout,
      process.stderr
    ]}).on('close', function() {
      runCommands(cmds.slice(1))(callback);
    });
  };
};
