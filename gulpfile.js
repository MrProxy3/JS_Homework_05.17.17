const
	gulp = require("gulp"),
	sync = require("browser-sync").create(),
	plugins = require("gulp-load-plugins")({
		scope: ["devDependencies"]
	}),
	swallowError = function() {
		return plugins.plumber(function(error) {
			console.error("ERROR: " + error.message);
			this.emit('end');
		});
	},

	IS_DEVELOPMENT = true,
	DIST_DIR = "dist",
	CSS_DIST_DIR = DIST_DIR + "/css",
	JS_DIST_DIR = DIST_DIR + "/js",
	FONTS_DIST_DIR = DIST_DIR + "/fonts",
	IMAGES_DIST_DIR = DIST_DIR + "/images";

gulp.task("html", function () {
	return gulp.src("src/*.html")
		.pipe(gulp.dest(DIST_DIR));
});

gulp.task("css:app", function () {
	return gulp.src("src/styles/app.scss")
		.pipe(swallowError())
		.pipe(plugins.if(IS_DEVELOPMENT, plugins.sourcemaps.init()))
		.pipe(plugins.sass({
			outputStyle: 'compressed',
			includePaths: ['node_modules/susy/sass']
		}).on("error", plugins.sass.logError))
		.pipe(plugins.cssnano())
		.pipe(plugins.rename({suffix: ".min"}))
		.pipe(plugins.if(IS_DEVELOPMENT, plugins.sourcemaps.write()))
		.pipe(gulp.dest(CSS_DIST_DIR))
		.pipe(sync.stream());
});

gulp.task("css:vendor", function () {
	return gulp.src([
		"node_modules/bootstrap/dist/css/bootstrap.css",
		"node_modules/normalize.css/normalize.css",
		"node_modules/bxslider/dist/jquery.bxslider.css",
		"node_modules/font-awesome/css/font-awesome.css",
		"node_modules/lightbox2/dist/css/lightbox.css",
		"node_modules/slideout/index.css"
	])
		.pipe(swallowError())
		.pipe(plugins.if(IS_DEVELOPMENT, plugins.sourcemaps.init()))
		.pipe(plugins.if(!IS_DEVELOPMENT, plugins.cssnano()))
		.pipe(plugins.concat("vendor.min.css"))
		.pipe(plugins.if(IS_DEVELOPMENT, plugins.sourcemaps.write()))
		.pipe(gulp.dest(CSS_DIST_DIR))
		.pipe(sync.stream());
});

gulp.task("js:vendor", function() {
	return gulp.src([
		"node_modules/jquery/dist/jquery.js",
        "node_modules/bootstrap/dist/js/bootstrap.js",
		"node_modules/jquery.stellar/jquery.stellar.js",
		"node_modules/bxslider/dist/jquery.bxslider.js",
		"node_modules/tabslet/jquery.tabslet.js",
		"node_modules/slideout/dist/slideout.js",
		"node_modules/masonry-layout/dist/masonry.pkgd.min.js",
		"node_modules/lightbox2/dist/js/lightbox.js",
		"src/resources/js/*.js"
	])
		.pipe(swallowError())
		.pipe(plugins.if(IS_DEVELOPMENT, plugins.sourcemaps.init()))
		.pipe(plugins.concat("vendor.min.js"))
		.pipe(plugins.if(!IS_DEVELOPMENT, plugins.uglify()))
		.pipe(plugins.if(IS_DEVELOPMENT, plugins.sourcemaps.write()))
		.pipe(gulp.dest(JS_DIST_DIR));
});

gulp.task("fonts:app", function() {
	return gulp.src([
		"src/fonts/*"
	])
		.pipe(swallowError())
		.pipe(gulp.dest(FONTS_DIST_DIR));
});

gulp.task("fonts:vendor", function() {
	return gulp.src([
		"node_modules/bootstrap/dist/fonts/*",
		"node_modules/font-awesome/fonts/*"
	])
		.pipe(swallowError())
		.pipe(gulp.dest(FONTS_DIST_DIR));
});

gulp.task("images:app", function() {
	return gulp.src([
		"src/images/**/*.*",
		"node_modules/bxslider/dist/images/*",
		"node_modules/lightbox2/dist/images/*"
	])
		.pipe(swallowError())
		.pipe(plugins.if(!IS_DEVELOPMENT, plugins.imagemin()))
		.pipe(gulp.dest(IMAGES_DIST_DIR));
});

gulp.task("css", ["css:app", "css:vendor"]);
gulp.task("js", ["js:vendor"]);
gulp.task("assets", ["fonts:app", "fonts:vendor", "images:app"]);

gulp.task("build", ["html", "js", "css", "assets"]);

gulp.task("watch", ["build"], function () {
	sync.init({
		server: DIST_DIR
	});

	gulp.watch("src/**/*.html", ["html"]);
	gulp.watch("src/styles/**/*.scss", ["css:app"]);

	gulp.watch(DIST_DIR + "/*.html").on("change", sync.reload);
	gulp.watch(JS_DIST_DIR + "/*.js").on("change", sync.reload);
});

gulp.task("default", ["build", "watch"]);