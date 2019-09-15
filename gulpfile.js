const gulp          = require('gulp'),
      autoprefixer  = require('gulp-autoprefixer'),
      sass          = require('gulp-sass'),
      uglify        = require('gulp-uglify'),
      concat        = require('gulp-concat');

const root          = './',
      scss          = root + 'src/scss/',
      cssDist       = root + 'dist/css/',
      js            = root + 'src/js/',
      jsDist        = root + 'dist/js/';

const styleWatchFiles = scss + '**/*.scss';

const jsSrc = [
      js + 'jquery-3.4.1.min.js',
      js + 'scripts.js'
];

function css() {
  return gulp.src(scss + 'style.scss', { sourcemaps: true })
    .pipe(sass({
      outputStyle: 'compressed'
    }).on('error', sass.logError))
    .pipe(autoprefixer('last 2 versions'))
    .pipe(gulp.dest(cssDist, { sourcemaps: '.' }));
}

function javascript() {
  return gulp.src(jsSrc)
    .pipe(concat('scripts.js'))
    .pipe(uglify())
    .pipe(gulp.dest(jsDist))
}

function watch() {
  gulp.watch(jsSrc, gulp.series(javascript));
  gulp.watch(styleWatchFiles, gulp.series(css));
}

exports.css = css;
exports.javascript = javascript;
exports.watch = watch;

const build = gulp.series(watch);
gulp.task('default', build);