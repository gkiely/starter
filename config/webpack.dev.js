let path       = require('path');
let webpack    = require('webpack');
let rootDir    = process.cwd();
var resolve    = path.join.bind(path, rootDir);

module.exports = {
  // devtool: 'inline-source-map',
  devtool: 'eval-source-map',
  entry: './src/js/app/app.js',
  output: {
    filename: 'app.js',
    path: resolve('dist/js'),
  },
  resolve:{
    alias: {
      '~': rootDir, // Allows root folder access
    },
  },
  plugins:[
    new webpack.DllReferencePlugin({
      context: rootDir,
      manifest: require(resolve('src/js/vendor/vendor-manifest.json'))
    })
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader?cacheDirectory',
        include: [resolve('src')],
        exclude: [resolve('node_modules')],
        loader: "babel-loader"
      }
    ]
  },
};