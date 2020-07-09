var gulp = require("gulp");
var sass = require("gulp-sass");
var del = require('del')
var postcss = require("gulp-postcss")
var autoprefixer = require("autoprefixer")
var cssnano = require("cssnano")
var sourcemaps = require("gulp-sourcemaps")
var browserSync = require("browser-sync").create();

function style() {
    return gulp
        .src('./sass/**/*.scss')
        .pipe(sourcemaps.init())
        .pipe(sass())
        .on('error', sass.logError)
        // Use postcss with autoprefixer and compress the compiled file using cssnano
        .pipe(postcss([autoprefixer(), cssnano()]))
        // Now add/write the sourcemaps
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('./css'))
        .pipe(browserSync.stream())
}

function clear() {
    return del('./css/**/*.css')
}

function reload() {
    browserSync.reload()
}

function watch() {

    browserSync.init({
        server: {
            baseDir: './'
        }
    })

    style()

    gulp.watch('./sass/**/*.scss', style)
    gulp.watch('./**/*.html').on('change', reload)
    gulp.watch('./js/**/*.js').on('change', reload)
}

exports.style = style;
exports.watch = watch;
exports.clear = clear;