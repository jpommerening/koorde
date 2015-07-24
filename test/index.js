var ARGV = process.argv;
var COV = /-cov$/.test(ARGV[ARGV.indexOf('--reporter') + 1]);

if (COV) {
  require('blanket')({
    "pattern": [ "" ],
    "data-cover-only": "/lib/"
  });
}

require('./ring');
