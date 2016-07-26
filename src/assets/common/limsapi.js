/**
 * Created by hubq on 2016/2/29.
 */
const JsAPI = require('./apifactory');
var jsAPI = new JsAPI();//拿一个API对象
/*
 * 上传图片
 * do注入的参数:{ ‘selectedImages’ : [{ id : ‘123abc’ ,name:’***.png’},
 {id : ‘456zxc’,name:’***.png’]}

 do :function(responseData) {
 alert(responseData. selectedImages[0].id);
 }


 uploadImageHandler回调事件注入参数{id:’’,tempFilePath:’abc123’,result:true}
 * */
module.exports = {
  //H5调用原生
  limsCaller:function(){

    return {
      pushView:function(params,callback){
        jsAPI.limsCaller("pushView",params,callback);
        return this;
      },
      setTitle:function(){
        jsAPI.limsCaller("setTitle",params,callback);
        return this;
      }

    }
  },
  limsRegister:function(){
    return {
       approveBridge:function(callback){
          jsAPI.limsregister("approveBridge",callback);
         return this;
       }
    }
  }
};