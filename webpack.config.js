var path       = require('path');
var webpack    = require('webpack');

 
module.exports = {
  devtool: 'cheap-module-source-map',
  cache: true,
  watch: true,
  // debug: true,
  plugins:[
    new webpack.ProvidePlugin({
      Promise: 'exports?global.Promise!es6-promise',
      fetch: 'exports?self.fetch!whatwg-fetch',
      React: 'react',
      ReactDOM: 'react-dom'
    })
  ],
  module: {
    loaders: [
      // {
      //   test: /.js$/,
      //   loader: 'babel-loader',
      //   exclude: /node_modules/,
      //   query: {
      //     // plugins: ['jsx-html-class'], // Converts class to className, waiting on update: https://github.com/appfigures/jsx-html-class/issues/2
      //     presets: ['es2015', 'react', 'stage-0']
      //   }
      // }
    ]
  },
};