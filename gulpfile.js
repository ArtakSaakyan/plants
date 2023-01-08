const {src, dest, parallel, series, watch} = require('gulp')
const browserSync = require('browser-sync').create()
const sass = require('gulp-sass')(require('sass'))
const fileInclude = require('gulp-file-include')
const rename = require('gulp-rename')
const replace = require('gulp-replace')
const clean = require('gulp-clean')
const cheerio = require('gulp-cheerio')
const ttf2woff = require('gulp-ttf2woff')
const ttf2woff2 = require('gulp-ttf2woff2')
const svgMin = require('gulp-svgmin')
const svgSprite = require('gulp-svg-sprite')
const imageMin = require('gulp-imagemin')
const groupMediaQueries = require('gulp-group-css-media-queries')
const autoprefixer = require('gulp-autoprefixer')
const cleanCss = require('gulp-clean-css')
const uglify = require('gulp-uglify-es').default
const sourceMaps = require('gulp-sourcemaps')

const way = './'
const path = {
  src: {
    favicon: way + 'app/favicons/*',
    fonts: way + 'app/fonts/*.+(ttf|otf)',
    css: way + 'app/main.scss',
    js: way + 'app/main.js',
    html: way + 'app/**/*.html',
    img: way + 'app/images/**/*.+(jpg|png)',
    svg: way + 'app/images/**/*.svg',
    icons: way + 'app/icons/*.svg',
  },
  build: {
    favicon: way + 'assets/favicons/',
    fonts: way + 'assets/fonts',
    css: way + 'assets/css',
    js: way + 'assets/js',
    html: way + '',
    img: way + 'assets/img',
    icons: way + 'assets/sprites',
  },
  watch: {
    css: way + 'app/**/*.+(sass|scss|css)',
    js: way + 'app/**/*.js',
    html: way + 'app/**/*.html',
    img: way + 'app/images/**/*.+(jpg|png|svg)',
    icons: way + 'app/icons/*.svg',
  },
  vendor: {
    css: [
      'node_modules/normalize.css/normalize.css',
      'node_modules/slick-slider/slick/slick.css',
      'node_modules/swiper/swiper-bundle.css',
    ],
    js: [
      'node_modules/jquery/dist/jquery.min.js',
      'node_modules/jquery/dist/jquery.min.js.map',
      'node_modules/slick-slider/slick/slick.min.js',
      'node_modules/swiper/swiper-bundle.js',
      'node_modules/swiper/swiper-bundle.js.map',
      'node_modules/imask/dist/imask.min.js',
      'node_modules/imask/dist/imask.min.js.map',
    ],
  }
}

function vendorJS() {
  return src(path.vendor.js, {allowEmpty: true})
    .pipe(dest(path.build.js))
}

function vendorCSS() {
  return src(path.vendor.css, {allowEmpty: true})
    .pipe(dest(path.build.css))
}

function browser_sync() {
  browserSync.init({
    server: {
      baseDir: way,
    },
    notify: false,
  })
}

function startWatch() {
  watch(path.watch.html, series(html, cleanTemplates))
  watch(path.watch.icons, series(svgSprites, cleanSprites))
  watch(path.watch.css, styles)
  watch(path.watch.js, scripts)
  watch(path.watch.img, images)
}

function favicon() {
  return src(path.src.favicon)
    .pipe(dest(path.build.favicon))
}

function fontsWoff() {
  return src(path.src.fonts)
    .pipe(ttf2woff())
    .pipe(dest(path.build.fonts))
}

function fontsWoff2() {
  return src(path.src.fonts)
    .pipe(ttf2woff2())
    .pipe(dest(path.build.fonts))
}

function styles() {
  return src(path.src.css)
    .pipe(sourceMaps.init())
    .pipe(sass())
    .pipe(groupMediaQueries())
    .pipe(autoprefixer())
    .pipe(dest(path.build.css))
    .pipe(cleanCss())
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(sourceMaps.write('./'))
    .pipe(dest(path.build.css))
    .pipe(browserSync.stream())
}

function scripts() {
  return src(path.src.js)
    .pipe(sourceMaps.init())
    .pipe(fileInclude())
    .pipe(dest(path.build.js))
    .pipe(uglify())
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(sourceMaps.write('./'))
    .pipe(dest(path.build.js))
    .pipe(browserSync.stream())
}

function html() {
  return src(path.src.html)
    .pipe(fileInclude())
    .pipe(dest(path.build.html))
    .pipe(browserSync.stream())
}

function images() {
  return src(path.src.img)
    .pipe(imageMin([
      imageMin.mozjpeg({quality: 75, progressive: true}),
      imageMin.optipng({optimizationLevel: 5}),
    ],
      {
        verbose: true,
      }))
    .pipe(dest(path.build.img))
    .pipe(browserSync.stream())
}

function svg() {
  return src(path.src.svg)
    .pipe(dest(path.build.img))
    .pipe(browserSync.stream())
}

function svgSprites() {
  return src(path.src.icons)
    .pipe(svgMin({
      js2svg: {
        pretty: true,
        indent: 2,
      },
      plugins: [{
        cleanupIDs: {
          minify: true,
        },
      }],
    }))
    .pipe(cheerio({
      run: function ($) {
        //$('[fill]').removeAttr('fill');
        //$('[stroke]').removeAttr('stroke');
        //$('[style]').removeAttr('style');
        $('[xmlns]').removeAttr('xmlns')
      },
      parserOptions: {
        xmlMode: true,
      },
    }))
    .pipe(replace('&gt;', '>'))
    .pipe(svgSprite({
      mode: {
        symbol: {
          sprite: "../icons.svg",
          example: true,
        },
      },
      svg: {
        xmlDeclaration: false,
      },
    }))
    .pipe(dest(path.build.icons))
    .pipe(browserSync.stream())
}

function cleanSprites() {
  return src('assets/sprites/symbol/', {allowEmpty: true})
    .pipe(clean())
}

function cleanTemplates() {
  return src('templates/', {allowEmpty: true})
    .pipe(clean())
}

function cleanAll() {
  return src(['templates/', 'assets/*'], {allowEmpty: true})
    .pipe(clean())
}

exports.vendorJS = vendorJS
exports.vendorCSS = vendorCSS
exports.browser_sync = browser_sync
exports.favicon = favicon
exports.fontsWoff = fontsWoff
exports.fontsWoff2 = fontsWoff2
exports.svgSprites = svgSprites;
exports.html = html
exports.images = images;
exports.svg = svg;
exports.styles = styles
exports.scripts = scripts
exports.cleanAll = cleanAll;
exports.cleanSprites = cleanSprites;
exports.cleanTemplates = cleanTemplates;

exports.build = series(cleanAll, vendorJS, vendorCSS, favicon, styles, scripts, html, svgSprites, fontsWoff, fontsWoff2, images, svg, cleanTemplates, cleanSprites)
exports.default = parallel(browser_sync, startWatch)
