var gulp = require('gulp');
var sass = require('gulp-sass'); //sass cimpiler
var autoprefixer = require('gulp-autoprefixer'); //add autoprefixes to styles
var browserSync = require('browser-sync').create(); //browser sync
var concat = require('gulp-concat'); //concatanate scripts
var uglify = require('gulp-uglify'); //minify scripts
var sourcemaps = require('gulp-sourcemaps');
var babel = require("gulp-babel"); //babel ecma2015

gulp.task('default', ['styles', 'babel'], function(){
    gulp.watch('app/sass/**/*.scss', ['styles']);
    gulp.watch('app/js/**/*.js', ['babel']);
    //gulp.watch('app/index.html', ['copy-html']);
    gulp.watch('app/index.html').on('change', browserSync.reload);
});

//run sass with autoprefixer
gulp.task('styles', function(){
    gulp.src('app/sass/**/*.scss')
        .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
        .pipe(autoprefixer({
            browsers: ['last 2 versions']
        }))
        .pipe(gulp.dest('app/styles'))
});

//ecma2015
gulp.task('babel', function(){
    return gulp.src('app/js/**/*.js')
        .pipe(babel())
        .pipe(gulp.dest('app/scripts'));
});

//copy index.html to product
gulp.task('copy-html', function(){
    gulp.src('app/index.html')
        .pipe(gulp.dest('./dist'));
});

//copy bootstrap to product folder
gulp.task('copy-bootstrap', function(){
    gulp.src('app/styles/material.min.css')
        .pipe(gulp.dest('./dist/styles'));
});

//concat scripts
gulp.task('concat-scripts', function(){
    gulp.src('scripts/**/*.js')
        .pipe(concat('all.js'))
        .pipe(gulp.dest('app'));
});

//concat and minify
gulp.task('scripts-dist', function(){
    gulp.src('js/**/*.js')
        .pipe(sourcemaps.init())
        .pipe(concat('all.js'))
        .pipe(uglify())
        .pipe(gulp.dest('./dist/js'));
});

//create production version
gulp.task('create-production', ['copy-html', 'copy-bootstrap', 'styles', 'scripts-dist', 'scripts']);

//browser sync
browserSync.init({
    server: "./dist"
});
browserSync.stream();
