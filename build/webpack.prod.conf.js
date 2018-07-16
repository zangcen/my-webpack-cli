const path = require('path');
const merge = require('webpack-merge');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const config = require('./webpack.base.conf');

module.exports = merge(config, {
    mode: 'production',
    devtool: 'source-map',
    plugins: [
        new CleanWebpackPlugin(['dist'],{
            root: path.resolve(__dirname, '../')
        }),
        new MiniCssExtractPlugin({
            filename: "css/[name].[contenthash:8].css", //提取公共js名称
            chunkFilename: "css/[name].[contenthash:8].css",  // 提取公共css名称
            allChunks: true
        })
    ]
});



