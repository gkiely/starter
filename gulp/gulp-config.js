var path  = require('path');
var join  = path.join;
var src   = "src";
var dist  = "dist";


var config = {

  css:{
    
  },
  dist: dist,
  html: join(src, 'html/pages/*.html'),
  js:{
    src: join(src, 'js/app.js'),
    dist: dist
  },
  sass:{
    src: path.join(src, 'sass/app.scss'),
    dist: path.join(dist, 'css'),
    watch: path.join(src, 'sass/**/*.scss')
  }
};


module.exports = config;