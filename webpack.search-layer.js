const path = require('path');
const config = require('./webpack.config');
const merge = require('webpack-merge');

const dist = path.join(__dirname, './dogu-bako.sketchplugin/Contents/Resources/search-symbol-by');
module.exports = merge(config, {

  entry: [
    './src/search-symbol-by'
  ],

  output: {
    path: dist
  }

});
