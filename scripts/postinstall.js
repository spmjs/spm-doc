#!/usr/bin/env node

var fs = require('fs');
var path = require('path');
var spawn = require('win-spawn');
var semver = require('semver');

try {
  var spm = require('spm');
  spm.plugin.install({
    name: 'doc',
    binary: 'spm-doc',
    description: 'A documentation generator.'
  });
} catch(e) {
  console.log('  you need install spm to register the program');
  console.log();
  console.log('    \x1b[31m$ npm install spm@~2.0.0 -g\x1b[39m');
  console.log();
  console.log("  if you have installed spm, it maybe you haven't set a NODE_PATH environment variable");
  console.log();
}

installModule('nico', require('../package').dependencies.nico.slice(1));

function installModule(module, version) {
  if (!process.env.NODE_PATH) return;
  var p = path.join(process.env.NODE_PATH, module);
  if (fs.existsSync(p)) {
    // ignore when wrong format pkg
    try {
      var pkg = require(path.join(p, 'package.json'));
      if (semver.gte(pkg.version, version)) return;
    } catch(e) {}
  }
  console.log('  Installing npm module ' + module + '@' + version);  
  spawn('npm', ['install', module, '-g --slient'], {stdio: 'inherit'});
}
