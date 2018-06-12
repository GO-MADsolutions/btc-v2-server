/**
 * Created by gpalani on 24-01-2018.
 */
"use strict";

let gulp = require('gulp');
let ts = require("gulp-typescript")
let nodemon = require("gulp-nodemon");
var     tsProject = ts.createProject('./tsconfig.json');
var filesToMove = [
    '**/*.html'
];
gulp.task("default", ["serve"]);
gulp.task('move', function(){
    // the base option sets the relative root for the set of files,
    // preserving the folder structure
    gulp.src(filesToMove, { base: 'template' })
        .pipe(gulp.dest('build/template'));
});
gulp.task("watch", () => {
    gulp.watch('src/**/*.ts', ["compile"]);
});

gulp.task('compile', function () {
    let tsResult= gulp.src("src/**/*.ts") // or tsProject.src()
        .pipe(tsProject())
    return tsResult.js.pipe(gulp.dest('build'));
});

gulp.task("serve", ["compile", "watch" ,"move"], () => {
    nodemon({
                script: "build/server.js",
                env: { "NODE_ENV": "development" }
            })
    .on("restart", () => {
    console.log("restarted");
})
})