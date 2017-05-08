// Include gulp
var gulp = require('gulp'),
  // Include Our Plugins
  copy = require('copy'),
  imgmin = require('gulp-imagemin'),
  jshint = require('gulp-jshint'),
  livereload = require('gulp-livereload'),
  mmq = require('gulp-merge-media-queries'),
  notify = require('gulp-notify'),
  prettify = require('gulp-prettify'),
  sass = require('gulp-ruby-sass'),
  sourcemaps = require('gulp-sourcemaps');


// HTML Task
gulp.task('htmlTask', function() {
  gulp.src('CODE/src/**/*.html')
  .pipe(prettify({
    indent_size: 2
  }))
  .pipe(gulp.dest('CODE/dist'))
  .pipe(notify({
    message: 'HTML task complete'
  }));
});


//Concatenate & Minify JS
gulp.task('scripts', function() {
  return gulp.src('CODE/src/**/*.js')
    // .pipe(prettify({indent_size: 2}))
    .pipe(gulp.dest('CODE/dist/'))
    .pipe(livereload())
    .pipe(notify({
      message: 'Scripts task complete'
    }));
});


// Compile Our Sass
gulp.task('styles', function() {
  return sass('CODE/src/**/*.scss', {
      style: 'expanded'
    })
    .on('error', sass.logError)
    .pipe(gulp.dest('CODE/src/'))
    .pipe(livereload())
    .pipe(notify({
      message: 'Styles task complete'
    }));
});


//Merge Media Queries
gulp.task('mmq', function() {
  return gulp.src('CODE/src/css/*.css')
    .pipe(sourcemaps.init())
    .pipe(mmq({
      log: true
    }))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('CODE/dist/css/'))
    .pipe(livereload())
    .pipe(notify({
      message: 'Merge complete'
    }));
});


// HTML Task
gulp.task('prettify', function() {
  gulp.src('CODE/src/**/*.html')
    .pipe(prettify({
      indent_size: 2
    }))
    .pipe(gulp.dest('CODE/dist'))
    .pipe(notify({
      message: 'HTML task complete'
    }));
});


// optimization Task
gulp.task('imgmin', () =>
  gulp.src('CODE/src/img/*.{png,gif,jpg,svg}')
  .pipe(imgmin([
    imgmin.optipng({
      optimizationLevel: 5
    })
  ]))
  .pipe(gulp.dest('./CODE/dist/img'))
);


// Watch Files For Changes
gulp.task('watch', function() {
  gulp.watch('CODE/src/**/*.html', ['prettify'])
  gulp.watch('CODE/src/**/*.js', ['lint', 'scripts'])
  gulp.watch('CODE/src/**/*.scss', ['styles'])
  gulp.watch('CODE/src/**/*.css', ['mmq'])
  gulp.watch('CODE/src/img/', ['imgmin'])
  // Create LiveReload server
  livereload.listen()
  // Watch any files in dist/, reload n change
  gulp.watch(['CODE/dist/**']).on('change', livereload.changed);
});

// Default Task
gulp.task('default', ['lint', 'prettify', 'styles', 'scripts', 'mmq', 'imgmin', 'watch']); //
