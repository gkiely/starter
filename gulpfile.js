let 
    concat        = require('gulp-concat'),
    config        = require('./config/gulp-config.js'),
    eslint        = require('gulp-eslint'),
    es            = require('event-stream'),
    fileInclude   = require('gulp-file-include'),
    gulp          = require('gulp'),
    gulpif        = require('gulp-if'),
    nodemon       = require('gulp-nodemon'),
    livereload    = require('gulp-livereload'),
    prefix        = require('gulp-autoprefixer'),
    path          = require('path'),
    join          = path.join,
    sass          = function(){},
    sassGlob      = require('gulp-sass-glob'),
    shell         = require('gulp-shell'),
    sourcemaps    = require('gulp-sourcemaps'),
    webserver     = require('gulp-webserver'),
    webpack       = require('webpack'),
    newer         = require('gulp-newer'),
    processhtml   = require('gulp-noop'),
    htmlmin       = require("gulp-noop"),
    apidoc        = require('gulp-noop'),
    uuid          = require('uuid'),
    // sequence      = require('gulp-sequence'),
    minifyCSS     = function(){},
    uglify        = function(){};



/*===============================
=            Helpers            =
===============================*/
let handleError = function(err) {
  console.log("\x07");
  console.log(err.toString());
  this.emit('end');
};
/*=====  End of Helpers  ======*/


/*=============================
=            Setup            =
=============================*/
let prod = process.env.NODE_ENV === 'production';
let compiler;
let dllcompiler;

// Webpack
if(prod){
  compiler = webpack(config.webpack.prod);
  dllcompiler = webpack(config.webpack.dll);
}
else{
  compiler = webpack(config.webpack.dev);
  dllcompiler = webpack(config.webpack.devdll);
}

// Require sass
// Changing node versions requires a node-sass rebuild
try{
  sass = require('gulp-sass')
}
catch(err){
  console.log(`
==========
You've changed node versions, rebuilding node-sass...
If this fails run \`npm rebuild node-sass\`
==========`);
  gulp.src('').pipe(shell(['npm rebuild node-sass && gulp dev']));
  return;
}

/*=====  End of Setup  ======*/


/*============================
=            HTML            =
============================*/
gulp.task('html', function(){
  if(prod){
    htmlmin = require('gulp-htmlmin');
    processhtml = require('gulp-processhtml');
  }
  gulp.src(config.html.src)
  .pipe(fileInclude({
    prefix: '@@',
    basepath: './src/html',
    context: {
      version: uuid().substr(0, 7) // @TODO: use the build version, first we need to find it on process.env
    }
  }))
  .pipe(gulpif(prod, processhtml()))
  .pipe(gulpif( prod, htmlmin({
      // minifyJs: true,
      collapseWhitespace: true,
      removeComments: true,
      processScripts:['x/template', 'text/x-template']
    })
  ))
  .on('error', handleError)
  .pipe(livereload())
  .pipe(gulp.dest(config.dist))
});


/*==================================
=            JavaScript            =
==================================*/
gulp.task('js', ['lint:js'], function(cb){
  compiler.run(function(err, stats){
    cb();
    var json = stats.toJson();
    if(json.errors.length > 0){
      json.errors.forEach(item => console.log(item));
      console.log("\x07");
    }
    else if(json.warnings.length > 0){
      json.warnings.forEach(item => console.log(item));
    }
    else{
      livereload.changed(config.js.dist + '/app.js');
    }
  })
});


gulp.task('js:lib', cb => {
  dllcompiler.run(function(err, stats){
    cb();
    var json = stats.toJson();
    if(json.errors.length > 0){
      json.errors.forEach(item => console.log(item));
      console.log("\x07");
    }
    else if(json.warnings.length > 0){
      json.warnings.forEach(item => console.log(item));
    }
    else{
      livereload.changed(config.js.dist + '/vendor.js');
    }
  })
});
/*=====  End of JavaScript  ======*/


