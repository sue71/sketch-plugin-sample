const path = require('path');
const config = require('./webpack.config');
const merge = require('webpack-merge');

const dist = path.join(__dirname, './dogu-bako.sketchplugin/Contents/Resources/assets');
module.exports = merge(config, {

  entry: [
    './src/assets/index.tsx'
  ],

  output: {
    path: dist
  }

});
