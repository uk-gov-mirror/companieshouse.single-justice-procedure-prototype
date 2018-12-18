/*
  clean.js
  ===========
  removes folders:
    - public
*/

const gulp = require('gulp')
const clean = require('gulp-clean')

const config = require('./config.json')

gulp.task('clean', function (done) {
  return gulp.src([config.paths.public + '/*',
    '.port.tmp'], {read: false})
    .pipe(clean())
})
