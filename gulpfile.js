const {src, dest, series, watch} = require('gulp')
const sass = require('gulp-sass')
const csso = require('gulp-csso')
const fileinclude = require('gulp-file-include')
const htmlmin = require('gulp-htmlmin')
const del = require('del')
// const concat = require('gulp-concat')
const autoprefixer = require('gulp-autoprefixer')
const sourcemaps = require('gulp-sourcemaps')
const uglify = require('gulp-uglify-es').default
const rename = require('gulp-rename')
const sync = require('browser-sync').create()

function html_build() {
  return src('src/**.html')
      .pipe(fileinclude({
        prefix: '@@'
      }))
      .pipe(htmlmin({
        collapseWhitespace: true // убрать пробелы
      }))
      .pipe(dest('dist'))
      .pipe(sync.reload({stream: true}))
}

function scss_build() {
  return src('src/scss/**.scss')
      .pipe(sourcemaps.init())
      .pipe(sass())
      .pipe(autoprefixer({
        overrideBrowserslist: ['last 2 versions']
      }))
      .pipe(csso())
      .pipe(rename((path) => path.extname = '.min.css'))
      .pipe(sourcemaps.write())
      .pipe(dest('dist/static/css/'))
      .pipe(sync.reload({stream: true}))
}

function js_build() {
  return src('src/js/**.js')
      .pipe(fileinclude({
        prefix: '//' // Чтобы не ругался linter
      }))
      .pipe(sourcemaps.init())
      .pipe(uglify())
      .pipe(rename((path) => path.extname = '.min.js'))
      .pipe(sourcemaps.write())
      .pipe(dest('dist/static/js/'))
      .pipe(sync.reload({stream: true}))
}

function img_build() {
  return src('src/img/**/**.*')
      .pipe(dest('dist/static/img/'))
      .pipe(sync.reload({stream: true}))
}

function fonts_build() {
  return src('src/fonts/**/**.*')
      .pipe(dest('dist/static/fonts/'))
      .pipe(sync.reload({stream: true}))
}

function clear() {
  return del('dist')
}

function serve() {
  sync.init({
    server: './dist'
  })

  watch('src/**/**.html', series(html_build))
  watch('src/**/**.scss', series(scss_build))
  watch('src/**/**.js', series(js_build))
  watch('src/img/**/**.*', series(img_build))
  watch('src/fonts/**/**.*', series(fonts_build))
}


exports.build = series(clear, scss_build, js_build, img_build, fonts_build, html_build)
exports.serve = series(clear, scss_build, js_build, img_build, fonts_build, html_build, serve)
exports.clear = clear