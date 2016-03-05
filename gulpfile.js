'use strict';

const gulp = require('gulp');
const autoprefixer = require('gulp-autoprefixer');
const del = require('del');
const sass = require('gulp-sass');
const sassGlob = require('gulp-sass-glob');

// CSS
gulp.task('css', ['clean:css'], function() {
    return gulp.src('./src/assets/styles/app.scss')
        .pipe(sassGlob())
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer({
            browsers: ['> 5%'],
        }))
        .pipe(gulp.dest('./dist/assets/styles'));
});

gulp.task('clean:css', function() {
    return del(['./dist/assets/styles']);
});

gulp.task('css:watch', function () {
    gulp.watch('./src/assets/styles/**/*.scss', ['css']);
});

// Task sets
gulp.task('watch', ['css:watch']);

gulp.task('default', ['css']);
