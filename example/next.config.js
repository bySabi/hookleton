const webpack = require('webpack');

const PREFIX = '/hookleton';

module.exports = {
  exportPathMap: () => ({
    '/': { page: '/' },
    '/todo': { page: '/todo' },
    '/mouse': { page: '/mouse' },
    '/counter': { page: '/counter' },
    '/fetch': { page: '/fetch' },
    '/counterContext': { page: '/counterContext' },
    '/counterHookleton': { page: '/counterHookleton' },
    '/mouseContext': { page: '/mouseContext' },
    '/mouseHookleton': { page: '/mouseHookleton' }
  }),
  assetPrefix: PREFIX
};
