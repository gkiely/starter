let path  = require('path');
let join  = path.join;
let src   = path.join.bind(path, './src');
let dist  = path.join.bind(path, './dist');
let paths = { src: 'src', dist: 'dist'};


/*==============================
=            Config            =
==============================*/
let config = {
  css:{
  },
  copy: {
    src: [src('vendor/**/**'), src('img/**/**'), src('favicon.ico'), src('env.json'), src('sass/fonts/fonts/**/**')],
    dist: [dist('vendor'), dist('img'), paths.dist, paths.dist, dist('css/fonts')],
  },
  dist: paths.dist,
  html: {
    src: src('html/pages/*.html'),
    watch: src('html/**/*.html'),
  },
  js:{
    src: './' + path.join(paths.src, './js/app/app.js'),
    lib: {
      src: './' + src('js/vendor/**/*.js'),
      watch: src('js/vendor/**/*.js')
    },
    dist: paths.dist,
    watch: [src('js/app/**/*.js'), src('js/utils/**/*.js'), '!' + src('js/app/archived/**')],
  },
  sass:{
    src: {
      app: src('sass/app.scss'),
      lib: src('sass/lib.scss')
    },
    path:{
      lib: '',
    },
    dist: dist('css'),
    watch: {
      app: [src('sass/**/*.scss'), '!' + src('sass/lib/**'), '!' + src('sass/lib.scss')],
      lib: [src('sass/lib.scss'), src('sass/lib/**/*.scss')]
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
  dev:    require('./webpack.dev.js'),
  prod:   require('./webpack.prod.js'),
  dll:    require('./webpack.prod.dll.js'),
  devdll: require('./webpack.dev.dll.js'),
};

/*=====  End of Webpack  ======*/



module.exports = config;