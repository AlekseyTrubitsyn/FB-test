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
  pug: './src/*.pug',
  sass: './src/sass/',
  css: './public/css/',
  jsSrc: './src/js/**/*.js',
  js: './public/js/',
  fontsSrc: './src/fonts/*',
  fonts: './public/fonts/',
  imagesSrc: './src/img/*',
  images: './public/img/',
  jsonData: './src/data.json'
};

gulp.task('pug', function () {
  return gulp.src(paths.pug)
    .pipe(data( function(file) {
                return JSON.parse(
                  fs.readFileSync(paths.jsonData)
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
  return gulp.src(paths.sass + 'style.scss')
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
  gulp.src(paths.jsSrc)
      .pipe(gulp.dest(paths.js));
});

gulp.task('fonts', function() {
  return gulp.src(paths.fontsSrc)
    .pipe(gulp.dest(paths.fonts))
});

gulp.task('images', function() {
  return gulp.src(paths.imagesSrc)
    .pipe(gulp.dest(paths.images))
});

gulp.task('watch', function () {
  gulp.watch(paths.sass + '**/*.scss', ['sass']);
  gulp.watch('./src/**/*.pug', ['rebuild']);
  gulp.watch('./src/js/*.js', ['js']);
});

gulp.task('build', ['js', 'sass', 'pug']);

gulp.task('default', ['browser-sync', 'fonts', 'images', 'watch']);
