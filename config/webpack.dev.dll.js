// Creates vendor.js, saves save recompiling vendor libraries
// http://engineering.invisionapp.com/post/optimizing-webpack/
// https://medium.com/@soederpop/webpack-plugins-been-we-been-keepin-on-the-dll-cdfdd6cb8cd7
var path    = require('path');
var webpack = require('webpack');
var resolve = path.join.bind(path, process.cwd());

module.exports = {
  devtool: 'source-map',
  entry: {
    // The entrypoint is our vendor file
    vendor: [ resolve('src/js/vendor/vendor.js') ]
  },
  output: {
    // The bundle file
    path: resolve('dist/js'),
    filename: '[name].js',
    library: '[name]'
  },
  plugins: [
    new webpack.DllPlugin({
      // The manifest we will use to reference the libraries
      name: '[name]',
      path: resolve('src/js/vendor/[name]-manifest.json'),
    }),
  ],
  resolve: {
    "modules" : [
      resolve('src/js/vendor'),
      'node_modules',
    ]
  }
}