var gulp = require('gulp');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var autoprefixer = require('gulp-autoprefixer');
var uglify = require('gulp-uglify');

gulp.task('sassify', () => {
  return gulp.src('./src/scss/style.scss')
          .pipe(sourcemaps.init())
          .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
          .pipe(autoprefixer('last 2 version'))
          .pipe(sourcemaps.write('./'))
          .pipe(gulp.dest('./dist/css'))    
});

gulp.task('jsminify', () => {
  return gulp.src('./src/js/**/*.js')
    .pipe(uglify())
    .pipe(gulp.dest('./dist/js'))
});

gulp.task('default', () => {
  gulp.watch('./src/scss/*',gulp.series(['sassify']));
  gulp.watch('./src/js/*',gulp.series(['jsminify']));
});