/*global require*/
"use strict";

const gulp = require('gulp'),
  path = require('path'),
  data = require('gulp-data'),
  pug = require('gulp-pug'),
  prefix = require('gulp-autoprefixer'),
  sass = require('gulp-sass'),
  browserSync = require('browser-sync'),
  fs = require('fs');

const paths = {
  public: './public/',
  sass: './src/sass/',
  css: './public/css/',
  jsSrc: './src/js/',
  js: './public/js/'
};

gulp.task('pug', function () {
  return gulp.src('./src/**/*.pug')
    .pipe(data( function(file) {
                return JSON.parse(
                  fs.readFileSync('./src/data.json')
                );
              } ))
    .pipe(pug())
    .pipe(gulp.dest(paths.public));
});

gulp.task('rebuild', ['pug'], function () {
  browserSync.reload();
});

gulp.task('browser-sync', ['js', 'sass', 'pug'], function () {
  browserSync({
    server: {
      baseDir: paths.public
    },
    notify: false
  });
});

gulp.task('sass', function () {
  return gulp.src(paths.sass + '**/*.scss')
    .pipe(sass({
      includePaths: [paths.sass],
      outputStyle: 'compressed'
    }))
    .on('error', sass.logError)
    .pipe(prefix(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], {
      cascade: true
    }))
    .pipe(gulp.dest(paths.css))
    .pipe(browserSync.reload({
      stream: true
    }));
});

gulp.task('js', function () {
  console.log('js');
  gulp.src(paths.jsSrc + "*.js")
      .pipe(gulp.dest(paths.js));
});

gulp.task('watch', function () {
  gulp.watch(paths.sass + '**/*.scss', ['sass']);
  gulp.watch('./src/**/*.pug', ['rebuild']);
  gulp.watch('./src/js/*.js', ['js']);
});

gulp.task('build', ['js', 'sass', 'pug']);

gulp.task('default', ['browser-sync', 'watch']);
