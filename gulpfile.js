var gulp = require('gulp');
var gutil = require('gulp-util');
var bower = require('bower');
var concat = require('gulp-concat');
var sass = require('gulp-sass');
var minifyCss = require('gulp-minify-css');
var rename = require('gulp-rename');
var sh = require('shelljs');
var jshint = require('gulp-jshint');
var autoprefixer = require('gulp-autoprefixer');
var browserSync = require('browser-sync').create();
var nodemon = require('gulp-nodemon');
var sourcemaps = require('gulp-sourcemaps');

var paths = {
  scss: ['./www/scss/*.scss'],
  js: ['./www/js/**/*.js'],
  css: ['./www/css/**/*.css'],
  html: ['./www/templates/**/*.html']
};

// gulp.task('sass', function(done) {
//   gulp.src('./scss/ionic.app.scss')
//     .pipe(sass({
//       errLogToConsole: true
//     }))
//     .pipe(gulp.dest('./www/css/'))
//     .pipe(minifyCss({
//       keepSpecialComments: 0
//     }))
//     .pipe(rename({ extname: '.min.css' }))
//     .pipe(gulp.dest('./www/css/'))
//     .on('end', done);
// });

// gulp.task('install', ['git-check'], function() {
//   return bower.commands.install()
//     .on('log', function(data) {
//       gutil.log('bower', gutil.colors.cyan(data.id), data.message);
//     });
// });

// gulp.task('git-check', function(done) {
//   if (!sh.which('git')) {
//     console.log(
//       '  ' + gutil.colors.red('Git is not installed.'),
//       '\n  Git, the version control system, is required to download Ionic.',
//       '\n  Download git here:', gutil.colors.cyan('http://git-scm.com/downloads') + '.',
//       '\n  Once git is installed, run \'' + gutil.colors.cyan('gulp install') + '\' again.'
//     );
//     process.exit(1);
//   }
//   done();
// });

// Compile Our Sass for development (NOT VENDOR)
gulp.task('sass-dev', function() {
  return gulp.src(paths.scss)
    .pipe(sourcemaps.init())
    .pipe(sass({ errLogToConsole: true }).on('error', sass.logError))
    .pipe(autoprefixer({
      browser: ['last 2 versions'],
    }))
    .pipe(sourcemaps.write('/'))
    .pipe(gulp.dest('./www/css/'))
});




//DEVELOPMENT SERVER via browsersync
gulp.task('server-dev', function() {
  browserSync.init({
    server: './www/',
    port: 3030
  });
});

// Nodemon task to watch server changes
gulp.task('nodemon', function (cb) {
  var started = false;
  return nodemon({
    script: 'server.js'
  }).on('start', function () {
    // to avoid nodemon being started multiple times
    // thanks @matthisk
    if (!started) {
      cb();
      started = true;
    }
  });
});

// Browser Reaload task
gulp.task('reload', function() {
  browserSync.reload()
  return gutil.log('Something changed! Reloading your browser....');
});

// Development Task
gulp.task('dev', ['sass-dev', 'server-dev'], function() {
  gulp.watch(paths.scss, ['sass-dev'])
 // gulp.watch(paths.js, ['jslint', 'reload']);
  gulp.watch(paths.css, ['reload']);
  gulp.watch(paths.html, ['reload']);
  return gutil.log('Gulp is running your development server ...watching Javascripts and SCSS for changes.');
});
