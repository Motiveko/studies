const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = { 
  entry: './src/index.js',
  rules: [
    {
      test: /\.m?js$/,
      exclude: /(node_modules|bower_components)/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env']
        }
      }
    }
  ],
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'index_bundle.js',
  },
  plugins:  [new HtmlWebpackPlugin({
    template: './index.html'
  })],
  devServer: {
    host: 'localhost',
    port: 4200,
    hot: true,
    open: true
  },
  mode: 'development'
}