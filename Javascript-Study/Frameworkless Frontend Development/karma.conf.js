/* eslint-disable */
const webpackConfig = require('./webpack.config');
module.exports = function(config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine'],
    files: [
       "src/**/*.spec.ts",
    ],
    webpack: {
      module: webpackConfig.module,
      resolve: webpackConfig.resolve,
      stats: {
        colors: true,
        modules: true,
        reasons: true,
        errorDetails: true
      },
    },
    preprocessors: {
      "src/**/*.spec.ts": ['webpack'] 
    },
    exclude: [
    ],
    // mime: { 'text/x-typescript': ['ts','tsx'] },
    reporters: ["progress"],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['Chrome'],
    singleRun: false,
    concurrency: Infinity
  })
}
