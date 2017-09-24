var gulp = require('gulp'),
    clean = require('gulp-clean');

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

