const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

/**
 * CSS loader config
 */
const cssConfig = {
  modules: true,
  minimize: true,
  sourceMap: true,
  importLoaders: 1,
  localIdentName: '[name]__[local]__[hash:base64:5]'
};

/**
 * Webpack Config
 */
const dist = path.join(__dirname, './dogu-bako.sketchplugin/Contents/Resources');
const config = {

  entry: [
  ],

  output: {
    path: dist,
    filename: 'main.js'
  },

  devtool: 'source-map',

  devServer: {
    contentBase: dist,
    compress: false,
    port: 3000
  },

  cache: false,

  stats: {
    reasons: true,
    colors: true,
    timings: true,
    hash: true,
    version: true,
    chunks: true,
    chunkModules: true,
    cached: true,
    cachedAssets: true,
  },

  plugins: [
  ],

  resolve: {
    extensions: ['*', '.js', '.jsx', '.ts', '.tsx'],
    modules: [
      path.join(__dirname, 'src'),
      'node_modules'
    ]
  },

  module: {
    rules: [
      {
        test: /\.json$/,
        loader: 'json-loader',
      },
      {
        test: /\.txt$/,
        loader: 'raw-loader',
      },
      {
        test: /\.(png|jpg|jpeg|gif|svg|woff|woff2)$/,
        loader: 'url-loader',
      },
      {
        test: /\.(ico)$/,
        loader: 'url-loader',
        options: {
          limit: 1,
          name: '[name].[ext]'
        }
      },
      {
        test: /\.(eot|ttf)$/,
        loader: 'file-loader',
      },
      {
        test: /\.html$/,
        loader: 'file-loader?name=[name].[ext]'
      },
      {
        test: /.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.less$/,
        use: 'less-loader'
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: 'style-loader'
          },
          {
            loader: 'css-loader',
            options: cssConfig
          }
        ]
      }
    ]
  }
};

module.exports = config;
