const chalk   = require('chalk');
const live_server = require('live-server');
const build_dir = require('../build_utils/build_dir');

const params = {
  port:       5000,
  root:       build_dir,
  file:       'index.html',
  wait:       200, // Wait time in miliseconds
  logLevel:   2 // 0 = errors only, 1 = some, 2 = lots
};

function serve_files (cb) {
  live_server.start(params);

  console.log(chalk.bold.green(`\n\tServer running on localhost:${params.port}\n`));
}

module.exports = serve_files;
