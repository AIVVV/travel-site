var gulp = require('gulp'),
    watch = require('gulp-watch'),
    browserSync = require('browser-sync');

var SOURCEPATHS = {
    htmlSource: 'src/*.html',
    cssSource: 'src/css/**/*.css',
    jsSource: 'src/scripts/**'
};

var APPPATH = {
    root: 'app/',
    css: 'app/css',
    js: 'app/scripts'
};

gulp.task('server', ['styles'], function() {
    browserSync.init([APPPATH.css + '/*.css', APPPATH.root + '/*.html', APPPATH.js + '/*.js'], {
        server: {
            baseDir: APPPATH.root
        }
    });
});

gulp.task('scriptRefresh', ['scripts'], function() {
    browserSync.reload();
});

gulp.task('watch', ['server', 'html', 'styles', 'clean-html', 'scripts'], function() {
    gulp.watch([SOURCEPATHS.htmlSource], ['html', 'clean-html']);
    gulp.watch([SOURCEPATHS.cssSource], ['styles']);
    gulp.watch([SOURCEPATHS.jsSource], ['scriptRefresh']);
});