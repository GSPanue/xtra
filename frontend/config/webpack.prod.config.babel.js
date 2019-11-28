import baseConfig from './webpack.base.config.babel';
import { InjectManifest } from 'workbox-webpack-plugin';
import path from 'path';

const root = path.resolve(__dirname, '..');
const plugins = baseConfig.plugins;

baseConfig.plugins = [
  ...plugins,
  new InjectManifest({
    swSrc: path.join(root, 'src/service-worker-source.js'),
    swDest: path.join(root, 'dist/service-worker.js'),
    globDirectory: path.join(root, 'dist'),
    globPatterns: ['**/*.{html,js,css,woff2}']
  })
];

const config = {
  mode: 'production',
  devtool: '',
  ...baseConfig
};

export default config;
