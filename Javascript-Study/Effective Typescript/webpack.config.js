const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');


module.exports = {
    entry: './src/index.ts',
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: "ts-loader",
                exclude: /node_moudles/,
            },
        ],
    },
    resolve: {
        extensions: [".tsx", ".ts",".js"],
    },
    output: {
        filename: "main.js",
        path: path.resolve(__dirname, "dist")
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "./index.html"
        })
    ],
    devServer: {
        host: "localhost",
        port: 4200,
        hot: true,
        open: true,
    },
    mode: "development"
}