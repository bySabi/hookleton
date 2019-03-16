const fs = require('fs-extra')

const RM = [
  '.next',
  'out',
  '../_next',
  '../counter',
  '../fetch',
  '../mouse',
  '../todo',
  '../counterContext',
  '../counterHookleton',
  '../mouseContext',
  '../mouseHookleton',
  '../index.html'
];

RM.forEach(p => fs.removeSync(__dirname + '/../' + p));
