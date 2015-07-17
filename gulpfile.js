var gulp = require('gulp'),
    gutil = require('gulp-util')
    concat = require('gulp-concat'),
    fileInclude = require('gulp-file-include'),
    htmlmin = function(){},
    uglify = function(){},
    sass = require('gulp-sass'),
    plumber = require('gulp-plumber'),
    livereload = require('gulp-livereload'),
    minifyCSS = function(){},
    ngAnnotate = require('gulp-ng-annotate'),
    prefix = require('gulp-autoprefixer'),
    react = require('gulp-react'),
    sourcemaps = require('gulp-sourcemaps'),
    babel = require('gulp-babel'),
    bulkSass = require('gulp-sass-bulk-import'),
    cache = require('gulp-cached'),
    remember = require('gulp-remember');

function onError(err) {
  gutil.beep();
  gutil.log(err);
}

var dir = {
  src: 'src/', // Handles src code
  dev: 'dev/', // Dev code, just joins doesn't uglify/compress
  dist: 'dist/' // Prod code, max compresssion
}

// Deprecated
var path = {
  html: [dir.src + 'html/pages/*.html'],
  fonts: dir.src + 'sass/fonts/*',
  img: [dir.src + 'img/*'],
  viewHtml: [dir.src + 'html/partials/*.html'],
  js: [dir.src + 'js/app/util.js', dir.src + 'js/app/*.js' ],
  jslib: [dir.src + 'js/lib/jquery.min.js', dir.src + 'js/lib/angular.js', dir.src + 'js/lib/*.js'],
  jsx: [dir.src + 'js/app/components/*.jsx'],
  sass: [dir.src + 'sass/*.scss']
};


path.dev = {
  css: [dir.dev + 'css/**'],
  html: [dir.dev + '*.html'],
  js: [dir.dev + 'js/*.js']
};


// Tasks
// =========
gulp.task('html', function(){
  gulp.src(path.html)
  .pipe(plumber({ errorHandler: onError }))
  .pipe(fileInclude({
    prefix: '@@',
    basepath: './src/html'
  }))
  .on('error', gutil.log)
  .pipe(gulp.dest(dir.dev))
});

gulp.task('img', function(){
  gulp.src(path.img)
  .pipe(gulp.dest(dir.dev + 'img'));
});

gulp.task('fonts', function(){
  gulp.src(path.fonts)
  .pipe(gulp.dest(dir.dev + 'css/fonts'));
});

gulp.task('js', function(){
  gulp.src(path.js)
  .pipe(plumber({ errorHandler: onError }))
  .pipe(sourcemaps.init())
  .pipe(cache('scripts'))
  .pipe(babel())
  .pipe(ngAnnotate())
  .pipe(remember('scripts'))
  .pipe(concat('app.js'))
  .pipe(sourcemaps.write('.'))
  .on('error', gutil.log)
  .pipe(gulp.dest(dir.dev + 'js'));
});


// Because lib doesn't change often, saves needless gulp cycles
gulp.task('jslib', function(){
  gulp.src(path.jslib)
  .pipe(concat('lib.js'))
  .pipe(gulp.dest(dir.dev + 'js'));
});


// handles jsx changes
gulp.task('jsx', ['reactCompile', 'js']);

gulp.task('reactCompile', function(){
  gulp.src(path.jsx)
  .pipe(plumber({ errorHandler: onError }))
  .pipe(react())
  .on('error', gutil.log)
  .pipe(gulp.dest(dir.dev + 'js/app/components'));
});


gulp.task('sass', function(){
  gulp.src(path.sass)
    .pipe(plumber({ errorHandler: onError }))
    .pipe(bulkSass())
    .pipe(sass( {style:'compressed', precision: 10} ))
    .pipe(prefix())
    .on('error', gutil.log)
    .pipe(gulp.dest(dir.dev + 'css'));
});

gulp.task('sassLib', function(){
  gulp.src(path.sassLib)
  .pipe(plumber({ errorHandler: onError }))
  .pipe(bulkSass())
  .pipe(sass( {style:'compressed', precision: 10} ))
  .pipe(prefix())
  .on('error', gutil.log)
  .pipe(gulp.dest(dir.dev));
});


/*==============================
=            Server            =
==============================*/
gulp.task('server', function(){
  gulp.src(dir.dev)
  .pipe(webserver())
});
gulp.task('server-reload', function(){
  gulp.src(dir.dev)
  .pipe(webserver({
    livereload: true
  }))
});
gulp.task('server-external', function(){
  gulp.src(dir.dev)
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
  .pipe(plumber({ errorHandler: onError }))
  .pipe(htmlmin({
    removeComments: true,
    collapseWhitespace: true,
    minifyJS: true,
    minifyCSS: true
  }))
  .on('error', gutil.log)
  .pipe(gulp.dest(dir.dist))
});

gulp.task('dist-js', function(){
  gulp.src(path.dev.js)
  .pipe(plumber({ errorHandler: onError }))
  // .pipe(sourcemaps().init())
  .pipe( uglify() )
  // .pipe(sourcemaps.write('.'))
  .on('error', gutil.log)
  .pipe(gulp.dest(dir.dist + 'js'));
});

gulp.task('dist-css', function(){
  gulp.src(path.dev.css)
  .pipe(plumber({ errorHandler: onError }))
  // .pipe(sourcemaps().init())
  .pipe(minifyCSS())
  // .pipe(sourcemaps.write('.'))
  .on('error', gutil.log)
  .pipe(gulp.dest(dir.dist + 'css'))
});

/***** Watches *****/
gulp.task('watch-react', function(){
  gulp.watch(path.jsx, ['jsx']);
});

gulp.task('watch', function(){
  livereload.listen();
  gulp.watch([dir.dev + '*.html', dir.dev + 'css/app.css', dir.dev + 'js/app.js']).on('change', livereload.changed);
  gulp.watch(path.html, ['html']);
  gulp.watch(path.viewHtml, ['html']);
  gulp.watch(path.js, ['js']);
  gulp.watch(path.jslib, ['jslib']);
  gulp.watch(path.sass, ['sass']);
  gulp.watch(path.sassLib, ['sassLib']);
  gulp.watch(path.img, ['img']);
  gulp.watch(path.fonts, ['fonts']);
});


gulp.task('base', ['html', 'js', 'jslib', 'img', 'sass', 'watch']);
gulp.task('default', [ 'base', 'server']);
gulp.task('reload', ['base', 'server-reload']);