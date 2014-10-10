var gulp = require('gulp');
var clean = require('gulp-clean');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var less = require('gulp-less');
var minifyHTML = require('gulp-minify-html');
var templateCache = require('gulp-angular-templatecache');
var concatCss = require('gulp-concat-css');
var minifyCss = require('gulp-minify-css')
var path = require('path');
var inject = require("gulp-inject");

var settings = {
    "less" : ["app/global/reset.css", "app/**/*.less"],
    "js" : {
        "vendor" : ["./src/js/vendor/**/*.js"],
        "app" : ["app/**/*.js"]
    },
    "images": "app/images/*.*",
    "html": "app/**/*.html",
    "build": "./www/"
};

gulp.task('clean', function(){
    gulp.src([settings.build], {read: false})
        .pipe(clean({force: true}));
});

gulp.task('vendor', function() {
    gulp.src([
        "bower_components/jquery/dist/jquery.min.js",
        "bower_components/angular/angular.min.js",
        "bower_components/angular-route/angular-route.min.js",
        "bower_components/angular-animate/angular-animate.min.js",
        "bower_components/alertify/alertify.js",
        ])
        .pipe(concat('vendor.js'))
        .pipe(uglify())
        .pipe(gulp.dest(settings.build))
});

gulp.task('js', function() {
    gulp.src(settings.js.app)
        .pipe(concat('global.js'))
        .pipe(uglify())
        .pipe(gulp.dest(settings.build))
});

gulp.task('less', function(){
    gulp.src(settings.less)
        .pipe(less({
            paths: [ path.join(__dirname, 'less', 'includes') ],
            compress: true
        }))
        .pipe(concatCss('global.css'))
        .pipe(minifyCss())
        .pipe(gulp.dest(settings.build))
});

gulp.task('images', function(){
    gulp.src(settings.images)
        .pipe(gulp.dest(settings.build + 'images'))
});

gulp.task('html', function(){
    gulp.src(settings.html)
        // .pipe(minifyHTML())
        .pipe(templateCache('templates.js'))
        .pipe(gulp.dest(settings.build))
});

gulp.task('index', function(){
    var sources = gulp.src(['./www/vendor.js', './www/global.js', './www/templates.js', './www/global.css'], {read: false});

    return gulp.src('app/index.html')
        .pipe(inject(sources, {
            ignorePath: '/www/',
            addRootSlash: false
        }))
        .pipe(gulp.dest(settings.build))
});

// gulp.task('watch', ['less'], function() {
//     gulp.watch('app/**/*.less', ['less', 'css']);
// });

gulp.task('default', ['vendor', 'js', 'less', 'images', 'html', 'index']);
