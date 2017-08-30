const path = require('path');
const gulp = require('gulp');
const sass = require('gulp-sass');

function absPath(relativePath){
  return path.resolve(__dirname, relativePath);
}

const paths = {
  dist: absPath('dist/'),
  reveal: absPath('node_modules/reveal.js/')
}

// Copy HTML to output
gulp.task('html', function(){
  return gulp.src(absPath('src/index.html'))
    .pipe(gulp.dest(paths.dist));
});

// Copy Reveal.js stuff output
gulp.task('reveal', function(){
  return gulp.src([
    path.resolve(paths.reveal, 'js/**/*'),
    path.resolve(paths.reveal, 'lib/**/*'),
    path.resolve(paths.reveal, 'plugin/**/*')
  ], {
    base: paths.reveal,
  })
    .pipe(gulp.dest(path.resolve(paths.dist, 'reveal/')));
});

// Compile SASS
gulp.task('sass', function(){
  return gulp.src(absPath('src/sass/style.scss'))
    .pipe(sass())
    .pipe(gulp.dest(paths.dist));
});


gulp.task('default', gulp.parallel('html', 'sass', 'reveal'));
