/**
 * Created by gaoxin on 2016/8/26.
 */
let limsCaller = require('assets/common/limsapi').limsCaller();

module.exports = {
  getUser:function(callback){
    if (LimsConfig.isApp) {
      limsCaller.getUser(callback);
    }else{
      callback(LimsUser);
    }

  },
  setUser:function(data){

    if (data) {
      LimsUser.IDENTITY = data.IDENTITY;
      LimsUser.NAME = data.NAME;
      LimsUser.EMAIL = data.EMAIL;
      LimsUser.ROLE = data.ROLE;
      LimsUser.GROUP_ID = data.GROUP_ID;

      //responseCallback&&responseCallback(1);
    }

  },
  getURL: function (to) {
  //参数化对象 到字符串
    function paramUrl(obj) {
      obj = obj || {};
      var result = [];
      for (var i in obj) {
        if (obj.hasOwnProperty(i)) {
          result.push(i + "=" + obj[i]);
        }
      }
      return result.join('&');
    }

    //如果存在search属性，则是传入link的query对象
    if (to && to.search) {
      return `${LimsConfig.host}todos.html#${to.pathname}${to.search}`;
    }
    //自己解析参数，拼成URL
    let _query = paramUrl(to.query);
    return `${LimsConfig.host}todos.html#${to.pathname}?${_query}`;
  },

  setTitle: function (name) {
    if (LimsConfig.isApp) {
      limsCaller.setTitle(name);
    }
  },

  popView: function (name) {
    if (LimsConfig.isApp) {
      limsCaller.popView(name);
    }
  }
}
