(function() {

    //如果页面上存在id为mo_refresh_mask的元素  则下边的代码就不执行了
    if (document.getElementById('mo_refresh_mask')) {
        return;
    }

    //动态创建DOM节点元素  （刷新组件的页面结构）
    var oImgRefresh = createEle('div', {
        'id': 'mo_refresh_mask_flush'
    });
    var mask = createEle('div', {
        'id': 'mo_refresh_mask'
    });

    /*
     *  动态创建DOM节点元素 并赋值id 图片路径
     *  @param tagName (增加标签类型)
     *  @param attr (增加id或src及属性)
     *
     */
    function createEle(tagName, attrs) {
        var temp = document.createElement(tagName);
        for (var key in attrs) {
            if (attrs.hasOwnProperty(key)) {
                temp.setAttribute(key, attrs[key]);
            }
        }
        return temp;
    }

    //插入新的节点
    mask.appendChild(oImgRefresh);

    //将新建的DOM结构放在body下
    document.body.appendChild(mask);

    //私有化 暴露接口
    window.refresh = {

        //显示刷新图片 和遮罩层
        show: function() {
            mask.style.display = "block";
            oImgRefresh.style.display = "block";
        },

        //隐藏刷新图片和遮罩层
        hide: function() {
            mask.style.display = "none";
            oImgRefresh.style.display = "none";
        }
    }
})();;
(function($) {

    //
    // 对Date的扩展，将 Date 转化为指定格式的String
    // 月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符， 
    // 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字) 
    // 例子： 
    // (new Date())._format("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423 
    // (new Date())._format("yyyy-M-d h:m:s.S")      ==> 2006-7-2 8:9:4.18 
    //
    Date.prototype._format = function(fmt) { //author: meizz 
        var o = {
            "M+": this.getMonth() + 1, //月份 
            "d+": this.getDate(), //日 
            "h+": this.getHours(), //小时 
            "m+": this.getMinutes(), //分 
            "s+": this.getSeconds(), //秒 
            "q+": Math.floor((this.getMonth() + 3) / 3), //季度 
            "S": this.getMilliseconds() //毫秒 
        };
        if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
        for (var k in o)
            if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
        return fmt;
    };

    var win = window,
        TIME_OUT = 300000; //请求超时时间

    /**
     * @type {Object}
     * 全局命名空间    
     */
    win.IBSS = win.IBSS || {};

    IBSS.role = null; //当前用户信息
    IBSS.USERS = {}; //客服 id->名字 map
    IBSS.position = {
        'latitude': '',
        'longitude': '',
        'message': '',
        'city': ''
    }; //位置信息

    IBSS.ASYNCCSS = true; //是否异步载入css文件
    IBSS.API_PATH = '';

    var $body = $('body');
    /**
     *@description工具类对象
     */
    var util = {

        /*
         *  计算日期
         *  @param AddDayCount {number}
         *  根据输入的 number 计算返回的日期  
         *  如 -1 返回昨天的日期
         */
        getDateStr: function(AddDayCount) {

            var dd = new Date();
            dd.setDate(dd.getDate() + AddDayCount); //获取AddDayCount天后的日期
            var y = dd.getFullYear();
            var m = dd.getMonth() + 1; //获取当前月份的日期
            var d = dd.getDate();
            return y + "-" + (m < 10 ? '0' + m : m) + "-" + (d < 10 ? '0' + d : d);
        },
        /**
         * @desc 显示toast 
         *
         */
        showToast: function(msg) {
            var htmlStr = '<div class="error-box">' + msg + '</div>'
            $body.append(htmlStr);
            if (timer) {
                win.clearTimeout(timer);
            }
            var timer = win.setTimeout(function() {
                $body.find('.error-box').remove();
            }, 2000);
        },

        /**
         * 显示提示
         *
         */

        showTip: function(msg) {
            var htmlStr = '<div class="info-box">' + msg + '</div>'
            $body.append(htmlStr);
            if (timer) {
                win.clearTimeout(timer);
            }
            var timer = win.setTimeout(function() {
                $body.find('.info-box').remove();
            }, 3000);
        },
        /**
         * @desc重新封装ajax
         * @param {Object} opt
         *
         */

        ajax: function(opt) {
            var me = this;

            opt = $.extend({
                keepLoading: true,
                hideLoading: true
            }, opt);

            var data = $.extend({
                '_t': new Date().getTime()
            }, opt.data || {});

            return $.ajax({
                type: opt.type || 'GET',
                url: opt.url || '',
                data: data,
                dataType: opt.dataType,
                timeout: TIME_OUT,
                success: function(data, status, xhr) {
                    opt.success && opt.success(data, status, xhr);
                },
                error: function() {
                    me.showToast('网络请求错误！');
                    opt.error && opt.error();
                }
            });
        },

        /**
         *
         * @desc数据请求接口
         * @param {Object} opt
         * @param bool     mask true时显示遮罩 false时不显示
         */

        api: function(opt, mask) {
            var that = this,
                beforeSend = opt.beforeSend,
                success = opt.success,
                complete = opt.complete,
                error = opt.error;

            //默认设置
            opt = $.extend({
                type: 'post',
                cache: false,
                timeout: TIME_OUT,
                dataType: 'json',
                button: {
                    'text': '提交中',
                    'el': null,
                }
            }, opt || {});

            //
            // 按钮原始文本
            var btntext;
            if (opt.button.el) {
                btntext = opt.button.el.text();
            }

            /**
             *
             * 如果 url是 ~ 开头 则从根路径请求
             * 否则 从全局配置的api路径请求
             */

            if (opt.url.indexOf('~') == 0) {
                opt.url = opt.url.slice(1);
            } else {
                opt.url = IBSS.API_PATH + opt.url;
            }

            var _startTime = Date.now();

            opt.beforeSend = function() {
                window.refresh && window.refresh.show();
                if (mask == true) {
                    util.showGlobalLoading();
                }
                opt.button.el && opt.button.el.attr('disabled', 'disabled').text(opt.button.text);
                return beforeSend && beforeSend.apply(this, arguments);
            };

            opt.success = function(data, status, xhr) {
                if (data.login == false) {
                    location.href = "/login?from=" + location.pathname;
                    return;
                }
                if (!data.success) {
                    //截取20位
                    if (data.message && data.message.length > 20) {
                        data.message = data.message.slice(0, 20);
                    } else {
                        data.message = data.message + ',请尝试刷新！';
                    }

                    that.showToast('请求错误  ' + data.message);
                }
                return success && success.apply(this, arguments);
            };
            opt.error = function(info) {

                if (info && info.statusText == "abort") return;
                if(info && info.status == 0)return;
                that.showToast('网络错误' + '(' + info.status + ')' + '!');
                return error && error.apply(this);
            };
            opt.complete = function() {
                window.refresh && window.refresh.hide();

                // 采集接口耗时
                var time = Date.now() - _startTime;
                // var api = _.parseURL(url).path;
                window.FS && FS.collector && FS.collector.log('api', {
                    api: opt.url,
                    time: time
                }, true);

                if (mask == true) {
                    util.hideGlobalLoading();
                }
                opt.button.el && opt.button.el.removeAttr('disabled').text(btntext);
                return complete && complete.apply(this, arguments);
            }
            return $.ajax(opt);
        },
        /**
         *
         * @获取当前位置的经纬度
         * @
         * @
         */
        getLocation: function(callback) {
            var that = this;
            IBSS.position = {
                'latitude': '',
                'longitude': '',
                'message': '',
                'city': ''
            };

            if (navigator.geolocation) {

                navigator.geolocation.getCurrentPosition(function(position) {

                    IBSS.position['message'] = '';
                    IBSS.position.latitude = position.coords.latitude;
                    IBSS.position.longitude = position.coords.longitude;
                    that.getCity();
                    callback && callback();
                    return;
                }, function(error) {

                    switch (error.code) {
                        case error.PERMISSION_DENIED:
                            IBSS.position['message'] = "用户拒绝对获取地理位置的请求。"
                            break;
                        case error.POSITION_UNAVAILABLE:
                            IBSS.position['message'] = "位置信息是不可用的。"
                            break;
                        case error.TIMEOUT:
                            IBSS.position['message'] = "请求用户地理位置超时。"
                            break;
                        case error.UNKNOWN_ERROR:
                            IBSS.position['message'] = "未知错误。"
                            break;
                    }
                    return;
                    //that.showToast(IBSS.position['message']);
                });
                var g_sUA = navigator.userAgent.toLowerCase();
                var android = g_sUA.match(/(android)\s+([\d.]+)/);

                if (android && parseFloat(android[2]) < 4.3) {
                    IBSS.position['message'] = '该系统不支持获取地理位置。';
                    // that.showToast(IBSS.position['message']);
                    callback && callback();
                }
                /* if(!IBSS.position['message']){
                     IBSS.position['message'] = '该系统不支持获取地理位置。';
                    // that.showToast(IBSS.position['message']);
                    callback&&callback();
                 }*/
            } else {

                IBSS.position['message'] = '该浏览器不支持获取地理位置。';
                //that.showToast(IBSS.position['message']);
                callback && callback();
            }
        },
        /**
         *
         * @根据经纬度获取当前城市
         * @
         * @
         */
        getCity: function() {
            var that = this;

            //初始化地图
            AMap.service('AMap.Geocoder', function() { //回调函数
                //实例化Geocoder
                var geocoder = new AMap.Geocoder({
                    radius: 1000,
                    extensions: "all"
                });
                //TODO: 使用geocoder 对象完成相关功能
                if (!IBSS.position['message']) {
                    var lnglatXY = [IBSS.position.longitude, IBSS.position.latitude]

                    geocoder.getAddress(lnglatXY, function(status, result) {
                        if (status === 'complete' && result.info === 'OK') {
                            var cityStr = result.regeocode.addressComponent['city'] || result.regeocode.addressComponent['province']
                            IBSS.position['city'] = cityStr;
                        }
                    });

                } else {
                    that.showToast(IBSS.position['message']);
                    return false;
                }
            });
        }

    };

    win.util = util;

}(window.Zepto));