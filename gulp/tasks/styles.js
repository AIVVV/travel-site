var gulp = require('gulp'),
    postcss = require('gulp-postcss'),
    autoprefixer = require('autoprefixer'),
    cssvars = require('postcss-simple-vars'),
    nested = require('postcss-nested'),
    cssImport = require('postcss-import'),
    mixins = require('postcss-mixins'),
    hexrgba = require('postcss-hexrgba');

var SOURCEPATHS = {
    htmlSource: 'src/*.html',
    cssSource: 'src/css/**.css',
};

var APPPATH = {
    root: 'app/',
    css: 'app/css',
};

gulp.task('styles', function() {
    return gulp.src(SOURCEPATHS.cssSource)
        .pipe(postcss([cssImport, mixins, cssvars, nested, hexrgba, autoprefixer]))
        .on('error', function(errorInfo) {
            console.log(errorInfo.toString());
            this.emit('end');
        })
        .pipe(gulp.dest(APPPATH.css));
});