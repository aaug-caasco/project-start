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
  prettifyJS = require('gulp-js-prettify'),
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



// CSS Task
gulp.task('styles', function() {
  return sass('CODE/src/**/*.scss', {
    style: 'expanded',
    sourcemap: true
  })
  .pipe(sourcemaps.init())
  .on('error', sass.logError)
  .pipe(mmq({
    log: true
  }))
  .pipe(sourcemaps.write())
  .pipe(gulp.dest('CODE/dist/'))
  .pipe(livereload())
  .pipe(notify({
    message: 'Styles task complete'
  }));
});



gulp.task('scripts', function() {
  return gulp.src('CODE/src/**/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('default'))
    .pipe(prettifyJS(
    {
      "indent_size": 2,
      "indent_char": " ",
      "indent_with_tabs": false,
      "eol": "\n",
      "end_with_newline": false,
      "indent_level": 0,
      "preserve_newlines": false,
      "max_preserve_newlines": 10,
      "space_in_paren": true,
      "space_in_empty_paren": false,
      "jslint_happy": false,
      "space_after_anon_function": false,
      "brace_style": "collapse",
      "break_chained_methods": false,
      "keep_array_indentation": false,
      "unescape_strings": false,
      "wrap_line_length": 0,
      "e4x": false,
      "comma_first": false,
      "operator_position": "before-newline"
    }
  ))
  .pipe(gulp.dest('CODE/dist/'))
  .pipe(livereload())
  .pipe(notify({
    message: 'Scripts task complete'
  }));
});



// IMG Task
gulp.task('imgmin', () =>
gulp.src('CODE/src/img/*.{png,gif,jpg,svg}')
.pipe(imgmin())
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
gulp.task('default', ['htmlTask', 'styles', 'scripts', 'imgmin', 'watch']);
