const fs = require('fs-extra')

const RM = [
  '.next',
  'out',
  '../_next',
  '../counter',
  '../counters5x5',
  '../counters10x40',
  '../counters10x40blocking',
  '../counterNested',
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
