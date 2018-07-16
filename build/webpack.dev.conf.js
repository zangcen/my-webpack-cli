const merge = require('webpack-merge');
const config = require('./webpack.base.conf');

module.exports = merge(config, {
    mode: 'development',
    devtool: 'cheap-module-eval-source-map',
    devServer: {
        contentBase: './dist'
    }
});
