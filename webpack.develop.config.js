// 开发时候的配置信息
'use strict'
// 这是最基本的一个配置文件
// 编写配置文件，要有最基本的文件入口和输出文件配置信息等
// 里面还可以加loader和各种插件配置使用

var fs = require('fs');
var path = require('path');
var webpack = require('webpack');
var autoprefixer = require('autoprefixer');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var HtmlWebpackPlugin = require('html-webpack-plugin');
var OpenBrowserPlugin = require('open-browser-webpack-plugin');




module.exports = {
    // 项目入口文件
    entry:[
        'webpack/hot/dev-server',
        'webpack-dev-server/client?http://localhost:8080',
        path.resolve(__dirname,'src/todos/todos.js')
    ],
    // 编译之后的输出路径
    output: {
        path: path.resolve(__dirname, 'dev'),
        filename: 'bundle.js',
    },
    resolve: {
        extensions: ['', '.coffee', '.js'],
        alias: {
            //libs: path.resolve(__dirname, 'libs'),
            assets: path.resolve(__dirname, './src/assets'),
            data: path.resolve(__dirname, './src/data'),
            components: path.resolve(__dirname, './src/components')
        }
    },
    module: {
        loaders: [
            //{
            //    test: /\.js$/,
            //    exclude: /(node_modules|libs)/,
            //    loader: 'babel?presets[]=react,presets[]=es2015' // react jsx编译，可以使用es6
            //},
            {
                test: /\.jsx?$/, // 用正则来匹配文件路径，这段意思是匹配 js 或者 jsx后缀名的文件
                loader: 'babel',// 加载模块 "babel" 是 "babel-loader" 的缩写
                query: {
                    presets: ['es2015', 'react','stage-0','stage-1','stage-2','stage-3']
                },
                exclude: 'node_modules'
            },
            {
                test: /\.css$/, // Only .css files
                loader: 'style!css' // 同时用两个，中间用感叹号隔开loaders
            },
            {
                test: /\.less$/,
                loader: ExtractTextPlugin.extract('css!less')
            },
            //{
            //    test: /\.scss$/,
            //    loader: 'style!css!sass'
            //},
            {
                test: /\.(png|jpg)$/,
                loader: 'url'  // 如果加参数中间用？号，&号进行多个参数的连接
            }

            //{
            //    test: /\.(png|jpg)$/,
            //    loader: 'url?limit=2500000'  // 如果加参数中间用？号，&号进行多个参数的连接
            //}
            //{
            //    test: /\.(png|jpeg|gif|jpg)$/,
            //    loader: 'file-loader?name=images/[name].[ext]'
            //}
        ]
    },
    plugins:[
        new ExtractTextPlugin('[name].css'),
        new OpenBrowserPlugin({ url:'http://localhost:8080/',browser:'chrome' })
    ]
}
