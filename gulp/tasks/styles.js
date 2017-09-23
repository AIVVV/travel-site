var gulp = require('gulp'),
    postcss = require('gulp-postcss'),
    autoprefixer = require('autoprefixer'),
    cssvars = require('postcss-simple-vars'),
    nested = require('postcss-nested'),
    cssImport = require('postcss-import'),
    mixins = require('postcss-mixins');

var SOURCEPATHS = {
    htmlSource: 'src/*.html',
    cssSource: 'src/css/**.css',
    jsSource: 'src/js/**',
    imgSource: 'src/assets/**'
};

var APPPATH = {
    root: 'app/',
    img: 'app/assets',
    css: 'app/css',
    js: 'app/js'
};

gulp.task('styles', function() {
    return gulp.src(SOURCEPATHS.cssSource)
        .pipe(postcss([cssImport, mixins, cssvars, nested, autoprefixer]))
        .on('error', function(errorInfo) {
            console.log(errorInfo.toString());
            this.emit('end');
        })
        .pipe(gulp.dest(APPPATH.css));
});