
;(function (win, config) {
  //var win = window,
  //	IBSS = win.IBSS;

  //config.host = 'http://10.238.18.59:8016/1.0/';
  config.host = 'http://10.238.18.59:8016/1.0/';
  config.apihost = 'http://10.238.18.59:8016/';
  config.isApp = 1; //1为APP模式，0为WEB模式

  //审核类型  分析任务审核为1，合格证审核为2
  config.approve = [1, 2];

  /**
   * @type {Object}
   * 全局命名空间
   */
  win.LimsUser = win.LimsUser || {};
  LimsUser.IDENTITY = 'SYSTEM'; //当前用户信息
  LimsUser.NAME = '系统'; //客服 id->名字 map
  LimsUser.EMAIL = '';
  LimsUser.ROLE = '';
  LimsUser.GROUP_ID = '';
  LimsUser.position = {
    'latitude': '',
    'longitude': '',
    'message': '',
    'city': ''
  }; //位置信息

  if (config.isApp) {
    LimsUser.IDENTITY='';
    LimsUser.NAME='';
  }


  //判断访问终端
  var browser = {
    versions: function () {
      var u = navigator.userAgent, app = navigator.appVersion;
      return {
        trident: u.indexOf('Trident') > -1, //IE内核
        presto: u.indexOf('Presto') > -1, //opera内核
        webKit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核
        gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1,//火狐内核
        mobile: !!u.match(/AppleWebKit.*Mobile.*/), //是否为移动终端
        ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
        android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, //android终端或者uc浏览器
        iPhone: u.indexOf('iPhone') > -1, //是否为iPhone或者QQHD浏览器
        iPad: u.indexOf('iPad') > -1, //是否iPad
        webApp: u.indexOf('Safari') == -1, //是否web应该程序，没有头部与底部
        weixin: u.indexOf('MicroMessenger') > -1, //是否微信 （2015-01-22新增）
        qq: u.match(/\sQQ/i) == " qq" //是否QQ
      };
    }(),
    language: (navigator.browserLanguage || navigator.language).toLowerCase()
  }
  win.__browser = browser;
  //var baseObj = {
  //		/**
  //		 * 获取用户信息
  //		 */
  //		getAccount: function( callback ){
  //			var me = this;
  //
  //			util.api({
  //				url: '~/g/api/account/getloginaccount',
  //				success: function (data) {
  //
  //					if (data.success) {
  //						IBSS.role = data.value.model;
  //						$('#accountname').text(data.value.model.name);
  //
  //						IBSS.FUNCTIONS = data.value.model.functionCodes.concat(data.value.model.ancientFunctionCodes)
  //
  //						callback && callback();
  //					}
  //				}
  //			});
  //		},
  //	/**
  //     *
  //     * 遍历所有含有 [data-permissons] 属性的元素
  //     * 如果其所含的 code 在 IBSS.FUNCTIONS 内存在
  //     * 则显示
  //    */
  //	setPermissions:function($el){
  //		var $el = $el || $('body');
  //		$el.find('[data-permissions]').each(function(){
  //			var $this = $( this ),
  //			    codes = $this.attr('data-permissions').split(/\s+/);
  //
  //			var bool = false;
  //			for( var i = 0; i < IBSS.FUNCTIONS.length ; i++ ){
  //
  //				for( var j = 0; j < codes.length ; j++ ){
  //					if( codes[j] == IBSS.FUNCTIONS[i] ){
  //						$this.show();
  //						bool = true;
  //						break;
  //					}
  //				}
  //				if(bool == true){
  //					break;
  //				}
  //			}
  //			if(bool == false){
  //				$this.remove();
  //			}
  //		});
  //	}
  //};
  //
  //IBSS.baseObj= baseObj;
})(window, window.LimsConfig || (window.LimsConfig = {}))
