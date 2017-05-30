let 
    concat        = require('gulp-concat'),
    config        = require('./gulp/gulp-config.js'),
    eslint        = require('gulp-eslint'),
    fileInclude   = require('gulp-file-include'),
    gulp          = require('gulp'),
    gulpif        = require('gulp-if'),
    nodemon       = require('gulp-nodemon'),
    livereload    = require('gulp-livereload'),
    prefix        = require('gulp-autoprefixer'),
    path          = require('path'),
    join          = path.join,
    sassGlob      = require('gulp-sass-glob'),
    shell         = require('gulp-shell'),
    sourcemaps    = require('gulp-sourcemaps'),
    webserver     = require('gulp-webserver'),
    webpack       = require('webpack'),
    newer         = require('gulp-newer'),
    processhtml   = require('gulp-noop'),
    htmlmin       = require("gulp-noop"),
    apidoc        = require('gulp-noop'),
    minifyCSS     = function(){},
    uglify        = function(){};

var prod;


var handleError = function(err) {
  console.log("\x07");
  console.log(err.toString());
  this.emit('end');
};


/*====================================
=            Require Sass            =
====================================*/
try{sass = require('gulp-sass')}
catch(err){
  console.error(`
  ==========
  You've changed node versions, rebuilding node-sass...
  ==========`);
  gulp.src('').pipe(shell(['npm rebuild node-sass']));
}
/*=====  End of Require Sass  ======*/


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
    basepath: './src/html'
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
let compiler; // Set in builds
gulp.task('js', ['lint:js'], function(cb){
  compiler.run(function(err, stats){
    cb();

    var json = stats.toJson();
    if(json.errors.length > 0){
      json.errors.forEach(function(item){
        console.log(item);
      });
      console.log("\x07");
    }
    else if(json.warnings.length > 0){
      json.warnings.forEach(function(item){
        console.log(item);
      });
    }
    else{
      livereload.changed(config.js.dist + '/app.js');
    }
  })
});


gulp.task('js:lib', e => {
  gulp.src(config.js.lib.src)
  .pipe(gulp.dest(config.js.dist + '/lib.js'))
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
    // includePaths: config.sass.path.lib   // Uncomment for foundation
  }))
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
  return gulp.src(config.js.src)
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



/*==============================
=            Server            =
==============================*/
gulp.task('server', function(){
  // var ip = require('get-my-ip')();
  //=== Dev server
  // var stream = gulp.src(config.dist);
  // stream.pipe(webserver());
  // if(ip){
  //   stream.pipe(webserver({
  //       host: ip,
  //       livereload: true
  //   }));
  // }



  let stream = nodemon({
    script: 'index.js',
    ext: 'html js',
    ignore: ['src/*', 'dist/*', 'test/*'],
    // execMap: {
    //   js: "node --harmony-async-await"
    // },
  });

  //== Node inspect
  // let stream = nodemon({
  //   exec: 'node --inspect',
  //   script: 'index.js',
  //   ext: 'html js',
  //   ignore: ['src/*', 'dist/*', 'test/*']
  // })
  // .on('start', ['']);

  //=== nodejs server
  // stream.pipe(shell([
  //   `nodemon --debug --ignore src/ --ignore dist/ --ignore test/ & 
  //   node-inspector --preload false`
  // ]));

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


/*=============================
=            Watch            =
=============================*/
gulp.task('watch', function(){
  gulp.watch(config.sass.watch.app, ['sass:app']);
  gulp.watch(config.sass.watch.lib, ['sass:lib'])
  gulp.watch(config.html.watch, ['html']);
  gulp.watch(config.js.watch, ['js']);
  gulp.watch(config.js.lib.watch, ['js:lib']);

  gulp.watch(config.server.watch).on('change', livereload.changed);

  
  gulp.watch(join(config.sass.dist, '**/*.css')).on('change', livereload.changed);

  //== Watch for changes
  livereload.listen();
});



/*==============================
=            Builds            =
==============================*/
gulp.task('prod-init', function(){
  prod = true;
  console.log('PROD', prod);
  process.env.NODE_ENV = 'production';
  compiler = webpack(config.webpack.prod);
});
gulp.task('init', function(){
  compiler = webpack(config.webpack.dev);
});

gulp.task('prod', ['prod-init', 'sass:app', 'sass:lib', 'html', 'js', 'js:lib']);
gulp.task('prodq', ['init', 'sass:app', 'sass:lib', 'html', 'js', 'js:lib']);
gulp.task('default', ['init', 'watch', 'server']);
/*=====  End of Builds  ======*/



