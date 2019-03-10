const webpack = require('webpack');

const isProd = (process.env.NODE_ENV || 'production') === 'production';

const assetPrefix = isProd ? '/hookleton' : '';

module.exports = {
  exportPathMap: () => ({
    '/': { page: '/' },
    '/todo': { page: '/todo' },
    '/mouse': { page: '/mouse' },
    '/counter': { page: '/counter' },
    '/counters5x5': { page: '/counters5x5' },
    '/counters10x40': { page: '/counters10x40' },
    '/counters10x40blocking': { page: '/counters10x40blocking' },
    '/counterNested': { page: '/counterNested' },
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
