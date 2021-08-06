var gulp = require('gulp'),
  gulpLoadPlugins = require('gulp-load-plugins'),
  path = {
    src: './src/',
    dist: './dist/',
  };

var plugins = gulpLoadPlugins({
  pattern: ['gulp-*', 'del'],
  replaceString: /\bgulp[\-.]/,
});

gulp.task('js', function() {
  gulp.watch(path.src + '*.js', ['js']);
  return gulp.src(path.src + '*.js')
    .pipe(plugins.concat('who-say.js'))
    .pipe(plugins.rename({ suffix: '.min' }))
    .pipe(plugins.uglify())
    .pipe(gulp.dest(path.dist))
    .pipe(plugins.notify({ message: 'scripts task finished!' }));
});

gulp.task('less', function() {
  gulp.watch(path.src + '*.less', ['less']);
  return gulp.src(path.src + '*.less')
      .pipe(plugins.less())
      .pipe(plugins.concatCss('who-say.css')) // name of concated css.
      .pipe(plugins.rename({ suffix: '.min' }))
      .pipe(plugins.minifyCss())
      .pipe(gulp.dest(path.dist));
});

gulp.task('image', function() {
  return gulp.src(path.src + 'img/*')
    .pipe(plugins.imagemin({ optimizationLevel: 3, progressive: true, interlaced: true }))
    .pipe(gulp.dest(path.dist + 'img'))
    .pipe(plugins.notify({ message: 'images compression finished!' }));
});

gulp.task('clean', function(cb) {
  del([path.dist], cb);
});

/**
  default task by 'gulp' and do less -> image -> js task
**/
gulp.task('default', ['less', 'image', 'js']);
