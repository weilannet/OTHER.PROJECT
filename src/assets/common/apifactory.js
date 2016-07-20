/**
 * Created by hubq on 2016/2/26.
 */

/*
 * var JsAPI=require('common/jsapi')
 * var api1=new JsAPI();
 * api1.on('eventName',callback?).on('eventName2',callback?).send('actionName',callback?).do(eventCallback?,eventCallback1?,eventCallback2?);
 * */



function JsAPI(init) {
    this.init = init;
    this.events = [];
    this.sends = [];
}

JsAPI.prototype = {
    destroy: function () {
        this.events = null;
        this.sends = null;
    },
    inited: window.WebViewJavascriptBridgeInited||false,//因为最多仅能初始化一次
    doAndInit: function (callback) {
        var me=this;
        if (WebViewJavascriptBridge) {
            !window.WebViewJavascriptBridgeInited && WebViewJavascriptBridge.init(function (message, responseCallback) {
                me.init && me.init(message, responseCallback);
            });
            if(!window.WebViewJavascriptBridgeInited){
               window.WebViewJavascriptBridgeInited=true;
            }
            callback(WebViewJavascriptBridge);
        }
    },
    connectWebViewJavascriptBridge: function (callback) {
        var me = this;
        if (window.WebViewJavascriptBridge) {
            me.doAndInit(callback);
            me.inited=window.WebViewJavascriptBridgeInited=true;
        } else if (!me.inited) {
            !window.WebViewJavascriptBridgeEventAdded && document.addEventListener('WebViewJavascriptBridgeReady', function () {
                me.doAndInit(callback);
            }, false);
            me.inited=true;
            window.WebViewJavascriptBridgeEventAdded=true;
        }
        return this;
    },
    on: function (name, callback, rightNow) {
        this.events.push({name:name, callback:callback});
        if (rightNow) {
            this.do();
        }
        return this;
    },
    send: function (name, callback, rightNow) {
        this.sends.push({name:name, callback:callback});
        if (rightNow) {
            this.do();
        }
        return this;
    },
    do: function () {
        var funcs = [].slice.call(arguments);
        var me = this;
        try {
            me.connectWebViewJavascriptBridge(function (bridge) {
                me.events.forEach((n, i)=> {
                    (function (name, callback) {
                        bridge.registerHandler(name, function (responseData) {
                            callback && callback(responseData);
                             funcs.length > i && funcs[i](responseData);
                        })
                    })(n.name, n.callback);
                });
                me.events = [];//绑定完后清空掉
                me.sends.forEach((n, i)=> {
                    (function (name, callback) {
                        bridge.send({action: name}, function (responseData) {
                            callback && callback(responseData);
                        })
                    })(n.name, n.callback);
                });
                me.sends = [];//执行完后清空掉
            });
        } catch (e) {
        }
        return this;
    }
};
module.exports = JsAPI;















