//var gulp = require('gulp');
//var webpack = require("webpack");
//var webpackConfig = require("./webpack.publish.config.js");
//
//gulp.task('default',['webpack'], function() {
//    return gulp.src(['./publish/*.js'])
//        .pipe(gulp.dest('./publish/js'))
//});
//
//gulp.task('webpack', function() {
//    webpack(webpackConfig, function (err, stats) {
//        if (err)
//            console.log("任务启动失败");
//    });
//
//});



var gulp = require('gulp'),
    uglify = require('gulp-uglify'),
    clean = require('gulp-clean'),
    gulpSequence = require('gulp-sequence'),
    htmlmin = require('gulp-htmlmin');

var webpack = require("webpack");
var webpackConfig = require("./webpack.develop.config.js");
var webpackProduct = require("./webpack.publish.config.js");

/**
 *
 * 清空文件夹
 */
    //todo 为什么return后就可以顺序执行了 而且不报错了
gulp.task('clean',function(){

    return gulp.src(['dev','publish'])
        .pipe( clean() )
});

/**
 *
 * less编译
 */
gulp.task('less',function(){

    return gulp.src('src/common/css/main.less')
        .pipe( less() )
        .pipe( gulp.dest('src/common/css/'));
});

//开发执行的webpack任务
gulp.task("webpack", function(callback) {
    var myConfig = Object.create(webpackConfig);
    // run webpack
    webpack(
        // configuration
        myConfig
        , function(err, stats) {
            // if(err) throw new gutil.PluginError("webpack", err);
            // gutil.log("[webpack]", stats.toString({
            //     // output options
            // }));
            callback();
        });
});
//上线执行的webpack任务
gulp.task("webpackProduct", function(callback) {
    var myConfig = Object.create(webpackProduct);
    // run webpack
    webpack(
        // configuration
        myConfig
        , function(err, stats) {
            // if(err) throw new gutil.PluginError("webpack", err);
            // gutil.log("[webpack]", stats.toString({
            //     // output options
            // }));
            callback();
        });
});
/**
 *
 * 复制所有文件
 */
gulp.task('copy',function(){

    return gulp.src(['build/**/*','src/assets/js/libs/echarts.common.min.js'],{'base':'build'})
        .pipe( gulp.dest('dest/') );
});
gulp.task('copyJS',function(){

    return gulp.src(['src/assets/js/libs/echarts.common.min.js'],{'base':'src'})
        .pipe( gulp.dest('dest/1.0/resources/') );
});

gulp.task('copyTest',function(){

    return gulp.src(['src/assets/js/libs/echarts.common.min.js'],{'base':'src'})
        .pipe( gulp.dest('dev/resources/') );
});

/**
 *
 * js压缩
 * mangle 设为false 避免重命名模块内的require关键字
 */
//gulp.task('jsminify',function(){
//
//    console.log('jsminify');
//    return gulp.src(['build/**/*.js','build/*.js'],{'base':'build'})
//        .pipe( uglify({'mangle':false}) )
//        .pipe( gulp.dest('dest/') );
//});
//
///**
// *
// * html 压缩
// */
//gulp.task('htmlminify',function(){
//
//    return gulp.src(['build/**/*.jsp','build/*.jsp'],{'base':'build'})
//        .pipe( htmlmin({collapseWhitespace: true}) )
//        .pipe( gulp.dest('dest/') );
//});

//监控文件变化
gulp.task('watch', function() {
    livereload.listen(); //要在这里调用listen()方法
    gulp.watch(['./src/**/*.*'], ['less','reloadHtml']);

});

//重新加载hmtl
gulp.task('reloadHtml',function(){
    return gulp.src(['src/**/*.html','./src/*.html'])
        //.pipe(connect.reload());
        .pipe(livereload());
});

//实时监控刷新--start
gulp.task('server',function(){
    connect.server({
        root:'./src',
        port:8023,//设置端口
        livereload:true //动态加载，试试刷新
    })
})

/*
 * 默认任务
 */
//gulp.task('default',['less']);
//gulp.task('default',['less','server','watch']);

//注释内容
//gulp.task('default',['webpack','copyTest']);
//gulp.task('release',gulpSequence('clean','webpackProduct','copy','copyJS','htmlminify'));

