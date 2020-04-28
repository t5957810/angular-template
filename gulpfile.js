var gulp = require('gulp');
var rename = require('gulp-rename');
const shell = require('gulp-shell')

gulp.task('prod', function () {
    console.log("build-prod")
    gulp.src("./")
    // .pipe(gulp.dest("./"))
        .pipe(shell(['echo 0. start']))
        .pipe(shell(['ng build --prod --configuration=prod --base-href https://t5957810.github.io/angular-ios-demo/']))
        .pipe(shell(['echo 1. finish build-----']));

    console.log("build-prod")
})