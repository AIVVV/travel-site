var gulp = require('gulp'),
    svgSprite = require('gulp-svg-sprite'),
    rename = require('gulp-rename'),
    del = require('del');

var config = {
    mode: {
        css: {
            sprite: 'sprite.svg',
            render: {
                css: {
                    template: './gulp/template/sprite.css'
                }
            }
        }
    }
};

gulp.task('beginClean', function() {
    return del(['src/assets/sprite', 'app/assets/sprite']);
});

gulp.task('createSprite', ['beginClean'], function() {
    return gulp.src('src/assets/icons/**/*svg')
        .pipe(svgSprite(config))
        .pipe(gulp.dest('src/assets/sprite'));
});

gulp.task('copySpriteGraphic', ['createSprite'], function() {
    return gulp.src('src/assets/sprite/css/*.svg')
        .pipe(gulp.dest('app/assets/sprite'));
});

gulp.task('copySpriteCSS', ['createSprite'], function() {
    return gulp.src('src/assets/sprite/css/*.css')
        .pipe(rename('_sprite.css'))
        .pipe(gulp.dest('src/css/modules'));
});

gulp.task('endClean',['copySpriteCSS', 'copySpriteGraphic'], function() {
    return del(['src/assets/sprite']);
});

gulp.task('icons', ['beginClean', 'createSprite', 'copySpriteCSS', 'copySpriteGraphic', 'endClean']);