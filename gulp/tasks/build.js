var gulp = require('gulp'),
    imagemin = require('gulp-imagemin'),
    del = require('del'),
    usemin = require('gulp-usemin');

gulp.task('deleteAppFolder', function() {
    return del('./final');
});

gulp.task('optimizeImages', ['deleteAppFolder'], function() {
    return gulp.src(['./src/assets/**/*', '!./src/assets/icons', '!./src/assets/icons/**/*'])
        .pipe(imagemin({
            progressive: true,
            interlaced: true,
            multipass: true
        }))
        .pipe(gulp.dest('./final/assets/'));
});

gulp.task('usemin', ['deleteAppFolder'], function() {
    return gulp.src('./app/index.html')
        .pipe(usemin())
        .pipe(gulp.dest('./final'));
});

gulp.task('build', ['deleteAppFolder', 'optimizeImages', 'usemin']);