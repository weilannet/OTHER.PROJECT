
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
