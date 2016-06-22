//gulpfile 0.0.6
// 引入 gulp
var gulp = require('gulp'),
  del = require('del'),
  runSequence = require('run-sequence').use(gulp),
  bs = require('browser-sync').create(),
  reload = bs.reload,
  babel = require('gulp-babel'),
  argv = require('yargs').argv,
  production = !!argv.production, // true if --production flag is used;
  single = !!argv.single, // true if --single flag is used;
  development = !!argv.development, // true if --development flag is used;
  path = require('path'),
  cached = require('gulp-cached'),
  gulpif = require('gulp-if'),
  config = require('./config.json');

//
//配置项
//----------------------------------
var copyToLocation = '', //复制目的路径，用于复制到jats的svn，填写路径到vd目录即可，例：D:\\Code\\work\\vd_jats\\vd\\, 内层文件结构会自动补全
  ignoreFolder = 'less|css|temp|im.*|js|lib*?|inc|psd', //排除路径的文件夹地址;
  copyFiles = ''; //单个格式：/**/*.ttf, 多个格式: /**/*.+(ttf|wmv);用于fonts，sounds这种后缀名。
//#配置项

//路径
var cwd = process.cwd(),
  loc = {
    src: 'src',
    dev: 'tc_dev',
    dist: 'tc_idc'
  },
  workingDir, src, dist,
  isLottery,
  lotteryPath;

var reg = function (str) {
  return new RegExp('(\/|\\\\)(' + str + ').*', 'g');
};

if (reg(loc.src + '|' + loc.dev + '|' + loc.dist).test(cwd)) {
  isLottery = /(\/|\\)lottery\1v3\1/gm.test(cwd);
  lotteryPath = isLottery ? (cwd.match(/(\/|\\)(wx|m(qq)?)\1?/g) || '' ) : '';
  workingDir = path.normalize(cwd.replace(reg(loc.src + '|' + loc.dev + '|' + loc.dist), ''));
  src = path.normalize(workingDir + '/' + loc.src + lotteryPath);
  dist = path.normalize(workingDir + (development ? '/' + loc.dev : '/' + loc.dist) + lotteryPath);
} else {
  workingDir = path.normalize(cwd.replace(reg(ignoreFolder), ''));
  src = workingDir;
  dist = workingDir + '/dist';
}

process.chdir(workingDir);
console.log('src:', src);
console.log('dist:', dist);

var paths = {
  js: (config.js && config.js.length) ? config.js : (src + '/**/*.js'),
  images: (config.images && config.images.length) ? config.images : src + '/**/*.+(png|jpg|gif|svg)',
  css: (config.css && config.css.length) ? config.css : (config.cssConcat && config.cssConcat.length) ? config.cssConcat : (src + '/**/*.css'),
  less: (config.less && config.less.length) ? config.less.concat(['!/**/import.*.less', '!/**/import_*.less']) : [src + '/**/*.less', '!/**/import.*.less', '!/**/import_*.less'],
  // less: [src + '/**/css/*.less'],
  html: (config.html && config.html.length) ? config.html : [src + '/**/*.+(html|php)', '!' + src + '/**/inc/*.html']
};

//autoprefixer浏览器列表定义
var AUTOPREFIXER_BROWSERS = (config.autoprefixer && config.autoprefixer.length) ? config.autoprefixer : ['Android >= 2.3', 'Chrome > 20', 'iOS >= 6'];
// Lint JavaScript
/*var jshint = require('gulp-jshint');

gulp.task('jshint', function () {
  return gulp.src(paths.js)
    .pipe(reload({
      stream: true,
      once: true
    }))
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'))
    .pipe(gulpif(!bs.active, jshint.reporter('fail')));
});*/

/**
 * js压缩
 */
var uglify = require('gulp-uglify'),
  onError = function (err) {
    notify.onError({
      title: 'Gulp',
      subtitle: 'Failure!',
      message: 'Error: <%= error.message %>',
      sound: 'Beep'
    })(err);
  };

gulp.task('script', function () {
  var config = {
    mangle: false,
    compress: false,
    preserveComments: 'all',
    output: {
      indent_start: 0,
      width: 80,
      max_line_len: 4,
      space_colon: true,
      beautify: true,
      comments: true,
      semicolons: true
    }
  };
  return gulp.src(paths.js, {
      base: src
    })
    .pipe(gulpif(development, changed(dist, {
      extension: '.js'
    })))
    .pipe(gulpif(development, plumber({
      errorHandler: onError
    })))
    .pipe(gulpif(src + '/**/*.min.js', gulp.dest(dist)))
    .pipe(babel())
    .pipe(uglify(config))
    .pipe(gulp.dest(dist));
});

