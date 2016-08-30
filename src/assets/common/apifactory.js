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
  inited: window.WebViewJavascriptBridgeInited || false,//因为最多仅能初始化一次
  doAndInit: function (callback) {
    var me = this;
    if (WebViewJavascriptBridge) {
      !window.WebViewJavascriptBridgeInited && WebViewJavascriptBridge.init(function (message, responseCallback) {
        me.init && me.init(message, responseCallback);
      });
      if (!window.WebViewJavascriptBridgeInited) {
        window.WebViewJavascriptBridgeInited = true;
      }
      callback(WebViewJavascriptBridge);
    }
  },
  connectWebViewJavascriptBridge: function (callback) {
    //网上安卓方案
    //if (window.WebViewJavascriptBridge) {
    //  callback(WebViewJavascriptBridge)
    //} else {
    //  document.addEventListener(
    //      'WebViewJavascriptBridgeReady'
    //      , function() {
    //        callback(WebViewJavascriptBridge)
    //      },
    //      false
    //  );
    //}
    //原始方案
    //var me = this;
    //if (window.WebViewJavascriptBridge) {
    //  me.doAndInit(callback);
    //  me.inited = window.WebViewJavascriptBridgeInited = true;
    //} else if (!me.inited) {
    //  !window.WebViewJavascriptBridgeEventAdded && document.addEventListener('WebViewJavascriptBridgeReady', function () {
    //    me.doAndInit(callback);
    //  }, false);
    //  me.inited = true;
    //  window.WebViewJavascriptBridgeEventAdded = true;
    //}
    //return this;

    if (window.WebViewJavascriptBridge) { return callback(WebViewJavascriptBridge); }
    if (window.WVJBCallbacks) { return window.WVJBCallbacks.push(callback); }
    window.WVJBCallbacks = [callback];
    var WVJBIframe = document.createElement('iframe');
    WVJBIframe.style.display = 'none';
    WVJBIframe.src = 'wvjbscheme://__BRIDGE_LOADED__';
    document.documentElement.appendChild(WVJBIframe);
    setTimeout(function() { document.documentElement.removeChild(WVJBIframe) }, 0)
  },
  //H5发送消息给原生
  limsCaller: function (name, params, callback) {
    var me = this;
    try {
      me.connectWebViewJavascriptBridge(function (bridge) {
        bridge.callHandler(name, params, function (response) {
          if (callback) {
            callback(response);
          }
        });
      });
    } catch (e) {
    }
    return this;
  },
  //原生调用JS
  limsregister: function (name, callback) {
    var me = this;
    try {
      me.connectWebViewJavascriptBridge(function (bridge) {
        //bridge.init(function(message, responseCallback) {
        //  console.log('JS got a message', message);
        //  var data = {
        //    'Javascript Responds': 'Wee!'
        //  };
        //  console.log('JS responding with', data);
        //  responseCallback(data);
        //});
        bridge.registerHandler(name, function (data, responseCallback) {
           callback(data, responseCallback);
        });

      });
    } catch (e) {
    }
    return this;

  },
  on: function (name, callback, rightNow) {
    this.events.push({name: name, callback: callback});
    if (rightNow) {
      this.do();
    }
    return this;
  },
  send: function (name, callback, rightNow) {
    this.sends.push({name: name, callback: callback});
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















