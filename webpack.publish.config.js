var fs = require('fs');
var path = require('path');
var webpack = require('webpack');
var autoprefixer = require('autoprefixer');
var ExtractTextPlugin = require("extract-text-webpack-plugin");// 提取样式文件的插件
var HtmlWebpackPlugin = require('html-webpack-plugin');// 创建index页面
var Clean = require('clean-webpack-plugin');

global._ = require('lodash');
//process.env.NODE_ENV="production";
var VERSION = '1.0';
var BUILD = 'publish/' + VERSION;
var PUBLISH= `/1.0/`;

function getDefaultOptions(options) {
    return _.extend({
        headStr: '',
        title: 'LIMS移动',
        mapsScript: false
        // collectorChunk: fs.readFileSync('libs/collector.js', 'utf-8')
    }, options || {});
}

function htmlHelper(html, js, options) {
    return new HtmlWebpackPlugin({
        templateContent: function(templateParams, compilation, callback) {
            var filename = '';
            if (!options) {
                filename = `./src/${html}`;
            } else {
                filename = './src/template.html';
            }

            fs.readFileAsync(filename, 'utf8').then(function(content) {
                //options && (content = tmpl(content, options)); //对模板串处理
                //content = content.replace(/(\n\r)/g, ''); //去掉模板代码空行 影响心情

                callback(null, content);

            });
        },
        //template: './src/template.html',
        filename: html,
        inject: 'body',
        chunks: ['resources/common', 'resources/vendor', 'resources/' + js]
    });
}



var config={
    // 项目入口文件
    entry:{

        //app:path.resolve(__dirname,'src/app.js'),
        //当你的应用依赖其他库尤其是像 React JS 这种大型库的时候，你需要考虑把这些依赖分离出去，这样就能够让用户在你更新应用之后不需要再次下载第三方文件。当满足下面几个情况的时候你就需要这么做了：
        'resources/vendor': ['./src/assets/js/libs/zepto.js', './src/assets/js/libs/touch.js', './src/assets/js/libs/iscroll-lite.js',  'react', 'react-dom', 'react-router'],
        'resources/result/result':'./src/result/result.js',
        'resources/message/message':'./src/message/message.js',
        'resources/todos/todos':'./src/todos/todos.js',
    },
    // 编译之后的输出路径
    output: {
        path: path.join(__dirname, BUILD),
        publicPath:PUBLISH,
        filename: '[name].[chunkhash:8].js',
        chunkFilename: '[id].[chunkhash:8].chunk.js'
        //filename: '[name].js',
        //chunkFilename: '[id].chunk.js',
        //sourceMapFilename: '[file].map',
        //pathinfo: true

    },
    module: {
        loaders: [{
            test: /\.css$/,
            loader: ExtractTextPlugin.extract('css!postcss')
        }, {
            test: /\.less$/,
            loader: ExtractTextPlugin.extract('css!postcss!less')
        }, {
            test: /\.jsx?$/, // 用正则来匹配文件路径，这段意思是匹配 js 或者 jsx后缀名的文件
            loader: 'babel',// 加载模块 "babel" 是 "babel-loader" 的缩写
            query: {
                presets: ['es2015', 'react','stage-0','stage-1','stage-2','stage-3']
            },
            exclude: /(node_modules|libs)/,
        }, {
            test: /\.(png|jpg|jpeg|gif)$/,
            loader: 'url-loader?name=resources/assets/images/[name][hash:8].[ext]&limit=8192' // <8k的图片，输出为base64 dataurl
        }, {
            test: /\.(json)$/,
            loader: 'json'
        }]

    },
    postcss: function() {
        return [autoprefixer];
    },
    resolve: {
        //自动扩展文件后缀名，意味着我们require模块可以省略不写后缀名
        //注意一下, extensions 第一个是空字符串! 对应不需要后缀的情况.
        //extensions: ['', '.js', '.coffee','.json', '.scss','jsx'],
        extensions: ['', '.coffee', '.js'],
        alias: {
            //libs: path.resolve(__dirname, 'libs'),
            assets: path.resolve(__dirname, './src/assets'),
            data: path.resolve(__dirname, './src/data'),
            components: path.resolve(__dirname, './src/components')
        }
    },
    plugins:[

        new Clean([BUILD]),
        new webpack.DefinePlugin({
            "process.env": {
                NODE_ENV: JSON.stringify("production")
            }
        }),
        new webpack.optimize.UglifyJsPlugin({
            minimize: true,
            compress: {
                warnings: false,
                drop_console: true
            },
            output: {
                comments: false
            }
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'common',
            filename: 'resources/common.[chunkhash:8].js',
            chunks: ['result/result', 'message/message','todos/todos']
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'resources/vendor',
            filename: 'resources/vendor.js',
            minChunks: Infinity
        }),
        new ExtractTextPlugin("[name].css"),
        htmlHelper('message.html', 'message/message', getDefaultOptions()),
        htmlHelper('result.html', 'result/result', getDefaultOptions()),
        htmlHelper('todos.html', 'todos/todos', getDefaultOptions()),
        new webpack.NoErrorsPlugin()
    ]
}

// 动态添加插件的一个方法
if(process.env.NODE_ENV === 'production') {
    config.plugins.push(
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        })
    );
}

module.exports=config;

//Todo:1、chunk和异步加载
//Todo:2、发布优化