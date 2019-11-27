import baseConfig from './webpack.base.config.babel';
import SWPrecacheWebpackPlugin from 'sw-precache-webpack-plugin';

const plugins = baseConfig.plugins;

baseConfig.plugins = [
  ...plugins,
  new SWPrecacheWebpackPlugin({
    cacheId: 'xtra',
    filename: 'service-worker.js',
    minify: true
  })
];

const config = {
  mode: 'production',
  devtool: '',
  ...baseConfig
};

export default config;
