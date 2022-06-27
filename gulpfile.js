const gulp = require('gulp');
const rename = require('gulp-rename');
const sass = require('gulp-sass')(require('sass'));
const chokidar = require('chokidar');
const postcss    = require('gulp-postcss')
const sourcemaps = require('gulp-sourcemaps')
const autoprefixer = require('gulp-autoprefixer');

// style source/destination/watch
const styleSRC = './src/scss/**/*.scss';
const styleDIST = './dist/css/';
const styleWatch = './src/scss/**/*.scss';
// js source/destination
const jsSRC = './src/js/**/*.js';
const jsDIST = './dist/js/';
const jsWatch = './src/js/**/*.js';
//COMPILE SCSS TO CSS FILE

gulp.task('style', async () =>{
    gulp.src(styleSRC)
        .pipe(sourcemaps.init())
        .pipe(sass({
            errorLogToConsole: true,
            outputStyle: 'compressed',
        }))
        .pipe( sourcemaps.write('.') )
        .on('error', console.error.bind(console))
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest(styleDIST));
});

gulp.task('js', async () =>{
    gulp.src(jsSRC)
        .pipe(gulp.dest(jsDIST));
})

gulp.task('default',gulp.series(
    ['style', 'js',]
));

gulp.task('watch', gulp.parallel('default', () => {
    gulp.watch( styleWatch, gulp.series('style') );
    gulp.watch( jsWatch, gulp.series('js') );
    // Initialize watcher.
    const watcher = chokidar.watch([styleSRC,jsSRC], {
        //ignored: /(^|[\/\\])\../, // ignore dotfiles
        persistent: true
    });
    // Something to use when events are received.
    const log = console.log.bind(console);

    watcher
    .on('add', path => log(`File ${path} has been added`))
    .on('change',( path, event)  => log(`File ${path} has been changed -> ${event}`))
    .on('unlink', path => log(`File ${path} has been removed`));
}))


/*
gulp.task('watch', gulp.parallel('default', () => {
    gulp.watch( styleWatch, gulp.series('style') );
    gulp.watch( jsWatch, gulp.series('js') );
}));*/