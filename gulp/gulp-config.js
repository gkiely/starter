var path = require('path');
var src  = "src";
var dist = "dist";


var config = {

  css:{
    
  },
  dist: dist,
  html: path.join(src, 'html/pages/*.html'),
  js:{
    src: path.join(src, 'js/app.js'),
    dist: dist
  },
  scss:{
    
  }
};


module.exports = config;