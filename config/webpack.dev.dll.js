// Creates vendor.js, saves save recompiling vendor libraries
// http://engineering.invisionapp.com/post/optimizing-webpack/
// https://medium.com/@soederpop/webpack-plugins-been-we-been-keepin-on-the-dll-cdfdd6cb8cd7

var path = require('path');
var webpack = require('webpack');
var join = path.join.bind(path, __dirname, '../');

module.exports = {
  devtool: 'source-map',
  entry: {
    // The entrypoint is our vendor file
    vendor: [ join('./src/js/vendor', 'vendor.js') ]
  },
  output: {
    // The bundle file
    path: join('dist/js'),
    filename: '[name].js',
    library: '[name]'
  },
  plugins: [
    new webpack.DllPlugin({
      // The manifest we will use to reference the libraries

      name: '[name]',
      path: join('./src/js/vendor', '[name]-manifest.json'),
    }),
  ],
  resolve: {
    root: join('src/js/vendor'),
    modulesDirectories: ['node_modules']
  }
}