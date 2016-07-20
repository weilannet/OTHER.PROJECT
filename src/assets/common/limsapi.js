/**
 * Created by gaoxin on 2016/6/17.
 */

//window.onerror = function(err) {
//  log('window.onerror: ' + err)
//}

 function setupWebViewJavascriptBridge(callback) {
  if (window.WebViewJavascriptBridge) { return callback(WebViewJavascriptBridge); }
  if (window.WVJBCallbacks) { return window.WVJBCallbacks.push(callback); }
  window.WVJBCallbacks = [callback];
  var WVJBIframe = document.createElement('iframe');
  WVJBIframe.style.display = 'none';
  WVJBIframe.src = 'wvjbscheme://__BRIDGE_LOADED__';
  document.documentElement.appendChild(WVJBIframe);
  setTimeout(function() { document.documentElement.removeChild(WVJBIframe) }, 0)
}
let apiFunc= null;

 setupWebViewJavascriptBridge(
    function(bridge) {
      //var uniqueId = 1
      function log(message,data){
         console.log(`{message}成功,数据为{data}`);

      }

      apiFunc= {
        limsRegister:function(name,params,callback){
          bridge.callHandler(name, params, function(response) {
            log(name, response);
            if (callback){callback(response);}
          });
          //console.log('limsRegister');
        },
        limsAppCaller:function(name,callback){

          bridge.registerHandler(name, function(data, responseCallback) {
            // log('ObjC called testJavascriptHandler with', data)
            //var responseData = { 'ms' }
            log(name, data);

            //responseCallback(responseData);
            callback(data,responseCallback);
          });
          //console.log('limsAppCaller');
        }
      }


      //function log(message, data) {
      //  var log = document.getElementById('log')
      //  var el = document.createElement('div')
      //  el.className = 'logLine'
      //  el.innerHTML = uniqueId++ + '. ' + message + ':<br/>' + JSON.stringify(data)
      //  if (log.children.length) { log.insertBefore(el, log.children[0]) }
      //  else { log.appendChild(el) }
      //}

      //原生调用H5
      //bridge.registerHandler('testJavascriptHandler', function(data, responseCallback) {
      // // log('ObjC called testJavascriptHandler with', data)
      //  var responseData = { 'Javascript Says':'Right back atcha!' }
      // // log('JS responding with', responseData)
      //
      //  responseCallback(responseData)
      //})

     // document.body.appendChild(document.createElement('br'))

      //H5页面按钮调用原生
      //var callbackButton = document.getElementById('buttons').appendChild(document.createElement('button'))
      //callbackButton.innerHTML = 'Fire testObjcCallback'
      //callbackButton.onclick = function(e) {
        //e.preventDefault()
        //log('JS calling handler "testObjcCallback"')
        //bridge.callHandler('testObjcCallback', {'foo': 'bar'}, function(response) {
          //log('JS got response', response)
        //})
      //}
    }

)
console.log(apiFunc);
module.exports =apiFunc;
//
//
//module.exports  = {
//
//  showMessage:function(json,callback){
//     //接口名
//     //参数
//     //回调函数
//
//  },
//  pushView:function(json,callback){
//
//
//
//  },
//  popView:function(json,callback){
//
//
//  },
//  setTitle:function(json,callback){
//
//
//  },
//  showLoading:function(sign,callback){
//
//
//  },
//  appRegister:function(name,callback){
//
//
//  }
//}