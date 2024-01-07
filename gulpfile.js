"use strict";

// Load plugins
const autoprefixer = require("autoprefixer");
// const browsersync = require("browser-sync").create();
const cssnano = require("cssnano");
const concat = require('gulp-concat');
const gulp = require("gulp");
const plumber = require("gulp-plumber");
const postcss = require("gulp-postcss");
const rename = require("gulp-rename");
var sass = require('gulp-sass')(require('sass'));
const livereload = require('gulp-livereload');
const notify = require('gulp-notify');
var uglify = require('gulp-uglify');
// var reload = browsersync.reload;

// == Browser-sync task
// gulp.task("browser-sync", function(done){
//   browsersync.init({
//     server: "./",
//     startPath: "page-templates/home-page.php", // After it browser running [File path set]
//     //    browser: 'chrome',
//     host: 'localhost',
//     //    port: 4000,
//     open: true,
//     tunnel: true 
//   });
//   gulp.watch(["./**/*.php"]).on("change", reload); // [File path set]
//   done(); 
// });
// == Browser-sync task

// CSS task
gulp.task("css", () => {
  return gulp
    .src("assets/scss/*.scss")
    .pipe(plumber())
    .pipe(sass({ outputStyle: "expanded" }))
    .pipe(rename({ suffix: ".min" }))
    .pipe(postcss([autoprefixer(), cssnano()]))
    .pipe(gulp.dest("public/css"))
    .pipe(notify({
          message: "main SCSS processed"
    }))
    // .pipe(browsersync.stream())
    .pipe(livereload())
});

// Webfonts task
gulp.task("webfonts", () => {
  return gulp
    .src("assets/webfonts/*.{ttf,woff,woff2,eot,svg}")
    .pipe(gulp.dest('./public/webfonts'));
});

// Transpile, concatenate and minify scripts
gulp.task("js", () => {
  return (
    gulp
      .src([
      'assets/js/*.js'
    ])
      .pipe(plumber())

      // folder only, filename is specified in webpack config
    //   .pipe(concat('app.js'))
      .pipe(uglify())
      .pipe(gulp.dest("public/js"))
    //   .pipe(browsersync.stream())
      .pipe(livereload())
  );
});

gulp.task("default", gulp.series( "css", "js", "webfonts", () => {
// gulp.task("default", gulp.series( "css", "js", "webfonts", "browser-sync", () => {
  livereload.listen();
  gulp.watch(["assets/scss/**/*"], gulp.series("css"));
  gulp.watch(["assets/js/**/*"], gulp.series("js"));
  gulp.watch(["assets/webfonts/*"], gulp.series("webfonts"));
}));


// npm init -y
// npm i gulp-cli -g
// npm i
// gulp

// npm i bootstrap@5.3.2