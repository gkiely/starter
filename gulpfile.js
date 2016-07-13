var 
    bulkSass      = require('gulp-sass-bulk-import'),
    concat        = require('gulp-concat'),
    config        = require('./gulp/gulp-config.js'),
    eslint        = require('gulp-eslint'),
    fileInclude   = require('gulp-file-include'),
    gulp          = require('gulp'),
    gulpif        = require('gulp-if'),
    livereload    = require('gulp-livereload'),
    prefix        = require('gulp-autoprefixer'),
    path          = require('path'),
    join          = path.join,
    sass          = require('gulp-sass'),
    shell         = require('gulp-shell'),
    sourcemaps    = require('gulp-sourcemaps'),
    webserver     = require('gulp-webserver'),
    webpack       = require('webpack'),
    newer         = require('gulp-newer'),

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



/*============================
=            HTML            =
============================*/
gulp.task('html', function(){
  gulp.src(config.html)
  .pipe(fileInclude({
    prefix: '@@',
    basepath: './src/html'
  }))
  .pipe(livereload())
  .on('error', handleError)
  .pipe(gulp.dest(config.dist))
});


/*==================================
=            JavaScript            =
==================================*/
var compiler = webpack(config.webpack.dev);

gulp.task('js', ['lint:js'], function(cb){
  compiler.run(function(err, stats){
    cb();
    livereload.changed(config.js.dist + '/bundle.js');
  })
});


/*=====  End of JavaScript  ======*/


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
});



/*===============================
=            Linting            =
===============================*/
var esconfig = require('./gulp/eslintrc.js');
var eslintPassed;
gulp.task('lint:js', function () {
  return gulp.src(config.js.lint)
  .pipe(gulpif( !prod, newer(path.join(config.copy.dist, 'js/') )))
  .pipe(eslint(esconfig))
  .pipe(eslint.format())
  .pipe(eslint.result(function(result){
    if(result.errorCount > 0){
      eslintPassed = false;
    }
    else{
      eslintPassed = true;
    }
  }))
  .pipe(eslint.failAfterError())
  .on('error', handleError)
});



/*=====  End of Linting  ======*/



/*=============================
=            Watch            =
=============================*/
gulp.task('watch', function(){
  gulp.watch(config.sass.watch, ['sass']);
  gulp.watch(config.html, ['html']);
  gulp.watch(config.js.watch, ['js']);


  gulp.watch(join(config.sass.dist, '**/*.css')).on('change', livereload.changed);

  //== Watch for changes
  livereload.listen();
});



/*=================================
=            Dev Tasks            =
=================================*/
gulp.task('default', ['watch', 'server']);

gulp.task('prod', ['html', 'sass', 'js']);
