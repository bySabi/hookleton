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
  '../index.html',
  '../.nojekyll'
];

RM.forEach(p => fs.removeSync(__dirname + '/../' + p));
