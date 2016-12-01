"use strict";

var path = require('path');

var gulp = require('gulp');
var sourcemaps = require('gulp-sourcemaps');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var cssmin = require('gulp-cssmin');
var autoprefixer = require('gulp-autoprefixer');
var gIf = require('gulp-if');
var browserslist = require('browserslist');

var env = 'dev';
var distFolder = path.resolve(__dirname, 'dist');

gulp.task('sass', function(){

    return gulp.src([
            './src/sass/**/*.sass'
        ])
        .pipe(gIf(env === 'dev', sourcemaps.init()))
        .pipe(sass().on('error', sass.logError))
        .pipe(gIf(env === 'prod', autoprefixer({
            browsers: browserslist('last 2 versions, > 1%'),
            cascade: false
        })))
        .pipe(concat('styles.css'))
        .pipe(gIf(env === 'prod', cssmin()))
        .pipe(gIf(env === 'dev', sourcemaps.write()))
        .pipe(gulp.dest(distFolder));
});

gulp.task('sass:watch', function(){

    gulp.watch('./src/sass/**/*.sass', ['sass']);
});

gulp.task('js', function(){

    return gulp.src([
            './src/js/**/*.js'
        ])
        .pipe(gIf(env === 'dev', sourcemaps.init()))
        .pipe(gIf(env === 'prod', uglify()))
        .pipe(concat('scripts.js'))
        .pipe(gIf(env === 'dev', sourcemaps.write()))
        .pipe(gulp.dest(distFolder));
});

gulp.task('js:watch', function(){

    gulp.watch('./src/js/**/*.js', ['js']);
});

gulp.task('dev', function(){

    env = 'dev';

    gulp.run(['sass', 'sass:watch',
        'js', 'js:watch']);
});

gulp.task('prod', function(){

    env = 'prod';

    gulp.run(['sass', 'js']);
});

gulp.task('default', function(){

    console.log('No default tasks here, son. Use readme or watch in sources.');
});
