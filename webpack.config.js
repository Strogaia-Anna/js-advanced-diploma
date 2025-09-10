const plugin = require("eslint-plugin-react");
const { rules } = require("eslint-plugin-react");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
// const loader = require("mini-css-extract-plugin/types/loader");

module.exports = {
    module: {
        rules: [
            {
                test: /\.png/,
                type: 'asset/resource'
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
            },
            {
                test: /\.css$/,
                use: [
                    MiniCssExtractPlugin.loader, 'css-loader'
                ]
            }
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: './src/css/style.css'
        }),
        new HtmlWebpackPlugin({
            template: './src/index.html'
        })
    ]
}