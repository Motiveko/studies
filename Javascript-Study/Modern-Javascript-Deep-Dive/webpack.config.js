const path = require("path");

module.exports = {
  // entry 파일
  // https://webpack.js.org/configuration/entry-context/#entry
  entry: ["@babel/polyfill", "./src/js/main.js"],
  // 번들링 결과의 out dir,name 지정
  output: {
    path: path.resolve(__dirname, "dist/js"),
    filename: "bundle.js",
  },
  // https://webpack.js.org/configuration/module
  module: {
    rules: [
      {
        test: /\.js$/,
        include: [path.resolve(__dirname, "src/js")],
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
            // plugins: ['@babel/plugin0proposal-class-properties']
          },
        },
      },
    ],
  },
  devtool: "source-map",
  // https://webpack.js.org/configuration/mode/
  mode: "development",
};
