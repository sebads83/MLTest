//*********** IMPORTS *****************
var gulp 		= require('gulp');
var gutil 		= require('gulp-util');
var	concat 		= require('gulp-concat');
var sass 		= require('gulp-ruby-sass');
var sourcemaps  = require('gulp-sourcemaps');
var rename 		= require("gulp-rename");
var uglify 		= require("gulp-uglify");
var minifyHTML 	= require('gulp-minify-html');
var	watch 		= require('gulp-watch');

gulp.task('autoprefixer', function () {
    var postcss      = require('gulp-postcss');
    var autoprefixer = require('autoprefixer');

    return gulp.src('css/**/*.css')
        .pipe(sourcemaps.init())
        .pipe(postcss([ autoprefixer({ browsers: ['last 2 versions'] }) ]))
        .pipe(sourcemaps.write('./maps', {addComment: false}))
        .pipe(gulp.dest('css'));
});

//** Sass para DEV

gulp.task('sass', function(){
  	return sass('scss/*.scss', {
	  		style: 'expanded',
	  		emitCompileError: true
	  	})
  		.on('error', sass.logError)
    	.pipe(gulp.dest('css'));
});


//** Sass para PROD

//**  gulp.task('sass', function(){
//**    	return sass('scss/min/styles.scss', {
//**    			style: 'compressed',
//**  	  		emitCompileError: true
//**  	  	})
//**    		.on('error', sass.logError)
//**      	.pipe(gulp.dest('css/min'));
//**  });


gulp.task('scripts', function(){
	return gulp.src('js/*.js')
		.pipe(sourcemaps.init())
        .pipe(concat('concat.js'))
        .pipe(gulp.dest('tmp'))
        .pipe(rename('app.js'))
        .pipe(uglify())
        .pipe(sourcemaps.write('./maps', {addComment: false}))
        .pipe(gulp.dest('js/min'));
});

gulp.task('html', function(){
	return gulp.src('index_expanded.html')
        .pipe(rename('index.html'))
        .pipe(uglify())
        .pipe(gulp.dest('./'));
});

gulp.task('minify-html', function() {
  var opts = {
    conditionals: true,
    spare:true
  };
 
  return gulp.src('./index_expanded.html')
    .pipe(minifyHTML(opts))
    .pipe(rename('index.html'))
    .pipe(gulp.dest('./'));
});

gulp.task('watch', function(){
	gulp.watch('scss/**/*.scss', ['sass']);
	gulp.watch('css/**/*.css', ['autoprefixer']);
	gulp.watch('js/**/*.js', ['scripts']);
	gulp.watch('index_expanded.html', ['minify-html']);
});

gulp.task('default', ['sass', 'watch', 'scripts', 'minify-html']);