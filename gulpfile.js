var babel         = require('gulp-babel'),
    bulkSass      = require('gulp-sass-bulk-import'),
    // cache         = require('gulp-cached'),
    concat        = require('gulp-concat'),
    // eslint        = require('gulp-eslint'),
    fileInclude   = require('gulp-file-include'),
    gulp          = require('gulp'),
    livereload    = require('gulp-livereload'),
    prefix        = require('gulp-autoprefixer'),
    // react         = require('gulp-react'),
    // remember      = require('gulp-remember');
    sass          = require('gulp-sass'),
    sourcemaps    = require('gulp-sourcemaps'),
    webserver     = require('gulp-webserver'),

    //Build only
    htmlmin       = function(){},
    minifyCSS     = function(){},
    uglify        = function(){};






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




/*============================
=            SASS            =
============================*/


