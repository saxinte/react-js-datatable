var gulp       = require('gulp');
var browserify = require('browserify');
var reactify   = require('reactify');
var watchify   = require('watchify');
var source     = require('vinyl-source-stream');
var gutil      = require('gulp-util');

function buildScript(watch) {

    var props = {
        entries: './app/js/main.js',
        debug: true,
        transform: [reactify]
    };

    // If watch requested, grab the browserify in watchify, otherwise just return a browserify instance
    var browserifyInstance = watch ? watchify( browserify(props) ) : browserify(props);

    function createBundle() {
        return browserifyInstance.bundle()
        .pipe(source('app.js'))
        .on('error', gutil.log)
        .pipe(gulp.dest('./public/'));
    }

    if(watch){
        browserifyInstance.on('update', function() {
            createBundle();
            gutil.log('Watch update');
        });
    }

    return createBundle();
}

gulp.task('build', function() {
    return buildScript(false);
});

gulp.task('watch', function() {
    return buildScript(true);
});

gulp.task('default', ['watch']);