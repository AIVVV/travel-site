var gulp = require('gulp'),
    imagemin = require('gulp-imagemin'),
    del = require('del'),
    usemin = require('gulp-usemin'),
    rev = require('gulp-rev'),
    cssnano = require('gulp-cssnano'),
    uglify = require('gulp-uglify'),
    browserSync = require('browser-sync');

var FINALPATH = {
    root: 'final/',
    css: 'final/css',
    js: 'final/scripts'
};

gulp.task('previewFinal', function() {
    browserSync.init([FINALPATH.css + '/*.css', FINALPATH.root + '/*.html', FINALPATH.js + '/*.js'], {
        server: {
            baseDir: FINALPATH.root
        }
    });
});

gulp.task('deleteFinalFolder', ['icons'], function() {
    return del('./final');
});

gulp.task('copyGeneralFiles', ['deleteFinalFolder'], function() {
    var pathsToCopy = [
        './app/**/*',
        '!.app/index.html',
        '!.app/assets/**/*',
        '!.app/styles/**/*',
        '!.app/scripts/**/*',
    ];

    return gulp.src(pathsToCopy)
        .pipe(gulp.dest('./final'));
});

gulp.task('optimizeImages', ['deleteFinalFolder'], function() {
    return gulp.src(['./app/assets/**/*'])
        .pipe(imagemin({
            progressive: true,
            interlaced: true,
            multipass: true
        }))
        .pipe(gulp.dest('./final/assets/'));
});

gulp.task('useminTrigger', ['deleteFinalFolder'], function() {
    gulp.start('usemin');
});

gulp.task('usemin', ['styles', 'scripts'], function() {
    return gulp.src('./app/index.html')
        .pipe(usemin({
            css: [function() { return rev(); }, function() { return cssnano(); }],
            js: [function() { return rev(); }, function() { return uglify(); }]
        }))
        .pipe(gulp.dest('./final'));
});

gulp.task('build', ['deleteFinalFolder', 'copyGeneralFiles', 'optimizeImages', 'useminTrigger']);