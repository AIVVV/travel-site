var gulp = require('gulp'),
    imagemin = require('gulp-imagemin'),
    del = require('del'),
    usemin = require('gulp-usemin'),
    rev = require('gulp-rev'),
    cssnano = require('gulp-cssnano'),
    uglify = require('gulp-uglify'),
    browserSync = require('browser-sync');

var FINALPATH = {
    root: 'docs/',
    css: 'docs/css',
    js: 'docs/scripts'
};

gulp.task('previewDocs', function() {
    browserSync.init([FINALPATH.css + '/*.css', FINALPATH.root + '/*.html', FINALPATH.js + '/*.js'], {
        server: {
            baseDir: FINALPATH.root
        }
    });
});

gulp.task('deleteDocsFolder', ['icons'], function() {
    return del('./docs');
});

gulp.task('copyGeneralFiles', ['deleteDocsFolder'], function() {
    var pathsToCopy = [
        './app/**/*',
        '!.app/index.html',
        '!.app/assets/**/*',
        '!.app/css/**/*',
        '!.app/scripts/**/*',
    ];

    return gulp.src(pathsToCopy)
        .pipe(gulp.dest('./docs'));
});

gulp.task('optimizeImages', ['deleteDocsFolder'], function() {
    return gulp.src(['./app/assets/**/*'])
        .pipe(imagemin({
            progressive: true,
            interlaced: true,
            multipass: true
        }))
        .pipe(gulp.dest('./docs/assets/'));
});

gulp.task('useminTrigger', ['deleteDocsFolder'], function() {
    gulp.start('usemin');
});

gulp.task('usemin', ['styles', 'scripts'], function() {
    return gulp.src('./app/index.html')
        .pipe(usemin({
            css: [function() { return rev(); }, function() { return cssnano(); }],
            js: [function() { return rev(); }, function() { return uglify(); }]
        }))
        .pipe(gulp.dest('./docs'));
});

gulp.task('build', ['deleteDocsFolder', 'optimizeImages', 'useminTrigger']);