gulp.task('js-min', function () {
  return gulp.src([paths.js, '!/**/*.min.js'], {
      base: src
    })
    .pipe(babel())
    .pipe(uglify())
    .pipe(rename({
      extname: '.min.js'
    }))
    .pipe(gulp.dest(dist));
});

/**
 * 图片压缩
 * @type {[type]}
 */
// var image = require('gulp-image');
// gulp.task('image', function () {
//   return gulp.src(paths.images, {
//       base: src
//     })
//     .pipe(image({
//       pngquant: true,
//       optipng: false,
//       zopflipng: true,
//       advpng: true,
//       jpegRecompress: false,
//       jpegoptim: true,
//       mozjpeg: true,
//       gifsicle: true,
//       svgo: true
//     }))
//     .pipe(gulp.dest(dist));
// });

/**
 * 图片压缩
 */
var imagemin = require('gulp-imagemin'),
  // mozjpeg = require('imagemin-mozjpeg'),
  pngquant = require('imagemin-pngquant');

gulp.task('images', function () {
  return gulp.src(paths.images, {
      base: src
    })
    .pipe(cached('images'))
    .pipe(imagemin({
      interlaced: true,
      use: [
        pngquant({
          speed: 4
        }),
    // mozjpeg({
    //   quality: 80
    // })
      ]
    }))
    .pipe(gulp.dest(dist));
});

/**
 * html格式化
 */
var prettify = require('gulp-prettify');

