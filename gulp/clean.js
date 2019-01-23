/*
  clean.js
  ===========
  removes folders:
    - public
*/

const gulp = require('gulp')

const config = require('./config.json')
const del = require('del')

gulp.task('clean', function (done) {
  return del([config.paths.public + '*',
    '.port.tmp'])
})
