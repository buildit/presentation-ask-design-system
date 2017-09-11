const path = require('path');
const gulp = require('gulp');
const del = require('del');
const sass = require('gulp-sass');
const browserSync = require('browser-sync').create();


function absPath(relativePath){
  return path.resolve(__dirname, relativePath);
}

const paths = {
  dist: absPath('dist/'),
  htmlFile: absPath('src/index.html'),
  imgGlob: absPath('src/images/**/*.{jpg,gif,png}'),
  reveal: {
    base: absPath('node_modules/reveal.js/')
  },
  sass: {
    srcGlob: absPath('src/sass/**/*.scss'),
    src: absPath('src/sass/style.scss')
  }
}
paths.reveal.cssFile = path.resolve(paths.reveal.base, 'css/reveal.css'),
paths.reveal.jsGlob = path.resolve(paths.reveal.base, 'js/**/*'),
paths.reveal.libGlob = path.resolve(paths.reveal.base, 'lib/**/*'),
paths.reveal.pluginGlob = path.resolve(paths.reveal.base, 'plugin/**/*'),
paths.reveal.sassThemeBase = path.resolve(paths.reveal.base, 'css/theme/')



// Nuke build dir
function cleanTask(){
  return del(path.resolve(paths.dist, '**/*'));
};



// Copy HTML to output
function htmlTask(){
  return gulp.src(paths.htmlFile)
    .pipe(gulp.dest(paths.dist));
};

// Copy images to output
function imageTask(){
  return gulp.src(paths.imgGlob)
    .pipe(gulp.dest(path.resolve(paths.dist, 'images')));
};


// Copy Reveal.js stuff output
function revealTask(){
  return gulp.src([
    paths.reveal.cssFile,
    paths.reveal.jsGlob,
    paths.reveal.libGlob,
    paths.reveal.pluginGlob
  ], {
    base: paths.reveal.base,
  })
    .pipe(gulp.dest(path.resolve(paths.dist, 'reveal/')));
};

// Compile SASS
function sassTask(){
  return gulp.src(paths.sass.src)
    .pipe(sass({
      includePaths: [paths.reveal.sassThemeBase]
    }))
    .pipe(gulp.dest(paths.dist))
    .pipe(browserSync.stream());
};


function reloadTask(done){
  browserSync.reload();
  done();
}


// Watch
function watchTask(){
  gulp.watch(
    paths.sass.srcGlob,
    { awaitWriteFinish: true },
    sassTask
  );

  gulp.watch(
    paths.htmlFile,
    { awaitWriteFinish: true },
    gulp.series(htmlTask, reloadTask)
  );

  gulp.watch(
    paths.imgGlob,
    { awaitWriteFinish: true },
    gulp.series(imageTask, reloadTask)
  );
};



// Serve build output via BrowserSync
function serveTask(done){
  browserSync.init({
    server: {
      baseDir: paths.dist
    }
  }, function(){
    done();
  });
}



gulp.task('default', gulp.series(cleanTask, gulp.parallel(htmlTask, sassTask, revealTask, imageTask)));

gulp.task('watch', gulp.series('default', watchTask));
gulp.task('serve', gulp.series('default', serveTask, watchTask));
