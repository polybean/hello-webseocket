const HtmlWebpackPlugin = require('html-webpack-plugin');
const parts = require('./webpack.parts');
const merge = require('webpack-merge');
const path = require('path');

const paths = {
  source: path.join(__dirname, 'src'),
  build: path.join(__dirname, 'public'),
};

const commonConfig = merge([
  {
    entry: { bundle: path.join(paths.source, 'app.jsx') },
    output: {
      path: paths.build,
      chunkFilename: '[name].[chunkhash:8].js',
      filename: '[name].[chunkhash:8].js',
    },
    plugins: [
      new HtmlWebpackPlugin({
        title: 'Awesome React Application',
        template: path.resolve('index.ejs'),
      }),
    ],
    resolve: {
      extensions: ['.js', '.jsx', '.json'],
    },
  },
  parts.lintJavaScript({ include: paths.source }),
  parts.loadJavaScript({ include: paths.source }),
]);

const developmentConfig = merge([
  parts.devServer({
    // Customize host/port here if needed
    host: process.env.HOST,
    port: process.env.PORT,
  }),
  parts.loadCSS(),
  parts.loadImages(),
]);

const productionConfig = merge([
  parts.clean(paths.build, { exclude: 'data' }),
  parts.attachRevision(),
  parts.minifyJavaScript(),
  parts.extractCSS({ use: 'css-loader' }),

  // url-loader uses file-loader implicitly when limit is set
  // and both have to be installed for the setup to work.
  parts.loadImages({
    options: {
      limit: 15000,
      name: '[name].[hash:8].[ext]',
    },
  }),

  parts.setFreeVariable('process.env.NODE_ENV', 'production'),
]);

module.exports = env => {
  if (env.stage === 'production') {
    return merge(commonConfig, productionConfig);
  }
  return merge(commonConfig, developmentConfig);
};
