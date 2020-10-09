const webpack = require('webpack');
const webpackConfig = require('./webpack.config');

module.exports = (config) => {
  config.set({
    basePath: '',
    frameworks: ['jasmine-jquery', 'jasmine'],

    client: {
      clearContext: false,
      jasmine: {
        random: false,
      },
    },

    files: [
      { pattern: 'src/**/*.ts' },
      { pattern: 'test/**/*.spec.ts' },
      { pattern: 'test/**/*.html' },
      { pattern: 'test/**/*.css' },
    ],

    preprocessors: {
      'src/**/*.ts': ['webpack', 'sourcemap'],
      'test/**/*.ts': ['webpack', 'sourcemap'],
    },

    reporters: ['progress', 'coverage-istanbul', 'kjhtml'],

    coverageIstanbulReporter: {
      reports: ['html', 'lcovonly'],
      dir: 'coverage/',
      combineBrowserReports: true,
      fixWebpackSourcePaths: true,
    },

    webpack: {
      module: webpackConfig.module,
      resolve: webpackConfig.resolve,
      mode: 'development',
      plugins: [
        new webpack.ProvidePlugin({
          $: 'jquery',
          jQuery: 'jquery',
          'window.jQuery': 'jquery',
        }),
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
