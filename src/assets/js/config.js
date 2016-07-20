;(function(){
	var win = window,
		IBSS = win.IBSS;
	
	var baseObj = {
		/**
		 * 获取用户信息
		 */
		getAccount: function( callback ){
			var me = this;

			util.api({
	            url: '~/g/api/account/getloginaccount',
	            success: function (data) {
	            	
	                if (data.success) {
	                	IBSS.role = data.value.model;
	                    $('#accountname').text(data.value.model.name);
	                    
						IBSS.FUNCTIONS = data.value.model.functionCodes.concat(data.value.model.ancientFunctionCodes) 

	                    callback && callback();
	                }
	            }
	        });	
		},
		/**
	     * 
	     * 遍历所有含有 [data-permissons] 属性的元素
	     * 如果其所含的 code 在 IBSS.FUNCTIONS 内存在
	     * 则显示
	    */
		setPermissions:function($el){
			var $el = $el || $('body');
			$el.find('[data-permissions]').each(function(){
				var $this = $( this ),
				    codes = $this.attr('data-permissions').split(/\s+/);
				
				var bool = false;
				for( var i = 0; i < IBSS.FUNCTIONS.length ; i++ ){

					for( var j = 0; j < codes.length ; j++ ){
						if( codes[j] == IBSS.FUNCTIONS[i] ){
							$this.show();
							bool = true;
							break;
						}
					}
					if(bool == true){
						break;
					}
				}
				if(bool == false){
					$this.remove();
				}
			});
		}
	};
	
	IBSS.baseObj= baseObj;
})()
