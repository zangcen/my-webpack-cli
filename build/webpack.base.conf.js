const path = require('path');
const merge = require('webpack-merge');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

// entry
const myConfig = require('./eachHtmlFile');

module.exports = merge(myConfig, {
    resolve: {
      alias: {
          "@": path.resolve(__dirname, '../src') // 别名 可以在模块中使用
      }
    },
    module: {
        rules: [
            {
                test: /\.html$/,
                use: ['html-loader?interpolate=require']
            },
            {
                test: /\.js$/,
                use: [
                    'babel-loader',
                    //'eslint-loader',
                ],
                enforce: 'pre',
                include: [path.resolve(__dirname, '../src')]

            },
            {
                test: /\.less$/,
                use: [
                    (process.env.npm_lifecycle_event === 'build' ? MiniCssExtractPlugin.loader : 'style-loader'),
                    {loader: 'css-loader', options: {importLoaders: 1, minimize: true, sourceMap: true}},
                    {loader: 'postcss-loader',options: { sourceMap: true }},
                    {loader: 'less-loader',options: { sourceMap: true}}
                ]
            },
            {
                test: /\.(jpg|png|gif|svg)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 10000,
                            name: 'img/[name].[hash:8].[ext]'
                        }
                    }
                ]
            }
        ]
    },
    output: {
        filename: 'js/[name].[chunkhash:8].js',
        path: path.resolve(__dirname, '../dist'),
        publicPath: ''
    },
    optimization: {
        splitChunks: {
            cacheGroups: {
                common: {  // 提取公共代码任务
                    minSize:1,
                    name: "common",
                    chunks: "all",
                    minChunks: 2
                }
            }
        }

    }
});