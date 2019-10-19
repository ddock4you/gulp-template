import gulp from "gulp";
// import browserSync from "browser-sync";
import gpug from "gulp-pug";
import sass from "gulp-sass";
import autoprefixer from "gulp-autoprefixer";
import sourcemaps from "gulp-sourcemaps";
import cleanCss from "gulp-clean-css";

const browserSync =  require("browser-sync").create();
sass.compiler = require("node-sass");



const path = {
    pug: "src/template/pages/**/*.pug",
    dest: "./",
    sass: "sass/*.scss",
    css: "css/",
    js: "js/*.js",
    sub: "sub/sub.html",
    index: "index.html"
}

const pug = () => 
    gulp
    .src(path.pug)
    .pipe(gpug({ pretty: true }))
    .pipe(gulp.dest(path.dest));

const styles = () =>
    gulp
    .src(path.sass)
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer())
    .pipe(cleanCss({
        level: 0, // no optimizations
        format: {
            breaks: {
                afterRuleEnds: true // put a line break after every rule
            }
        }
    }))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(path.css))
    .pipe(browserSync.stream());
    
    
    const webServer = () => {
        browserSync.init({
            port: 7777,
            server: {
                baseDir: "./",
                // index:"index.html",
                // directory: true
            }
        });
    }
    
    
    const watch = () => {
        gulp.watch(path.js, reload);
        gulp.watch(path.index, reload);
        gulp.watch(path.sub, reload);
        gulp.watch(path.sass, styles).on('change', browserSync.reload);
    }

    const reload = (done) => {
        browserSync.reload();
        done();
    }
    

const live = gulp.parallel([webServer, watch]);
const build = gulp.series([styles, pug]);

export const dev = gulp.series([build, live]);