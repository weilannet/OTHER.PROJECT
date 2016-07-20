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
    uploadImage: function (callback) {
        callback && callback(jsAPI);
        return {
            do: function (callback) {
                jsAPI.send(
                    'uploadImage',
                    (responseData)=> {
                        var imgArr = [];
                        if (responseData && responseData.selectedImages) {
                            responseData.selectedImages.forEach((n, i)=> {
                                var imgStr = '<img data-init="0" src="' + n.thumbPath + '" />';
                                imgArr.push(imgStr);
                            });
                        }
                        callback && callback(responseData.selectedImages, imgArr);
                    }
                ).do();
                return this;
            }, on: function (name, callback) {
                jsAPI.on(
                    name,
                    callback
                );
                return this;
            },
            onUploadImageHandler: function (callback) {
                this.on(
                    'uploadImageHandler',
                    callback
                );
                return this;
            }
        };
    },
    getLocations: function (callback) {
        callback && callback(jsAPI);
        return {
            do: function (callback) {
                jsAPI.send(
                    'location',
                    (responseData)=> {

                        callback && callback(responseData);
                    }
                ).do();
                return this;
            }, on: function (name, callback) {
                jsAPI.on(
                    name,
                    callback
                );
                return this;
            }
        };
    }
};