var gulp = require("gulp"),
  sass = require("gulp-sass"),
  browserSync = require("browser-sync"),
  browserify = require("browserify"),
  babel = require("gulp-babel"),
  del = require("del"),
  sourcemaps = require("gulp-sourcemaps"),
  source = require("vinyl-source-stream"),
  concat = require("gulp-concat"),
  cache = require("gulp-cache"),
  imagemin = require("gulp-imagemin"),
  autoprefixer = require("gulp-autoprefixer"),
  newer = require("gulp-newer"),
  uglify = require("gulp-uglify");

function browserSyncInit() {
  return browserSync.init({
    server: { baseDir: "src" },
    notify: false
  });
}

function styles() {
  return gulp
    .src("src/sass/**/*.sass")
    .pipe(sourcemaps.init())
    .pipe(sass({ outputStyle: "compressed" }).on("error", sass.logError))
    .pipe(
      autoprefixer({
        browsers: ["last 2 versions", "> 1%", "IE 8", "IE 9", "IE 10"],
        grid: true
      })
    )
    .pipe(concat("main.min.css"))
    .pipe(sourcemaps.write("./map"))
    .pipe(gulp.dest("src/css"))
    .pipe(browserSync.reload({ stream: true }));
}

function jsx() {
  return browserify("src/react/react.js")
    .transform("babelify", { presets: ["@babel/env", "@babel/react"] })
    .bundle()
    .pipe(source("react.js"))
    .pipe(gulp.dest("src/js"));
}

function scripts() {
  return gulp
    .src("src/**/*.js")
    .pipe(sourcemaps.init())
    .pipe(
      babel({
        presets: ["@babel/env", "@babel/react"]
      })
    )
    .pipe(concat("main.min.js"))
    .pipe(uglify())
    .pipe(sourcemaps.write("./map"))
    .pipe(gulp.dest("src/js"))
    .pipe(browserSync.stream());
}

function images() {
  return gulp
    .src("src/images/**/*.+(png|jpg|jpeg|gif|svg)")
    .pipe(newer("dist/images"))
    .pipe(
      cache(
        imagemin({
          interlaced: true,
          progressive: true,
          optimizationLevel: 5,
          svgoPlugins: [{ removeViewBox: true }]
        })
      )
    )
    .pipe(gulp.dest("dist/images"));
}

function clean(cb) {
  del.sync("dist");
  cb();
}

function build(cb) {
  gulp.src("src/css/main.min.css").pipe(gulp.dest("dist/css"));
  gulp.src("src/js/main.min.js").pipe(gulp.dest("dist/js"));
  gulp.src("src/index.html").pipe(gulp.dest("dist"));
  cb();
}

function watch() {
  gulp.watch("src/*.html", browserSync.reload);
  gulp.watch("src/sass/**/*.sass", sass);
  gulp.watch("src/react/**/*.js", gulp.series(jsx, browserSync.reload));
  gulp.watch("src/js/**/*.js", browserSync.reload);
}

gulp.task("browserSyncInit", browserSyncInit);
gulp.task("styles", styles);
gulp.task("jsx", jsx);
gulp.task("scripts", scripts);
gulp.task("images", images);
gulp.task("clean", clean);
gulp.task("build", gulp.series(clean, images, styles, scripts, build));
gulp.task("watch", watch);
