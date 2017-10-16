var path       = require('path');
var webpack    = require('webpack');

module.exports = {
  devtool: '#inline-source-map',
  // devtool: 'cheap-module-source-map',
  cache: true,
  watch: true,
  entry: './src/js/app/app.js',
  output: {
    path: 'dist/js',
    filename: 'app.js'
  },
  resolve:{
    alias: {
      '~': path.resolve(__dirname, '../'),     // Allows root folder access
      'app': path.resolve('./src/js/app'),
      'util': path.resolve('./src/js/util')
    },
  },
  plugins:[
  ],
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          presets: ['es2015', 'react']
        }
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "class-to-classname"
      },
    ]
  },
};