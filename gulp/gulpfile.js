require('./gulp/tasks/html');
require('./gulp/tasks/styles');
require('./gulp/tasks/watch');

var gulp = require('gulp'),
    watch = require('gulp-watch'),
    browserSync = require('browser-sync'),
  	clean = require('gulp-clean'),
    postcss = require('gulp-postcss'),
    autoprefixer = require('autoprefixer'),
    cssvars = require('postcss-simple-vars'),
    nested = require('postcss-nested'),
    cssImport = require('postcss-import'),
    mixins = require('postcss-mixins');

var SOURCEPATHS = {
    htmlSource: 'src/*.html',
    cssSource: 'src/css/styles.css',
    jsSource: 'src/js/**',
    imgSource: 'src/assets/**'
};

var APPPATH = {
    root: 'app/',
    img: 'app/assets',
    css: 'app/css',
    js: 'app/js'
};

gulp.task('html', function() {
    return gulp.src(SOURCEPATHS.htmlSource)
        .pipe(gulp.dest(APPPATH.root));
});

gulp.task('clean-html', function() {
    return gulp.src(APPPATH.root + '/*.html', { read: false, force: true })
        .pipe(clean());
});

gulp.task('styles', function() {
    return gulp.src(SOURCEPATHS.cssSource)
        .pipe(postcss([cssImport, mixins, cssvars, nested, autoprefixer]))
        .on('error', function(errorInfo) {
            console.log(errorInfo.toString());
            this.emit('end');
        })
        .pipe(gulp.dest(APPPATH.css));
});

gulp.task('server', ['styles'], function() {
    browserSync.init([APPPATH.css + '/*.css', APPPATH.root + '/*.html', APPPATH.js + '/*.js'], {
        server: {
            baseDir: APPPATH.root
        }
    });
});

gulp.task('watch', ['server', 'html', 'styles', 'clean-html'], function() {
    gulp.watch([SOURCEPATHS.htmlSource], ['html', 'clean-html']);
    gulp.watch([SOURCEPATHS.cssSource], ['styles']);
    gulp.watch([SOURCEPATHS.imgSource], ['minify-imgs']);
});