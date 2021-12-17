/* eslint-disable */
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
module.exports = {
    entry: './src/index.ts',
    devtool: 'inline-source-map',
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: "ts-loader",
                exclude: /node_moudles/,
            }
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
            template: "./index.html",
        }),
        new webpack.DefinePlugin({
            APP_NAME: JSON.stringify("Frameworkless Frontend Development"),
            VERSION: JSON.stringify("v2.2"),
            BUILT_AT: webpack.DefinePlugin.runtimeValue(Date.now)
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