/*============================
=            SASS            =
============================*/
gulp.task('sass:app', function(){
  gulp.src(config.sass.src.app)
  .pipe(sassGlob())
  .pipe(sourcemaps.init())
  .pipe(sass( {
    style:'compressed',
    precision: 10
  }))
  .on('error', handleError)
  .pipe(prefix())
  .on('error', handleError)
  .pipe(sourcemaps.write('.'))
  .pipe(gulp.dest(config.sass.dist))
});

gulp.task('sass:lib', function(){
  gulp.src(config.sass.src.lib)
  // .pipe(sassGlob())
  .pipe(sourcemaps.init())
  .pipe(sass({
    style:'compressed',
    precision: 10,
  }))
  .on('error', handleError)
  .pipe(prefix())
  .on('error', handleError)
  .pipe(sourcemaps.write('.'))
  .pipe(gulp.dest(config.sass.dist))
});
/*=====  End of SASS  ======*/






/*===============================
=            Linting            =
===============================*/
// Setting up caching
// https://github.com/adametry/gulp-eslint/issues/99
let cache         = require('gulp-cached');
let through2      = require('through2');
let esconfig      = require('./config/eslintrc.js');
let eslintPassed;

// Check if a file has any errors or warnings
let fileHasErrors = function(file) {
  return file.eslint != null && (file.eslint.warningCount > 0 || file.eslint.errorCount > 0);
};

let uncache = function(cacheName) {
    // Create a stream that removes files from cache
    return through2.obj(function (file, enc, done) {
        if (cache.caches[cacheName]) {
            delete cache.caches[cacheName][file.path];
        }
        done(null, file);
    });
};

gulp.task('lint:js', function () {
  return gulp.src(config.js.watch)
  .pipe(gulpif(!prod, cache('lint-cache')))
  .pipe(eslint(esconfig))
  .pipe(eslint.format())
  .pipe(gulpif(!prod, gulpif(fileHasErrors, uncache('lint-cache'))))
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


/*============================
=            Copy            =
============================*/
gulp.task('copy', function(){
  let dist = config.copy.dist;
  return es.merge(config.copy.src.map((src, i) => {
      return gulp.src(src)
      .pipe(gulp.dest(dist[i]));
  }));
});
/*=====  End of Copy  ======*/



/*==============================
=            Server            =
==============================*/
gulp.task('server', function(){
  return nodemon({
    exec: 'node --inspect',
    script: 'index.js',
    ext: 'html js',
    ignore: ['src/*', 'dist/*', 'test/*', 'node_modules/*'],
    quiet: true,
  });
});

gulp.task('apidoc', function(done){
  let apidoc = require('gulp-apidoc');
  return apidoc({
    src: './',
    dest: 'dist/apidoc',
    includeFilters: [ ".*\\.js$" ],
    excludeFilters: [ "node_modules/", "src/", "json", "gulp", "dist" ],
    debug: true
  }, done);
});
/*=====  End of Server  ======*/


/*=============================
=            Watch            =
=============================*/
gulp.task('watch', function(){
  gulp.watch(config.sass.watch.app, ['sass:app']);
  gulp.watch(config.sass.watch.lib, ['sass:lib'])
  gulp.watch(config.html.watch, ['html']);
  gulp.watch(config.js.watch, ['js']);
  gulp.watch(config.js.lib.watch, ['js:lib']);
  gulp.watch(config.copy.src, ['copy']);
  gulp.watch(config.server.watch).on('change', livereload.changed);  
  gulp.watch(join(config.sass.dist, '**/*.css')).on('change', livereload.changed);

  //== Watch for changes
  livereload.listen();
});

gulp.task('init', function(){
  // Usually this is already set by NODE_ENV, this is to handle running gulp prod directly
  prod = true;
});


/*==============================
=            Builds            =
==============================*/
gulp.task('default', ['watch', 'server']);
gulp.task('dev', ['sass:app', 'sass:lib', 'html', 'js', 'copy']);
gulp.task('prod', ['init', 'sass:app', 'sass:lib', 'html', 'js', 'copy']);
/*=====  End of Builds  ======*/



