var gulp = require('gulp'),
    svgSprite = require('gulp-svg-sprite'),
    rename = require('gulp-rename'),
    del = require('del'),
    svg2png = require('gulp-svg2png');

var config = {
    shape: {
        spacing: {
            padding: 1
        }
    },
    mode: {
        css: {
            variables: {
                replaceSvgWithPng: function(){
                    return function(sprite, render) {
                        return render(sprite).split('.svg').join('.png');
                    };
                }
            },
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

gulp.task('createPngCopy', ['createSprite'], function() {
    return gulp.src('src/assets/sprite/css/*.svg')
        .pipe(svg2png())
        .pipe(gulp.dest('src/assets/sprite/css'));
});

gulp.task('copySpriteGraphic', ['createPngCopy'], function() {
    return gulp.src('src/assets/sprite/css/*.{svg,png}')
        .pipe(gulp.dest('app/assets/sprite'));
});

gulp.task('copySpriteCSS', ['createSprite'], function() {
    return gulp.src('src/assets/sprite/css/*.css')
        .pipe(rename('_sprite.css'))
        .pipe(gulp.dest('src/css/modules'));
});

gulp.task('endClean', ['copySpriteCSS', 'copySpriteGraphic'], function() {
    return del(['src/assets/sprite']);
});

gulp.task('icons', ['beginClean', 'createSprite', 'createPngCopy', 'copySpriteCSS', 'copySpriteGraphic', 'endClean']);