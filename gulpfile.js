var gulp = require('gulp'),
    watch = require('gulp-watch'),
    clean = require('gulp-clean'),
    minifyimages = require('gulp-imagemin'),
    newer = require('gulp-newer'),
    postcss = require('gulp-postcss'),
    autoprefixer = require('autoprefixer'),
    cssvars = require('postcss-simple-vars'),
    nested = require('postcss-nested'),
    cssImport = require('postcss-import');

var SOURCEPATHS = {
    htmlSource: 'src/*.html',
    cssSource: 'src/css/**/*.css',
    jsSource: 'src/js/**',
    imgSource: 'src/assets/**'
};

var APPPATH = {
    root: 'app/',
    img: 'app/assets',
    css: 'app/css',
    js: 'app/js'
};

// clean html files
gulp.task('clean-html', function() {
    return gulp.src(APPPATH.root + '/*.html', { read: false, force: true })
        .pipe(clean());
});

//task for html
gulp.task('html', function() {
    return gulp.src(SOURCEPATHS.htmlSource)
        .pipe(gulp.dest(APPPATH.root));
});

// task for css plug in
gulp.task('styles', function() {
    return gulp.src(SOURCEPATHS.cssSource)
        .pipe(postcss([cssImport, cssvars, nested, autoprefixer]))
        .pipe(gulp.dest(APPPATH.css));
});
// task for minify images
gulp.task('minify-imgs', function() {
    return gulp.src(SOURCEPATHS.imgSource)
        .pipe(newer(APPPATH.img))
        .pipe(minifyimages())
        .pipe(gulp.dest(APPPATH.img));
});

gulp.task('watch', ['html', 'styles', 'minify-imgs', 'clean-html'], function() {
    gulp.watch([SOURCEPATHS.htmlSource], ['html', 'clean-html']);
    gulp.watch([SOURCEPATHS.cssSource], ['styles']);
    gulp.watch([SOURCEPATHS.imgSource], ['minify-imgs']);
});
