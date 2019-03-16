const webpack = require('webpack');

const isProd = (process.env.NODE_ENV || 'production') === 'production';

const assetPrefix = isProd ? '/hookleton' : '';

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
  assetPrefix: assetPrefix,
  webpack: config => {
    config.plugins.push(
      new webpack.DefinePlugin({
        'process.env.ASSET_PREFIX': JSON.stringify(assetPrefix),
      })
    );

    return config;
  },
};
