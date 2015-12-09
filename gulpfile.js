var gulp = require('gulp'),
  del = require('del'),
  copy = require('gulp-copy'),
  less = require('gulp-less'),
  LessPluginAutoPrefix = require('less-plugin-autoprefix'),
  autoprefix = new LessPluginAutoPrefix({ browsers: ["last 2 versions"] }),
  sourcemaps = require('gulp-sourcemaps'),
  wiredep = require('wiredep').stream,
  //usemin = require('gulp-usemin'),
  //uglify = require('gulp-uglify'),
  //minifyCss = require('gulp-minify-css'),
  useref = require('gulp-useref'),
  gulpif = require('gulp-if'),
  uglify = require('gulp-uglify'),
  livereload = require('gulp-livereload'),
  minifyCss = require('gulp-minify-css');


//concatenate & minify css, js
gulp.task('useref', function () {
    return gulp.src('build/*.html')
        .pipe(useref())
        .pipe(gulpif('*.js', uglify()))
        .pipe(gulpif('*.css', minifyCss()))
        .pipe(gulp.dest('dist'));
});
//concatenate & minify css, js


//cleaners
gulp.task('clean:build', function() {
  return del('./build');
});

gulp.task('clean:dist', function() {
  return del('./dist/');
});
//cleaners

//bower build
gulp.task('bower', ['clean:build'], function() {
  return gulp.src('./src/*.html')
    .pipe(wiredep({
        exclude: ['modernizr']
      }))
    .pipe(gulp.dest('./build/'))
});
//bower build

//less compilate
gulp.task('styles:build', ['clean:build'], function() {
  return gulp.src('./src/less/main.less')
    .pipe(less())
    .pipe(sourcemaps.write())
    .pipe(livereload())
    .pipe(gulp.dest('./build/css/'));
});
//less compilate

//gulp.task('usemin', function() {
//  return gulp.src('./build/*.html')
//    .pipe(usemin({
//      css: [minifyCss],
//      js: [uglify]
//    }))
//    .pipe(gulp.dest('./dist/'));
//});

//copy
gulp.task('copy:js', ['clean:build'], function() {
  return gulp.src('./src/js/**/*.js')
    .pipe(copy('./build/', {
        prefix: 1
      }));
});

gulp.task('copy:css', ['clean:build'], function() {
  return gulp.src('./src/css/*.css')
    .pipe(copy('./build/', {
        prefix: 1
      }));
});

gulp.task('copy:swf:build', ['clean:build'], function() {
  return gulp.src('./bower_components/**/*.swf')
    .pipe(copy('./build/swf/', {
        prefix: 3
      }));
});

gulp.task('copy:swf:dist', ['clean:dist'], function() {
  return gulp.src('./bower_components/**/*.swf')
    .pipe(copy('./dist/swf/', {
        prefix: 3
      }));
});

gulp.task('copy:fonts:build', ['clean:build'], function() {
  return gulp.src([
      './bower_components/font-awesome/fonts/*.{eot,svg,ttf,woff,woff2}',
      './bower_components/bootstrap/fonts/*.{eot,svg,ttf,woff,woff2}',
      './src/fonts/*.{eot,svg,ttf,woff,woff2}'
    ])
    .pipe(copy('./build/fonts/', {
        prefix: 3
      }));
});

gulp.task('copy:fonts:dist', ['clean:dist'], function() {
  return gulp.src([
      './bower_components/font-awesome/fonts/*.{eot,svg,ttf,woff,woff2}',
      './bower_components/bootstrap/fonts/*.{eot,svg,ttf,woff,woff2}',
      './src/fonts/*.{eot,svg,ttf,woff,woff2}'
    ])
    .pipe(copy('./dist/fonts/', {
        prefix: 3
      }));
});

gulp.task('copy:img:build', ['clean:build'], function() {
  return gulp.src('./src/img/**/*')
    .pipe(copy('./build/img/', {
        prefix: 2
      }));
});

gulp.task('copy:img:dist', ['clean:dist'], function() {
  return gulp.src('./src/img/**/*')
    .pipe(copy('./dist/img/', {
        prefix: 2
      }));
});
//copy


gulp.task('copy:build', ['copy:js', 'copy:css', 'copy:swf:build', 'copy:fonts:build', 'copy:img:build']);

gulp.task('build', ['clean:build', 'styles:build', 'bower', 'copy:build']);
gulp.task('default', ['build']);

gulp.task('watch', function() {
    gulp.watch('./src/js/**/*.js', ['default']);
    gulp.watch('./src/less/**/*.less', ['default'])
});