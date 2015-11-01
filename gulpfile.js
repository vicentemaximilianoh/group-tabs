var gulp = require('gulp');
var del = require('del');
var concat = require('gulp-concat');
var usemin = require('gulp-usemin');
var rename = require('gulp-rename');
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
        del(paths);
        done();
});

gulp.task('images', function (done) {
        gulp.src('./app/img/*')
        .pipe(copy('./dist/img', { prefix: 2}))
        .on('end', done);
});

gulp.task('fix-template', function (done) {
    gulp.src('./dist/window.src.html')
    .pipe(rimraf())
    .pipe(rename('window.html'))
    .pipe(gulp.dest('app/'))
    .on('end', done);
});


gulp.task('minify', function (done) {
    gulp.src('./app/window.src.html')
    .pipe(usemin({
        assetsDir: './',
        css: [minifyCss, 'concat'],
        js: [uglify(), 'concat']
    }))
    .pipe(gulp.dest('dist'))
    .on('end', done);
});

gulp.task('watch', ['default'], function (done) {
    var watchFiles = [
        './dist/**/*'
    ];
    gulp.watch('./app/**/*', ['minify'])
    .on('end', done);
});

gulp.task('default', function (done) {
    
    runSequence(
        'clean',
        ['minify', 'images'],
        'fix-template',
        done
    );
    
});