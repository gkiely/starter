var path       = require('path');
var webpack    = require('webpack');

module.exports = {
  devtool: 'source-map',
  entry: './src/js/app/app.js',
  output: {
    path: 'dist/js',
    filename: 'app.js'
  },
  resolve:{
    // Allows root folder access
    alias: {
      '~': path.resolve(__dirname, '../'),     // Allows root folder access
      'app': path.resolve('./src/js/app'),
      'util': path.resolve('./src/js/util')
    },
  },
  plugins:[
    new webpack.optimize.OccurenceOrderPlugin(),
    // TODO: this should be enabled, to save significant size for react
    // Was causing issue with react-router and reactClass
    // new webpack.DefinePlugin({
    //   'process.env': {
    //     'NODE_ENV': '"production"'
    //   }
    // }),
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        warnings: false
      },
      comments: false
    })
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