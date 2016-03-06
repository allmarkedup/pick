'use strict';

const gulp = require('gulp');
const autoprefixer = require('gulp-autoprefixer');
const del = require('del');
const deploy = require('gulp-gh-pages');
const child_process = require('child_process');
const sass = require('gulp-sass');
const sassGlob = require('gulp-sass-glob');

// CSS
gulp.task('css', ['clean:css'], function() {
    return gulp.src('./src/assets/styles/app.scss')
        .pipe(sassGlob())
        .pipe(sass({outputStyle: 'expanded'}).on('error', sass.logError))
        .pipe(autoprefixer({
            browsers: ['> 5%'],
        }))
        .pipe(gulp.dest('./dist/assets/styles'));
});

gulp.task('clean:css', function() {
    return del(['./dist/assets/styles']);
});

gulp.task('css:watch', function () {
    gulp.watch('./src/**/*.scss', ['css']);
});

// Build
gulp.task('build', ['default'], function (cb) {
    child_process.exec('fractal build', function (err, stdout, stderr) {
        console.log(stdout);
        console.log(stderr);
        cb(err);
    });
});

// Deploy
gulp.task('deploy', ['build'], function () {
    return gulp.src("./build/**/*")
        .pipe(deploy());
});

// Task sets
gulp.task('watch', ['css:watch']);
gulp.task('default', ['css']);