gulp.task('prettify', function () {
  gulp.src(paths.html, {
      base: src
    })
    .pipe(cached('prettify'))
    .pipe(prettify({
      indent_size: 2,
      space_after_anon_function: true,
      brace_style: 'collapse',
      indent_char: ' ',
      preserve_newlines: true,
      // Whether existing line breaks before elements should be preserved (only works before elements, not inside tags or for text)
      // unformatted: ['a', 'span', 'img', 'code', 'pre', 'sub', 'sup', 'em', 'strong', 'b', 'i', 'u', 'strike', 'big', 'small', 'pre', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6'],
      unformatted: ['a', 'img', 'code', 'pre', 'sub', 'sup', 'em', 'strong', 'b', 'u', 'strike', 'big', 'small', 'pre', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6'],
      // List of tags that should not be reformatted
      indent_scripts: 'keep',
      // [keep|separate|normal]
      eol: '\n',
      indent_level: 0,
      indent_with_tabs: false,
      max_preserve_newlines: 10,
      jslint_happy: false,
      keep_array_indentation: false,
      keep_function_indentation: false,
      space_before_conditional: true,
      break_chained_methods: false,
      eval_code: false,
      unescape_strings: false,
      wrap_line_length: 0,
      wrap_attributes: 'auto',
      wrap_attributes_indent_size: 2,
      end_with_newline: false
    }))
    .pipe(gulp.dest(dist));
});

gulp.task('html', function () {
  runSequence('prettify', 'replace');
});

/* file include */
var fileinclude = require('gulp-file-include');

gulp.task('fileinclude', function () {
  gulp.src(src + '/**/inc/*.html')
    .pipe(cached('fileinclude'))
    .pipe(fileinclude())
    .pipe(gulp.dest(dist));
});

/**
 * bs
 */
// Start the server
gulp.task('bs', function () {
  var baseUrlLoc, files;
  if (development) {
    baseUrlLoc = [src, dist];
    files = [dist + '/**/*.+(html|js|css)', src + '/**/*.+(png|jpg|svg|gif)'];
  } else {
    baseUrlLoc = src;
    files = [paths.html, paths.images, paths.css, paths.js];
  }
  bs.init(files, {
    server: {
      baseDir: baseUrlLoc
    }
  });
});

gulp.task('sync', ['bs'], function () {
  gulp.start('less');

  if (single) {
    var watchList = paths.images.concat(paths.html);
    bs.watch(watchList).on('change', bs.reload);
  }

  if (development) {
    bs.watch('*.+(png|jpg|gif|svg)').on('change', bs.reload);

    watch(paths.js, function () {
      runSequence('script', reload);
    });

    watch(paths.html, function () {
      runSequence('fileinclude', 'prettify', reload);
    });
  }
});

/**
 * css
 */
var concat = require('gulp-concat'),
  postcss = require('gulp-postcss'),
  autoprefixer = require('autoprefixer'),
  plumber = require('gulp-plumber'),
  csswring = require('csswring');

var processors = [
  autoprefixer(AUTOPREFIXER_BROWSERS),
  csswring({
    preserveHacks: true,
    removeAllComments: true
  })
];

gulp.task('css-concat', function () {
  return gulp.src(paths.css)
    .pipe(postcss(processors))
    .pipe(concat('all.css'))
    .pipe(gulp.dest(dist));
});

gulp.task('css', function () {
  return gulp.src(paths.css)
    .pipe(plumber({
      errorHandler: onError
    }))
    .pipe(postcss(processors))
    .pipe(gulp.dest(dist));
});

gulp.task('cssmin-concat', function () {
  runSequence('css', 'css-concat');
});

/**
 * less
 */
var less = require('gulp-less'),
  sourcemaps = require('gulp-sourcemaps'),
  notify = require('gulp-notify'),
  changed = require('gulp-changed'),
  rename = require('gulp-rename'),
  watch = require('gulp-watch'),
  lessDependents = require('gulp-less-dependents'),
  gutil = require('gulp-util'),
  ignore = require('gulp-ignore'),
  combiner = require('stream-combiner2');

gulp.task('less:build', function () {
  return gulp.src(paths.less, {
      base: src
    })
    .pipe(less({
      paths: [path.join(__dirname, 'less', 'includes')]
    }))
    .pipe(postcss(processors))
    .pipe(gulp.dest(dist));
});

gulp.task('less', function () {
  var _processors = [autoprefixer(AUTOPREFIXER_BROWSERS)],
    _dist = development ? dist : src,
    combined = combiner.obj([
      gulp.src(src + '/**/*.less'),
      watch(src + '/**/*.less', {
        // ignoreInitial: true,
        base: src,
        name: 'less'
          // debounceDelay: 100,
          // verbose: true
      }),
      plumber({
        errorHandler: onError
      }),
      sourcemaps.init(),
      lessDependents(),
      ignore.exclude([src + '/**/import.*.less', src + '/**/import_*.less']),
      less(),
      postcss(_processors),
      sourcemaps.write('.'),
      gulp.dest(_dist),
      bs.stream({
        match: '**/*.css',
        once: true
      }),
      notify({
        title: 'Gulp',
        subtitle: 'Less',
        message: 'Less compiled success',
        onLast: true
      })
    ]);
  combined.on('error', console.error.bind(console));
  return combined;
});

//compile less and replace tc_dev, src to tc_idc
gulp.task('less-build', function () {
  runSequence('less:build', 'replace');
});

// Clean output directory
gulp.task('clean', del.bind(null, dist + '/**', {
  dot: true
}));

// Clean dev directory
gulp.task('clean:dev', del.bind(null, ['tc_dev/*', 'dist'], {
  dot: true
}));

//replace tc_dev & src with tc_idc
var replace = require('gulp-replace');

gulp.task('replace', function () {
  gulp.src(dist + '/**/*.+(html|js|css)')
    .pipe(replace(/(\/|\\)(tc_dev|src)/g, '/tc_idc'))
    .pipe(gulp.dest(dist));
});

/**
 * copy
 */
gulp.task('copy', function () {
  if (copyToLocation) {
    return gulp.src(dist + '/**/*.+(css|png|gif|jpg|svg)', {
        base: dist
      })
      .pipe(gulp.dest(config.dist || path.join(copyToLocation, workingDir.replace(/.*(vd)/g, ''))));
  } else {
    alert('请输入目的地路径');
  }
});

//用于复制其他文件夹
gulp.task('copy:files', function () {
  if (copyFiles) {
    return gulp.src(src + copyFiles)
      .pipe(gulpif(development, watch(src + copyFiles)))
      .pipe(gulp.dest(dist));
  }
});

var gutil = require('gulp-util');
var ftp = require('vinyl-ftp');

gulp.task('ftp', function () {

  var conn = ftp.create({
    host: config.ftp[0].value,
    port: config.ftp[1].value,
    user: config.ftp[2].value,
    password: config.ftp[3].value,
    parallel: 10,
    log: gutil.log
  });

  var remotePath = config.ftp[5].value + '/' + path.relative(config.ftp[4].value, dist);

  console.log('path.resolve', remotePath)
  console.log('conn', conn)


  // using base = '.' will transfer everything to /public_html correctly
  // turn off buffering in gulp.src for best performance
  return gulp.src(dist + '/**', { cwd: dist, base: dist, buffer: false })
    .pipe(conn.newer(dist)) // only upload newer files
    .pipe(conn.dest(remotePath));
});


//dev
gulp.task('dev', function (cb) {
  runSequence('clean', ['script', 'fileinclude'], 'prettify', 'sync', cb);
});

// Build production files, the default task
gulp.task('default', ['clean'], function (cb) {
  runSequence(['script', 'images', 'less:build', 'fileinclude', 'prettify', 'copy:files'], 'replace', cb);
});
