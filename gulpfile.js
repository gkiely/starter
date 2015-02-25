// @todo add task for copying fonts from sass/fonts -> dev

var gulp = require('gulp'),
		gutil = require('gulp-util')
		concat = require('gulp-concat'),
		fileInclude = require('gulp-file-include'),
		uglify = require("gulp-uglify"),
		sass = require('gulp-sass'),
		plumber = require('gulp-plumber'),
		livereload = require('gulp-livereload'),
		prefix = require('gulp-autoprefixer'),
    react = require('gulp-react'),
    sourcemaps = require('gulp-sourcemaps'),
    to5 = require('gulp-6to5'),
    webserver = require('gulp-webserver');

function onError(err) {
  gutil.beep();
  gutil.log(err);
}

var dir = {
	src: 'src/', // Handles src code
	dev: 'dev/', // Dev code, just joins doesn't uglify/compress
	dist: 'dist/' // Prod code, max compresssion
}

var path = {
  html: [dir.src + 'html/pages/*.html'],
  viewHtml: [dir.src + 'html/partials/*.html', dir.src + 'html/elems/*.html'],
	js: [dir.src + 'js/app/util.js', dir.src + 'js/app/*.js' ],
  jslib: [dir.src + 'js/lib/jquery.min.js', dir.src + 'js/lib/*.js'],
  jsx: [dir.src + 'js/app/components/*.jsx'],
	sass: [dir.src + 'sass/*.scss']
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

gulp.task('js', function(){
	// gulp.src(path.js.concat('./js/app/components/*.js')) // for react
	gulp.src(path.js)
	.pipe(plumber({ errorHandler: onError }))
	.pipe(sourcemaps.init())
	.pipe(to5())
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
		.pipe(sass( {style:'compressed'} ))
		.pipe(prefix())
		.on('error', gutil.log)
		.pipe(gulp.dest(dir.dev + 'css'));
});


//Start server
gulp.task('server', function(){
  gulp.src(dir.dev)
  .pipe(webserver());
});


// Dist
// =======
gulp.task('js-dist', function(){
  gulp.src(['./js/lib.js', './js/app.js'])
  .pipe( concat('app.js'))
  .pipe( uglify() )
  .pipe(gulp.dest(dir.dist + 'js'));
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
});


 





gulp.task('dist', ['jslib', 'js', 'js-dist', 'html-dist']);

gulp.task('default', ['html', 'js', 'jslib', 'sass','server', 'watch' /*, 'watch-react' */]);

