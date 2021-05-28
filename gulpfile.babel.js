import del from "del";
import gulp from "gulp";
import sass from "gulp-sass";
import autoprefixer from "gulp-autoprefixer";
import minifyCSS from "gulp-csso";
import bro from "gulp-bro";
import babel from "babelify";
import uglify from "uglifyify";

const clean = () => del(["src/static"]);

const paths = {
  styles: {
    src: "assets/scss/styles.scss",
    dest: "src/static/styles",
    watch: "assets/scss/**/*.scss",
  },
  js: {
    src: "assets/js/main.js",
    dest: "src/static/js",
    watch: "assets/js/**/*.js",
  },
};

const styles = () =>
  gulp
    .src(paths.styles.src)
    .pipe(sass())
    .pipe(autoprefixer({ cascade: false }))
    .pipe(minifyCSS())
    .pipe(gulp.dest(paths.styles.dest));

const js = () =>
  gulp
    .src(paths.js.src)
    .pipe(
      bro({
        transform: [
          babel.configure({ presets: ["@babel/preset-env"] }),
          [uglify, { global: true }],
        ],
      })
    )
    .pipe(gulp.dest(paths.js.dest));

const watchFiles = () => gulp.watch(paths.styles.watch, styles);

const dev = gulp.series([clean, styles, js, watchFiles]);

export default dev;
