var babel         = require('gulp-babel'),
    bulkSass      = require('gulp-sass-bulk-import'),
    // cache         = require('gulp-cached'),
    concat        = require('gulp-concat'),
    config        = require('./gulp/gulp-config.js'),
    // eslint        = require('gulp-eslint'),
    fileInclude   = require('gulp-file-include'),
    gulp          = require('gulp'),
    livereload    = require('gulp-livereload'),
    prefix        = require('gulp-autoprefixer'),
    // remember      = require('gulp-remember');
    sass          = require('gulp-sass'),
    sourcemaps    = require('gulp-sourcemaps'),
    webserver     = require('gulp-webserver'),

    webpack       = require('webpack-stream'),
    //Build only
    htmlmin       = function(){},
    minifyCSS     = function(){},
    uglify        = function(){};


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
  // .pipe(sourcemaps.init())
  // .pipe(cache('scripts'))
  // // .pipe(eslint())
  // .pipe(babel({
  //   presets: ['es2015', 'stage-0', 'react']
  // }))
  .on('error', handleError)

  // .pipe(remember('scripts'))
  // .pipe(eslint.format())
  // .pipe(concat('app.js'))
  // .pipe(sourcemaps.write('.'))
  .on('error', handleError)
  .pipe(gulp.dest(config.js.dist));
});


/*============================
=            SASS            =
============================*/


