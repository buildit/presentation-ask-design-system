const path = require('path');
const gulp = require('gulp');
const del = require('del');
const sass = require('gulp-sass');

function absPath(relativePath){
  return path.resolve(__dirname, relativePath);
}

const paths = {
  dist: absPath('dist/'),
  reveal: {
    base: absPath('node_modules/reveal.js/')
  },
  sass: {
    src: absPath('src/sass/style.scss')
  }
}
paths.reveal.cssFile = path.resolve(paths.reveal.base, 'css/reveal.css'),
paths.reveal.jsGlob = path.resolve(paths.reveal.base, 'js/**/*'),
paths.reveal.libGlob = path.resolve(paths.reveal.base, 'lib/**/*'),
paths.reveal.pluginGlob = path.resolve(paths.reveal.base, 'plugin/**/*'),
paths.reveal.sassThemeBase = path.resolve(paths.reveal.base, 'css/theme/')



// Nuke build dir
gulp.task('clean', function(){
  return del(path.resolve(paths.dist, '**/*'));
});



// Copy HTML to output
gulp.task('html', function(){
  return gulp.src(absPath('src/index.html'))
    .pipe(gulp.dest(paths.dist));
});

// Copy Reveal.js stuff output
gulp.task('reveal', function(){
  return gulp.src([
    paths.reveal.cssFile,
    paths.reveal.jsGlob,
    paths.reveal.libGlob,
    paths.reveal.pluginGlob
  ], {
    base: paths.reveal.base,
  })
    .pipe(gulp.dest(path.resolve(paths.dist, 'reveal/')));
});

// Compile SASS
gulp.task('sass', function(){
  return gulp.src(paths.sass.src)
    .pipe(sass({
      includePaths: [paths.reveal.sassThemeBase]
    }))
    .pipe(gulp.dest(paths.dist));
});


gulp.task('default', gulp.series('clean', gulp.parallel('html', 'sass', 'reveal')));
