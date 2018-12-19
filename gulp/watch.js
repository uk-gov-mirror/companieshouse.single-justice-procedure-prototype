/*
  watch.js
  ===========
  watches sass/js/images
*/

const gulp = require('gulp')
const config = require('./config.json')

gulp.task('watch-sass', function (done) {
  return gulp.watch(config.paths.assets + 'sass/**', {cwd: './'}, gulp.series('sass'))
})

gulp.task('watch-assets', function (done) {
  return gulp.watch([config.paths.assets + 'images/**',
    config.paths.assets + 'javascripts/**'], {cwd: './'}, gulp.series('copy-assets'))
})

// Backward compatibility with Elements

gulp.task('watch-sass-v6', function (done) {
  return gulp.watch(config.paths.v6Assets + 'sass/**', {cwd: './'}, gulp.series('sass-v6'))
})

gulp.task('watch-assets-v6', function (done) {
  return gulp.watch([config.paths.v6Assets + 'images/**',
    config.paths.v6Assets + 'javascripts/**'], {cwd: './'}, gulp.series('copy-assets-v6'))
})
