/*global require*/
"use strict";

const gulp = require('gulp'),
  path = require('path'),
  data = require('gulp-data'),
  pug = require('gulp-pug'),
  prefix = require('gulp-autoprefixer'),
  sass = require('gulp-sass'),
  browserSync = require('browser-sync');

/*
 * Diretórios aqui
 */
const paths = {
  public: './public/',
  sass: './src/sass/',
  css: './public/css/'
};

/**
 * Compile os arquivos .pug e passe os dados do arquivo json
 * Correspondente. Index.pug - index.pug.json
 */
gulp.task('pug', function () {
  return gulp.src('./src/**/*.pug')
    .pipe(pug())
    .pipe(gulp.dest(paths.public));
});

/**
 * Recompilar arquivos .pug e recarregar o navegador em tempo real
 */
gulp.task('rebuild', ['pug'], function () {
  browserSync.reload();
});

/**
 * Aguarda as tarefas de pug e sass e, em seguida, inicie o servidor de sincronização do navegador
 */
gulp.task('browser-sync', ['sass', 'pug'], function () {
  browserSync({
    server: {
      baseDir: paths.public
    },
    notify: false
  });
});

/**
 *
  Compile arquivos .scss no diretório css público
 * Necessidade de prefixos de fornecedores, em seguida, em tempo real recarrega o navegador.
 */
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

/**
 * Escuta os arquivos scss para alterações e recompilação
  * Escuta os arquivos .pug executar pug-rebuild, em seguida, recarregar BrowserSync
 */
gulp.task('watch', function () {
  gulp.watch(paths.sass + '**/*.scss', ['sass']);
  gulp.watch('./src/**/*.pug', ['rebuild']);
});

// Constroe a tarefa compilar sass e pug.
gulp.task('build', ['sass', 'pug']);

/**
 * Tarefa padrão, executando apenas `gulp` irá compilar o sass,
 */
gulp.task('default', ['browser-sync', 'watch']);
