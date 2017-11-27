let path       = require('path');
let webpack    = require('webpack');
let rootDir    = process.cwd();
let resolve    = path.join.bind(path, rootDir);

module.exports = {
  devtool: 'source-map',
  entry: './src/js/app/app.js',
  output: {
    filename: 'app.js',
    path: resolve('dist/js'),
  },
  resolve:{
    alias: {
      '~': rootDir,     // Allows root folder access
    },
  },
  plugins:[
    new webpack.EnvironmentPlugin(['NODE_ENV']),
    new webpack.DllReferencePlugin({
      context: rootDir,
      manifest: require(resolve('src/js/vendor/vendor-manifest.json'))
    }),
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        warnings: false
      },
      comments: false
    }),
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: [path.resolve(rootDir, 'src')],
        exclude: [path.resolve(rootDir, 'node_modules')],
        loader: "babel-loader"
      }
    ]
  }
};