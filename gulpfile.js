let gulp = require('gulp');
let sass = require('gulp-sass');
let browserSync = require('browser-sync');
let reload = browserSync.reload;
let autoprefixer = require('gulp-autoprefixer');
let clean = require('gulp-clean');
let concat = require('gulp-concat');

let SOURCEPATHS = {
	sassSource : 'src/scss/*.scss',
	htmlSource: 'src/*.html',
	jsSource: 'src/js/*.js'
}
let APPPATH = {
	root: 'app/',
	css:'app/css',
	js:'app/js'
}

gulp.task('sass', function(){
	return gulp.src(SOURCEPATHS.sassSource)
		   .pipe(autoprefixer())
		   .pipe(sass({outputStyle: 'expanded'}).on('error', sass.logError))
		   .pipe(gulp.dest(APPPATH.css));
});

gulp.task('serve', ['sass'], function(){
	browserSync.init([APPPATH.css + '/*.css', APPPATH.root + '/*.html', APPPATH.js + '/*.js'],
	{	server:{
			baseDir: APPPATH.root
		}
	})
});

//Cleaning any unwanted htnl and js files
gulp.task('cleanHtml', function(){
	gulp.src(APPPATH.root + "/*.html", {red: false, force:true})
		.pipe(clean());
});

gulp.task('cleanJs', function(){
	gulp.src(APPPATH.js + "/*.js", {red: false, force:true})
		.pipe(clean());
});

//compiling html and js files

gulp.task('compileHtml', ['cleanHtml'], function(){
	gulp.src(SOURCEPATHS.htmlSource)
		.pipe(gulp.dest(APPPATH.root))
});

gulp.task('compileJs', ['cleanJs'], function(){
	gulp.src(SOURCEPATHS.jsSource)
		.pipe(concat('main.js'))
		.pipe(gulp.dest(APPPATH.js))
});

gulp.task('watch', ['serve', 'sass', 'compileHtml', 'cleanHtml', 'compileJs', 'cleanJs'], function() {
	gulp.watch([SOURCEPATHS.sassSource], ['sass']);
	gulp.watch([SOURCEPATHS.htmlSource], ['compileHtml']);
	gulp.watch([SOURCEPATHS.jsSource], ['compileJs']);
});

gulp.task('default', ['watch']);