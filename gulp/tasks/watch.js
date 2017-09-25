var gulp = require('gulp'),
    watch = require('gulp-watch'),
    browserSync = require('browser-sync');

var SOURCEPATHS = {
    htmlSource: 'src/*.html',
    cssSource: 'src/css/*.css',
    jsSource: 'src/js/**',
    imgSource: 'src/assets/**'
};

var APPPATH = {
    root: 'app/',
    img: 'app/assets',
    css: 'app/css',
    js: 'app/js'
};

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
});