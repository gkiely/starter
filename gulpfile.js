var babel             = require('gulp-babel'),
    bulkSass          = require('gulp-sass-bulk-import'),
    cache             = require('gulp-cached'),
    concat            = require('gulp-concat'),
    fileInclude       = require('gulp-file-include'),
    gulp              = require('gulp'),
    livereload        = require('gulp-livereload'),
    prefix            = require('gulp-autoprefixer'),
    react             = require('gulp-react'),
    remember          = require('gulp-remember');
    sass              = require('gulp-sass'),
    sourcemaps        = require('gulp-sourcemaps'),
    webserver         = require('gulp-webserver'),
    path              = require('path'),

    //Build only
    htmlmin           = null,
    minifyCSS         = null,
    uglify            = null;


// Handle Errors
var handleError = function(err) {
  console.log("\x07");
  console.log(err.toString());
  this.emit('end');
};

var dir = {
  src: 'src/', // Handles src code
  dist: 'dist/' // Prod code, max compresssion
};

// Deprecated
var path = {
  html: [dir.src + 'html/pages/*.html', dir.src + 'html/testing/**/*.html'],
  fonts: dir.src + 'sass/fonts/*',
  img: [dir.src + 'img/*'],
  viewHtml: [dir.src + 'html/partials/*.html'],
  js: [dir.src + 'js/app/util.js', dir.src + 'js/app/*.js' ],
  jsTesting: [dir.src + 'js/testing/*.js'],
  jsTestingLib: [dir.src + 'js/testing/vendor/*.js'],
  jslib: [dir.src + 'js/lib/jquery.min.js', dir.src + 'js/lib/angular.js', dir.src + 'js/lib/*.js'],
  jsx: [dir.src + 'js/app/components/**/*.jsx'],
  sass: [dir.src + 'sass/**/*.scss']
};


path.dev = {
  css: [dir.dist + 'css/**'],
  html: [dir.dist + '*.html'],
  js: [dir.dist + 'js/*.js']
};


// Tasks
// =========
gulp.task('html', function(){
  gulp.src(path.html)
  .pipe(fileInclude({
    prefix: '@@',
    basepath: './src/html'
  }))
  .on('error', handleError)
  .pipe(gulp.dest(dir.dist))
});

gulp.task('img', function(){
  gulp.src(path.img)
  .pipe(gulp.dest(dir.dist + 'img'));
});

gulp.task('fonts', function(){
  gulp.src(path.fonts)
  .pipe(gulp.dest(dir.dist + 'css/fonts'));
});

gulp.task('js', function(){
  gulp.src(path.js)
  // .pipe(sourcemaps.init())
  .pipe(cache('scripts'))
  // .pipe(eslint())
  .pipe(babel())
  .on('error', handleError)
  // .pipe(ngAnnotate())
  .pipe(remember('scripts'))
  // .pipe(eslint.format())
  .pipe(concat('app.js'))
  // .pipe(sourcemaps.write('.'))
  .on('error', handleError)
  .pipe(gulp.dest(dir.dist + 'js'));
});


// Because lib doesn't change often, saves needless gulp cycles
gulp.task('jslib', function(){
  return gulp.src(path.jslib)
  .pipe(concat('lib.js'))
  .pipe(gulp.dest(dir.dist + 'js'));
});

gulp.task('js:testing', function(){
  return gulp.src(path.jsTesting)
  .pipe(concat('testing.js'))
  .pipe(gulp.dest(dir.dist + 'js/testing'));
});

gulp.task('js:testing-lib', function(){
  return gulp.src(path.jsTestingLib)
  .pipe(concat('testing-lib.js'))
  .pipe(gulp.dest(dir.dist + 'js/testing'));
});


// handles jsx changes
gulp.task('jsx', ['reactCompile', 'js']);

gulp.task('reactCompile', function(){
  gulp.src(path.jsx)
  .pipe(react())
  .on('error', handleError)
  .pipe(gulp.dest(dir.dist + 'js/app/components'));
});


gulp.task('sass', function(){
  gulp.src(path.sass)
    .pipe(bulkSass())
    .pipe(sourcemaps.init())
    .pipe(sass( {style:'compressed', precision: 10} ))
    .on('error', handleError)
    .pipe(prefix())
    .on('error', handleError)
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(dir.dist + 'css'))
    .pipe(livereload())
});

gulp.task('sassLib', function(){
  gulp.src(path.sassLib)
  .pipe(bulkSass())
  .pipe(sass( {style:'compressed', precision: 10} ))
  .pipe(prefix())
  .on('error', handleError)
  .pipe(gulp.dest(dir.dist));
});


/*==============================
=            Server            =
==============================*/
gulp.task('server', function(){
  gulp.src(dir.dist)
  .pipe(webserver())
});
gulp.task('server-reload', function(){
  gulp.src(dir.dist)
  .pipe(webserver({
    livereload: true
  }))
});
gulp.task('server-external', function(){
  gulp.src(dir.dist)
  .pipe(webserver())
  .pipe(webserver({
    host: '192.168.1.3',
    livereload: true
  }))
});





// Dist
// =======
//@todo: do rest of dist tasks.

gulp.task('dist-init', function(){
  del = require('del');
  htmlmin = require('gulp-htmlmin');
  uglify = require("gulp-uglify");
  minifyCSS = require('gulp-minify-css')
});

gulp.task('dist-html', function(){
  gulp.src(path.dev.html)
  .pipe(htmlmin({
    removeComments: true,
    collapseWhitespace: true,
    minifyJS: true,
    minifyCSS: true
  }))
  .on('error', handleError)
  .pipe(gulp.dest(dir.dist))
});

gulp.task('dist-js', function(){
  gulp.src(path.dev.js)
  // .pipe(sourcemaps().init())
  .pipe( uglify() )
  // .pipe(sourcemaps.write('.'))
  .on('error', handleError)
  .pipe(gulp.dest(dir.dist + 'js'));
});

gulp.task('dist-css', function(){
  gulp.src(path.dev.css)
  // .pipe(sourcemaps().init())
  .pipe(minifyCSS())
  // .pipe(sourcemaps.write('.'))
  .on('error', handleError)
  .pipe(gulp.dest(dir.dist + 'css'))
});

/***** Watches *****/
gulp.task('watch-react', function(){
  gulp.watch(path.jsx, ['jsx']);
});

gulp.task('watch', function(){
  livereload.listen();
  gulp.watch([dir.dist + '*.html', dir.dist + 'js/app.js', dir.dist + 'js/testing/**/*.js']).on('change', livereload.changed);
  gulp.watch(path.html, ['html']);
  gulp.watch(path.viewHtml, ['html']);
  gulp.watch(path.js, ['js']);
  gulp.watch(path.jslib, ['jslib']);
  gulp.watch(path.jsTesting, ['js:testing']);
  gulp.watch(path.jsTestingLib, ['js:testing-lib'])
  gulp.watch(path.sass, ['sass']);
  gulp.watch(path.sassLib, ['sassLib']);
  gulp.watch(path.img, ['img']);
  gulp.watch(path.fonts, ['fonts']);
});


gulp.task('base', ['html', 'js', 'jslib', 'js:testing', 'js:testing-lib', 'img', 'sass', 'watch', 'watch-react']);
gulp.task('default', [ 'base', 'server']);
gulp.task('reload', ['base', 'server-reload']);