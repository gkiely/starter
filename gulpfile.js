var babel         = require('gulp-babel'),
    bulkSass      = require('gulp-sass-bulk-import'),
    // cache         = require('gulp-cached'),
    concat        = require('gulp-concat'),
    config        = require('./gulp/gulp-config.js'),
    // eslint        = require('gulp-eslint'),
    fileInclude   = require('gulp-file-include'),
    gulp          = require('gulp'),
    gulpif        = require('gulp-if'),
    livereload    = require('gulp-livereload'),
    prefix        = require('gulp-autoprefixer'),
    // remember      = require('gulp-remember');
    sass          = require('gulp-sass'),
    shell         = require('gulp-shell'),
    sourcemaps    = require('gulp-sourcemaps'),
    webserver     = require('gulp-webserver'),

    // webpack       = require('webpack-stream'),
    htmlmin       = function(){},
    minifyCSS     = function(){},
    uglify        = function(){},
    yargs         = require('yargs');


var prod = yargs.argv.prod;

var handleError = function(err) {
  console.log("\x07");
  console.log(err.toString());
  this.emit('end');
};




/*============================
=            HTML            =
============================*/
gulp.task('html', function(){
  gulp.src(config.html)
  .pipe(fileInclude({
    prefix: '@@',
    basepath: './src/html'
  }))
  .on('error', handleError)
  .pipe(gulp.dest(config.dist))
});


/*==================================
=            JavaScript            =
==================================*/
gulp.task('js', function(){
  gulp.src(config.js.src)
  .pipe(sourcemaps.init())
  .pipe(cache('scripts'))
  // .pipe(eslint())
  .pipe(babel({
    presets: ['es2015', 'stage-0', 'react']
  }))
  .on('error', handleError)
  .pipe(remember('scripts'))
  // .pipe(eslint.format())
  .pipe(concat('app.js'))
  .pipe(sourcemaps.write('.'))
  .on('error', handleError)
  .pipe(gulp.dest(config.js.dist));
});


/*============================
=            SASS            =
============================*/
gulp.task('sass', function(){
  gulp.src(config.sass.src)
  .pipe(bulkSass())
  .pipe(sourcemaps.init())
  .pipe(sass( {style:'compressed', precision: 10} ))
  .on('error', handleError)
  .pipe(prefix())
  .on('error', handleError)
  .pipe(sourcemaps.write('.'))
  .pipe(gulp.dest(config.sass.dist))
  .pipe(livereload())
});


/*==============================
=            Server            =
==============================*/
gulp.task('server', function(){
  var ip = require('get-my-ip')();
  //=== Dev server
  var stream = gulp.src(config.dist);
  stream.pipe(webserver());
  if(ip){
    stream.pipe(webserver({
        host: ip,
        livereload: true
    }));
  }

  //=== nodejs server
  // stream.pipe(shell([
  //   `nodemon --debug --ignore src/ --ignore dist/ --ignore test/ & 
  //   node-inspector --preload false`
  // ]))

});


/*=============================
=            Watch            =
=============================*/
gulp.task('watch', function(){
  gulp.watch(config.sass.watch, ['sass']);
  gulp.watch(config.html, ['html']);
});



/*=================================
=            Dev Tasks            =
=================================*/
gulp.task('default', ['watch', 'server']);


