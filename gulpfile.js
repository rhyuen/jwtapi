const gulp = require("gulp");
const browserSync = require("browser-sync").create();
const esLint = require("gulp-eslint");
const del = require("del");
const imagemin = require("gulp-imagemin");


gulp.task("lint", () => {
  return gulp.src([
    "server.js",
    "routes.js",
    "./public/src/**/*.jsx",
    "test/**/*.js"
  ])
    .pipe(esLint())
    .pipe(esLint.format());
});

gulp.task("imagemin", () => {

});


gulp.task("default", () => {

});
