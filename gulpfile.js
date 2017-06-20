let gulp = require('gulp');
let sass = require('gulp-sass');
let browserSync = require('browser-sync');
let reload = browserSync.reload;

let SOURCEPATHS = {
	sassSource : 'src/scss/*.scss'
}
let APPPATH = {
	root: 'app/',
	css:'app/css',
	js:'app/js'
}

gulp.task('sass', function(){
	return gulp.src(SOURCEPATHS.sassSource)
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

gulp.task('watch', ['serve', 'sass'], function() {
	gulp.watch([SOURCEPATHS.sassSource], ['sass']);
});

gulp.task('default', ['watch']);