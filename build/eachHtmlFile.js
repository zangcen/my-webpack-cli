// 生产模版

var fs = require('fs');
var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var basePath = path.resolve(__dirname);
var resouce = path.resolve(basePath, '../src');
// console.log(basePath, resouce);
var config = {
    entry: {},
    plugins: [],
    output: {}
};

function eachDir(filePath, callback){
    var files = fs.readdirSync(filePath);
    files.forEach(function(filename){
        var fileDir = path.join(filePath, filename);
        var file = fs.statSync(fileDir);
        if(!/\/src\/pages/.test(fileDir)) return;
        if(file.isDirectory()){
            eachDir(fileDir, callback)
        }
        if(file.isFile()){
            if(/\.(html|js)$/.test(fileDir)) callback(fileDir);
        }
    });

}

function dealConfig(fileDir){
    var filePath = path.parse(fileDir);
    switch (filePath.ext) {
        case '.js':
            dealEntry(filePath);
            break;
        case '.html':
            dealHtml(filePath);
            break;
        default:
            break;
    }
}
// 文件从pages开始的路径
function file_path(filePath) {
    if(/\/js$/.test(filePath.dir)) return filePath.name;
    else if(/\/pages\//.test(filePath.dir)) return filePath.dir.split('/pages/')[1]
}
function entry_name(name) {
    return name.replace('/', '_')
}

// 处理config的入口
function dealEntry(filePath){
    // console.log(filePath);
    var entryName = file_path(filePath);
        entryName = entry_name(entryName);
    config.entry[entryName] = path.relative(basePath, [filePath.dir, filePath.base].join('/')).slice(1);
}
// 处理config的模版生成
function dealHtml (filePath) {
    // dir/childDir[/..]*
    filePath = file_path(filePath);
    // 基础布局
    var tempDir = path.join(resouce, 'layout/index.ejs');
    var seoinfo = require('../src/pages/' + filePath + '/index.json');
    var temp = {
        filename: filePath + '.html',
        template: tempDir,
        templateParameters: {
            ...seoinfo,
            content: filePath
        },
        chunks: [entry_name(filePath),'common'],
        minify: process.env.npm_lifecycle_event === 'build' ? {
            removeComments: true,
            collapseWhitespace: true,
            minifyJS:true,
            minifyCSS:true,
            processConditionalComments:true
        } : {}
    };
    //模版生产
    config.plugins.push(new HtmlWebpackPlugin(temp));
}

eachDir(resouce, dealConfig);


module.exports = config;


