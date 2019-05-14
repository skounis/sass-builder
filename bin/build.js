#!/usr/bin/env node

const glob = require('glob');
const globBase = require('glob-base');
const path = require('path');
const program = require('commander');
const buildStyles = require('../scripts/styles');
const pkg = require('../package.json');

const loadConfig = configFile => {
  const conf = configFile || 'sass-builder.config.js';
  return require(path.resolve(process.cwd(), conf)); // eslint-disable-line
};

const target = function(source, globBase, dest) {
  const SOURCE_EXT = '.scss';
  const TARGET_EXT = '.css';

  // If there is no glob path detected return the destination.
  if (!globBase.isGlob) { return dest; }
  
  source = source.replace(globBase.base, dest);
  source = source.replace(SOURCE_EXT, TARGET_EXT);
  return source;
}

const resolveAndBuildStyles = function(conf) {
  const gb = globBase(conf.entry);

  glob(conf.entry, {}, function (er, files) {
    files = files.filter(file => {
      const basename = path.basename(file);
      return !basename.startsWith('_');
    }).forEach(file => {
      const dest = target(file, gb, conf.dest);
      buildStyles(file, dest, conf.options)
    })
  });
}

program
  .version(pkg.version)
  .usage('sass-builder [command] [option]')
  .option(
    '-c, --config [config_file]',
    'config file (default: sass-builder.config.js)'
  );

program
  .command('styles')
  .description('compile SCSS to CSS')
  .action(() => {
    const config = loadConfig(program.config);
    config.styles.forEach(conf =>
      resolveAndBuildStyles(conf)
    );
  });

// If no arguments provided, display help menu.
if (!process.argv.slice(2).length) {
  program.help();
} else {
  program.parse(process.argv);
}
