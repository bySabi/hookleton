const fs = require('fs-extra')

fs
  .copy('.next/static', 'out/_next/static')
  .then(() => console.log('Copied static dir succesfully'))
