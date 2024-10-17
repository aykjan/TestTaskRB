// Подключение модулей
import gulp from 'gulp';
import dartSass from 'gulp-dart-sass';  // Используем gulp-dart-sass
import cleanCSS from 'gulp-clean-css';
import uglify from 'gulp-uglify';
import concat from 'gulp-concat';
import autoprefixer from 'gulp-autoprefixer';
import sourcemaps from 'gulp-sourcemaps';
import browserSync from 'browser-sync';
import imagemin from 'gulp-imagemin';


const bs = browserSync.create();


const paths = {
    scss: './src/scss/**/*.scss',
    js: './src/js/**/*.js',
    images: './src/images/**/*',
    html: './src/*.html',
    fonts: './src/fonts/**/*'
};

// Компиляция SCSS, минификация и автопрефиксы
gulp.task('styles', function () {
    return gulp.src(paths.scss)
        .pipe(sourcemaps.init()) // Инициализация sourcemaps
        .pipe(dartSass().on('error', dartSass.logError)) // Компиляция SCSS
        .pipe(autoprefixer({ cascade: false })) // Автопрефиксы
        .pipe(cleanCSS()) // Минификация CSS
        .pipe(sourcemaps.write('.')) // Запись sourcemaps
        .pipe(gulp.dest('./dist/css')) // Выгрузка файлов в папку dist
        .pipe(bs.stream()); // Обновление браузера
});


gulp.task('scripts', function () {
    return gulp.src('./src/js/main.js') // Только главный файл
        .pipe(sourcemaps.init()) // Инициализация sourcemaps
        .pipe(uglify()) // Минификация JS
        .pipe(sourcemaps.write('.')) // Запись sourcemaps
        .pipe(gulp.dest('./dist/js')) // Выгрузка файлов в папку dist
        .pipe(bs.stream()); // Обновление браузера
});

// Копирование компонентов в папку dist
gulp.task('copy-js-components', function () {
    return gulp.src('./src/js/components/*.js') 
        .pipe(gulp.dest('./dist/js/components'));
});




// Оптимизация изображений
gulp.task('images', function () {
    return gulp.src(paths.images)
        .pipe(imagemin()) // Оптимизация изображений
        .pipe(gulp.dest('./dist/images'));
});

gulp.task('fonts', function() {
    return gulp.src(paths.fonts) 
      .pipe(gulp.dest('dist/fonts')); 
  });

// Копирование HTML
gulp.task('html', function () {
    return gulp.src(paths.html)
        .pipe(gulp.dest('./dist'))
        .pipe(bs.stream()); // Обновление браузера
});

// Watch и BrowserSync
gulp.task('serve', function () {
    bs.init({
        server: {
            baseDir: './dist',
            middleware: function (req, res, next) {
                res.setHeader('Access-Control-Allow-Origin', '*'); // Разрешение CORS
                res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
                res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
                res.setHeader('Access-Control-Allow-Credentials', true); // Если требуется поддержка cookie
                next();
            }
        },
         // Включаем HTTPS
    });

    gulp.watch(paths.scss, gulp.series('styles'));
    gulp.watch(paths.js, gulp.series('scripts'));
    gulp.watch('./src/js/components/*.js', gulp.series('copy-js-components'))
    gulp.watch(paths.images, gulp.series('images'));
    gulp.watch(paths.html, gulp.series('html'));
});

// Задача по умолчанию (стартовая)
gulp.task('default', gulp.series('styles', 'scripts', 'copy-js-components', 'images', 'fonts', 'html', 'serve'));

