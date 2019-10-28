const { series, parallel, watch } = require('gulp');
const chalk = require('chalk');

const serve_files = require('./serve-files');

const compile = {
  index:        require('./compile-index'),
  stylus:       require('./compile-stylus'),
  'app-bundle': require('./compile-app-bundle')
};

const npm = {
  css: require('./npm-css')
};

const compile_tasks = [];
const npm_tasks = [];

for (const key in compile) {
  compile_tasks.push(compile[key]);

  exports[`compile:${key}`] = compile[key];
}

for (const key in npm) {
  npm_tasks.push(npm[key]);

  exports[`npm:${key}`] = npm[key];
}

function default_task (cb) {
  console.log(chalk.blue('\n\tBuild generated!\n'));

  cb();
}

function startdev () {
  watch('src/index.pug', compile.index);
  watch('src/stylus/**/*.styl', compile.stylus);
  watch(['src/components/**/*.pug', 'src/**/*.js'], compile['app-bundle']);
}

exports['serve-files'] = serve_files;

exports.default = series(
  parallel(...npm_tasks),
  parallel(...compile_tasks),
  default_task
);

exports.startdev = series(
  parallel(...npm_tasks),
  parallel(...compile_tasks),
  parallel(
    serve_files,
    startdev
  )
);
