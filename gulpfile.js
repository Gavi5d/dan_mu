
// grab our gulp packages
var gulp = require("gulp");
var sourcemaps = require("gulp-sourcemaps");
var sass = require("gulp-sass");
var browserSync = require("browser-sync");
var eslint = require("gulp-eslint");

gulp.task("default", ["watch", "browser-sync"]);

gulp.task("browser-sync", function () {
    browserSync.init({
        server: "./"
    })
});

gulp.task("eslint", function () {
    return gulp.src("main.js")
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(eslint.failAfterError());
});

gulp.task("build-css", function () {
    return gulp.src("main.scss")
        .pipe(sourcemaps.init())
        .pipe(sass())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest("/"));
});

gulp.task("watch", function () {
    gulp.watch("main.js", ["eslint"]);
    gulp.watch("main.scss", ["build-css"]);
    gulp.watch(["main.js", "main.css", "index.html"]).on("change", browserSync.reload);
});
