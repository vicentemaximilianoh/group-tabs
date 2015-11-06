var gulp = require('gulp');
var del = require('del');
var concat = require('gulp-concat');
var usemin = require('gulp-usemin');
var rename = require('gulp-rename');
var replace = require('gulp-replace');
var copy = require('gulp-copy');
var rimraf = require('gulp-rimraf');
var runSequence = require('run-sequence');
var minifyCss = require('gulp-minify-css');
var uglify = require('gulp-uglify');

var gulpIf = require('gulp-if');
var args = require('yargs').argv;


var paths = {
    js: './dist/js/',
    css: './dist/css/',
    images: './dist/img/'
};

gulp.task('clean', function (done) {
    return del(['./dist'], done);
});

gulp.task('minify', function (done) {
    gulp.src('./dist/index.html')
        .pipe(usemin({
            assetsDir: './',
            css: [minifyCss, 'concat'],
            js: [uglify(), 'concat']
        }))
        .pipe(gulp.dest('./dist'))
        .on('end', done);
});

gulp.task('images', function (done) {
    gulp.src('./app/img/*')
        .pipe(gulp.dest('./dist/img/'))
        .on('end', done);
});


gulp.task('copy-templates', function (done) {
    gulp.src('./app/js/**/*.html')
        .pipe(replace(/\/app\//g, '/dist/'))
        .pipe(gulp.dest('./dist/js/'))
        .on('end', done);
});

gulp.task('fix-templates', function (done) {
    gulp.src('./dist/js/app.js')
        .pipe(replace(/\/app\//g, '/'))
        .pipe(gulp.dest('./dist/js/'))
        .on('end', done);
});

gulp.task('fix-index', function (done) {
    gulp.src('./app/index.html')
        .pipe(copy('./dist/', {
            prefix: 1
        }))
        .on('end', done);
});

/*
gulp.task('watch', ['default'], function (done) {
    var watchFiles = [
        './dist/**'
    ];
    gulp.watch('./app/**')
        .on('end', done);
});
*/

gulp.task('fix-manifest', function (done) {
    gulp.src(['manifest.json'])
        .pipe(replace(/\/app\//g, './'))
        .pipe(gulp.dest('./dist'))
        .on('end', done);
});

gulp.task('copy-background', function (done) {
    gulp.src(['background.js'])
        .pipe(gulp.dest('./dist'))
        .on('end', done);
});

gulp.task('default', function (done) {

    runSequence(
        'clean', ['fix-index', 'fix-manifest', 'copy-background'], ['minify', 'images'], ['copy-templates', 'fix-templates'], done
    );

});