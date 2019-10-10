import VueLoaderPlugin from 'vue-loader/lib/plugin';
import VuetifyLoaderPlugin from 'vuetify-loader/lib/plugin';
import path from 'path';

const root = path.resolve(__dirname, '..');

const config = {
  entry: path.join(root, 'src'),
  output: {
    path: path.join(root, 'dist/js'),
    publicPath: '/js/',
    filename:'bundle.min.js',
  },
  module: {
    rules: [
      {
        test: /\.(js|vue)$/,
        loader: 'eslint-loader',
        enforce: 'pre'
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.js$/,
        loader: 'babel-loader'
      },
      {
        test: /\.(css|s(c|a)ss)$/,
        use: [
          'vue-style-loader',
          'css-loader', {
            loader: 'sass-loader'
          }
        ]
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.vue'],
    alias: {
      '@': path.join(root, 'src'),
      'vue$': 'vue/dist/vue.esm.js'
    }
  },
  plugins: [
    new VueLoaderPlugin(),
    new VuetifyLoaderPlugin()
  ]
};

export default config;
