var path  = require('path');
var join  = path.join;
var src   = "src";
var dist  = "dist/app";


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
  html: {
    src: join(src, 'html/pages/*.html'),
    watch: join(src, 'html/**/*.html'),
  },
  js:{
    src: './' + join(src, 'js/app/app.js'),
    lib: {
      src: './' + join(src, 'js/lib/**/*.js'),
      watch: join(src, 'js/lib/**/*.js')
    },
    dist: dist,
    watch: [join(src, 'js/app/**/*.js'), join(src, 'js/util/**/*.js')],
  },
  sass:{
    src: {
      app: join(src, 'sass/app.scss'),
      lib: join(src, 'sass/lib.scss')
    },
    path:{
      lib: '',
    },
    dist: join(dist, 'css'),
    watch: {
      app: [join(src, 'sass/**/*.scss'), '!' + join(src, 'sass/lib/**'), '!' + join(src, 'sass/lib.scss')],
      lib: [join(src, 'sass/lib.scss'), join(src, 'sass/lib/**/*.scss')]
    }
  },
  server: {
    watch: ['*.js', 'server/**/*.js']
  }
};

/*=====  End of Config  ======*/




/*===============================
=            Webpack            =
===============================*/
config.webpack = {
  dev: require('./webpack.dev.js'),
  prod: require('./webpack.prod.js')
}
// config.webpack.dev.entry = config.js.src;
// config.webpack.dev.output = {
//   path: 'dist/js',
//   filename: 'bundle.js'
// };

/*=====  End of Webpack  ======*/



module.exports = config;