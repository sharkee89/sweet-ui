'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var concatCss = require('gulp-concat-css');
let cleanCSS = require('gulp-clean-css');

sass.compiler = require('node-sass');

// SASS
gulp.task('sass', function () {
    return gulp.src('./sass/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./css'));
});
gulp.task('sass:watch', function () {
    gulp.watch('./sass/**/*.scss', ['sass']);
});
// CONCAT CSS
gulp.task('concat-css', function () {
    return gulp.src('./css/**/*.css')
        .pipe(concatCss("styles/sweet-ui.css"))
        .pipe(gulp.dest('concat-css/'));
});
// MINIFY CSS
gulp.task('minify-css', () => {
    return gulp.src('./concat-css/styles/*.css')
        .pipe(cleanCSS({ compatibility: 'ie8' }))
        .pipe(gulp.dest('dist'));
});

gulp.task('prepare-css', ['sass', 'concat-css', 'minify-css']);
