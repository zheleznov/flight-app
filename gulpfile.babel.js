import gulp from 'gulp';
import sass from 'gulp-sass'; //sass compiler
import autoprefixer from 'gulp-autoprefixer'; //add autoprefixes to styles
import uglify from 'gulp-uglify'; //minify scripts
import sourcemaps from 'gulp-sourcemaps';
import browserify from 'browserify';
import babelify from 'babelify';
import buffer from 'vinyl-buffer';
import source from 'vinyl-source-stream';
import concat from 'gulp-concat';

var browserSync = require('browser-sync').create(); //browser sync

gulp.task('default', ['styles', 'copy-html', 'copy-css', 'copy-fonts', 'copy-lib-scripts', 'service-worker', 'scripts'], ()=> {
    gulp.watch('app/sass/**/*.scss', ['styles']);
    gulp.watch('app/scripts/**/*.js', ['scripts']);
    gulp.watch('app/index.html', ['copy-html']);
    gulp.watch('app/index.html').on('change', browserSync.reload);
    gulp.watch('app/scripts/**/*.js').on('change', browserSync.reload);

    gulp.watch('app/sw.js', ['service-worker']);
});

//run sass with autoprefixer
gulp.task('styles', ()=> {
    gulp.src('app/sass/**/*.scss')
        .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
        .pipe(autoprefixer({
            browsers: ['last 2 versions']
        }))
        .pipe(gulp.dest('dist/styles'))
        .pipe(gulp.dest('app/styles'))
});

//copy index.html to product
gulp.task('copy-html', ()=> {
    gulp.src('app/index.html')
        .pipe(gulp.dest('dist'));
});

//copy css libs to product
gulp.task('copy-css', ()=> {
    gulp.src('app/styles/*.css')
        .pipe(concat('libs.css'))
        .pipe(gulp.dest('dist/styles'))
        .pipe(gulp.dest('app/styles'));
});

//copy font
gulp.task('copy-fonts', ()=> {
    gulp.src('app/font/**/*.*')
        .pipe(gulp.dest('dist/font'));
});

//service worker
gulp.task('service-worker', ()=> {
    var bundler = browserify({
        entries: 'app/sw.js',
        debug: true
    });
    bundler.transform(babelify);

    bundler.bundle()
        .on('error', function (err) {
            console.error(err);
        })
        .pipe(source('sw.js'))
        .pipe(buffer())
        .pipe(sourcemaps.init({loadMaps: true}))
        .pipe(uglify()) // Use any gulp plugins you want now
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('dist'));
});

//scripts task
gulp.task('scripts', ()=> {
    var bundler = browserify({
        entries: 'app/scripts/main.js',
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


//copy libs scripts to product folder
gulp.task('copy-lib-scripts', ()=> {
    //gulp.src('app/scripts/libs/*')
    //.pipe(gulp.dest('dist/scripts/libs'));
    gulp.src(['app/scripts/libs/jquery.min.js', 'app/scripts/libs/jquery-ui.min.js',
            'app/scripts/libs/materialize.min.js', 'app/scripts/libs/react.min.js',
            'app/scripts/libs/react-dom.min.js', 'app/scripts/libs/firebase.js'])
        .pipe(concat('libs.js'))
        .pipe(gulp.dest('dist/scripts'))
        .pipe(gulp.dest('app/scripts'))
});

//browser sync
browserSync.init({
    server: "dist"
});
browserSync.stream();
