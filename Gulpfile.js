var gulp       = require('gulp');
var browserify = require('browserify');
var reactify   = require('reactify');
var watchify   = require('watchify');
var source     = require('vinyl-source-stream');
var gutil      = require('gulp-util');

function buildScript(watch) {

    // ErrorHandler
    function errorHandler(error) {
        gutil.log(gutil.colors.red('Error: ' + error));
    }

    // Bundle
    function createBundle(instance) {
        return instance.bundle()
        .on('error', errorHandler)
        .pipe(source('app.js'))
        .on('error', errorHandler)
        .pipe(gulp.dest('./public/'));
    }

    // Browserify options setup
    var props = {
        entries: './app/js/main.js',
        debug: true,
        transform: [reactify]
    };
   
    if(watch){
        props.cache = {};
        props.packageCache = {};
    }

    // Browerify and Watchify Instances
    var browserifyInstance = browserify(props);
    var watchifyInstance = null;
    if(watch){
        watchifyInstance = watchify( browserifyInstance );
        watchifyInstance.on('update', function(ids) {
            createBundle(watchifyInstance);
            gutil.log(gutil.colors.green('Updated: ' + ids));
        });
    }

    return createBundle(browserifyInstance);
}

gulp.task('build', function() {
    return buildScript(false);
});

gulp.task('watch', function() {
    return buildScript(true);
});

gulp.task('default', ['watch']);