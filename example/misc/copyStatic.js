const fs = require('fs-extra');

const FILE = 'out/.nojekyll';

fs.ensureFileSync(FILE);
fs.copySync('.next/static', 'out/_next/static');
