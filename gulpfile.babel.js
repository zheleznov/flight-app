import gulp from 'gulp';
import sass from 'gulp-sass'; //sass compiler
import autoprefixer from 'gulp-autoprefixer'; //add autoprefixes to styles
import uglify from 'gulp-uglify'; //minify scripts
import sourcemaps from 'gulp-sourcemaps';
import browserify from 'browserify';
import babelify from 'babelify';
import buffer from 'vinyl-buffer';
import source from 'vinyl-source-stream';

var browserSync = require('browser-sync').create(); //browser sync

gulp.task('default', ['styles', 'copy-html', 'copy-bower', 'scripts'], ()=> {
    gulp.watch('app/sass/**/*.scss', ['styles']);
    gulp.watch('app/src/**/*.js', ['scripts']);
    gulp.watch('app/index.html', ['copy-html']);
    gulp.watch('app/index.html').on('change', browserSync.reload);
    gulp.watch('app/src/**/*.js').on('change', browserSync.reload);
});

//run sass with autoprefixer
gulp.task('styles', ()=> {
    gulp.src('app/sass/**/*.scss')
        .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
        .pipe(autoprefixer({
            browsers: ['last 2 versions']
        }))
        .pipe(gulp.dest('dist/styles'))
});

//copy index.html to product
gulp.task('copy-html', ()=> {
    gulp.src('app/index.html')
        .pipe(gulp.dest('dist'));
});

//scripts task
gulp.task('scripts', ()=> {
    var bundler = browserify({
        entries: 'app/src/main.js',
        debug: true
    });
    bundler.transform(babelify);

    bundler.bundle()
        .on('error', function (err) {
            console.error(err);
        })
        .pipe(source('main.js'))
        .pipe(buffer())
        .pipe(sourcemaps.init({loadMaps: true}))
        .pipe(uglify()) // Use any gulp plugins you want now
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('dist/scripts'));
});

//copy bower plugins to product folder
gulp.task('copy-bower', ()=> {
    gulp.src('bower_components/material-design-lite/material.min.css')
        .pipe(gulp.dest('dist/styles'));
    gulp.src('bower_components/material-design-lite/material.min.js')
        .pipe(gulp.dest('dist/scripts/lib'));
    gulp.src('bower_components/react/react.min.js')
        .pipe(gulp.dest('dist/scripts/lib'));
    gulp.src('bower_components/react/react-dom.min.js')
        .pipe(gulp.dest('dist/scripts/lib'));
});

//browser sync
browserSync.init({
    server: "dist"
});
browserSync.stream();
