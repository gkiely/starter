var path  = require('path');
var join  = path.join;
var src   = "src";
var dist  = "dist";
var yargs = require('yargs');
var prod = yargs.argv.prod;


/*==============================
=            Config            =
==============================*/
var config = {

  css:{
    
  },
  copy: {
    dist: dist,
  },
  dist: dist,
  html: join(src, 'html/pages/*.html'),
  js:{
    src: './' + join(src, 'js/app/app.js'),
    dist: dist,
    watch: join(src, 'js/**/*.js'),
    lint: join(src, 'js/app/**/*.js')
  },
  sass:{
    src: path.join(src, 'sass/app.scss'),
    dist: path.join(dist, 'css'),
    watch: path.join(src, 'sass/**/*.scss')
  }
};

/*=====  End of Config  ======*/




/*===============================
=            Webpack            =
===============================*/
config.webpack = {
  dev: require('./webpack.dev.js'),
  prod: prod ? require('./webpack.prod.js') : ""
}
config.webpack.dev.entry = config.js.src;
config.webpack.dev.output = {
  path: 'dist/js',
  filename: 'app.js'
};

/*=====  End of Webpack  ======*/



module.exports = config;