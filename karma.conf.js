const webpackConfig = require('./webpack.config');
const webpack = require('webpack')

module.exports = function (config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine-jquery', 'jasmine'],

    files: [
      { pattern: 'src/**/*.ts' },
      { pattern: 'test/**/*.spec.ts' },
    ],

    preprocessors: {
      'src/**/*.ts': ['webpack', 'sourcemap'],
      'test/**/*.ts': ['webpack', 'sourcemap']
    },

    reporters: ['progress', 'coverage-istanbul'],

    // coverageIstanbulReporter: {
    //   reports: ['html', 'text-summary'],
    //   dir: 'coverage/',
    //   combineBrowserReports: true,
    //   fixWebpackSourcePaths: true,
    // },

    webpack: {
      module: webpackConfig.module,
      resolve: webpackConfig.resolve,
      mode: 'development',
      plugins: [
        new webpack.ProvidePlugin({
          $: 'jquery',
          jQuery: 'jquery',
          'window.jQuery': 'jquery'
        })
      ],
    },

    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['Chrome'],
    singleRun: false,
    concurrency: Infinity,
  });
};
