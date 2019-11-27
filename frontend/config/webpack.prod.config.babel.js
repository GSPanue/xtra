import baseConfig from './webpack.base.config.babel';
import { GenerateSW } from 'workbox-webpack-plugin';
import path from 'path';

const root = path.resolve(__dirname, '..');
const plugins = baseConfig.plugins;

baseConfig.plugins = [
  ...plugins,
  new GenerateSW({
    globDirectory: path.join(root, 'dist'),
    globPatterns: ['**/*.{html,js,css'],
    swDest: path.join(root, 'dist/service-worker.js')
  })
];

const config = {
  mode: 'production',
  devtool: '',
  ...baseConfig
};

export default config;
