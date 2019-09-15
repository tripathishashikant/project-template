const gulp          = require('gulp'),
      autoprefixer  = require('gulp-autoprefixer'),
      sass          = require('gulp-sass'),
      uglify        = require('gulp-uglify'),
      concat        = require('gulp-concat');

const root          = './',
      scss          = root + 'src/scss/',
      css           = root + 'dist/css/',
      js            = root + 'src/js/',
      jsDist        = root + 'dist/js/';

const styleWatchFiles = scss + '**/*.scss';

const jsSrc = [
      js + 'jquery-3.4.1.min.js',
      js + 'scripts.js'
];

gulp.task('sass', () => {
  return gulp.src(scss + 'style.scss', { sourcemaps: true })
    .pipe(sass({
      outputStyle: 'compressed'
    }).on('error', sass.logError))
    .pipe(autoprefixer('last 2 versions'))
    .pipe(gulp.dest(css, { sourcemaps: '.' }));
});

gulp.task('jsminify', () => {
  return gulp.src(jsSrc)
    .pipe(concat('scripts.js'))
    .pipe(uglify())
    .pipe(gulp.dest(jsDist))
});

gulp.task('default', () => {
  gulp.watch(jsSrc, gulp.series(['jsminify']));
  gulp.watch(styleWatchFiles, gulp.series(['sass']));
});
