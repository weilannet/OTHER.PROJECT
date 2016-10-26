webpackJsonp([2,4],{

/***/ 0:
/*!****************************!*\
  !*** ./src/todos/todos.js ***!
  \****************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _reactRouter = __webpack_require__(/*! react-router */ 173);
	
	var _iscroll = __webpack_require__(/*! iscroll */ 235);
	
	var _iscroll2 = _interopRequireDefault(_iscroll);
	
	var _reactIscroll = __webpack_require__(/*! components/react-iscroll */ 236);
	
	var _reactIscroll2 = _interopRequireDefault(_reactIscroll);
	
	var _LimsTab = __webpack_require__(/*! ./ref/LimsTab */ 237);
	
	var _LimsTab2 = _interopRequireDefault(_LimsTab);
	
	var _TodoMenu = __webpack_require__(/*! ./ref/TodoMenu */ 238);
	
	var _TodoMenu2 = _interopRequireDefault(_TodoMenu);
	
	var _ViewAnalysis = __webpack_require__(/*! ./ref/ViewAnalysis */ 240);
	
	var _ViewAnalysis2 = _interopRequireDefault(_ViewAnalysis);
	
	var _ViewCoa = __webpack_require__(/*! ./ref/ViewCoa */ 241);
	
	var _ViewCoa2 = _interopRequireDefault(_ViewCoa);
	
	var _AnalysisInfo = __webpack_require__(/*! ./ref/AnalysisInfo */ 242);
	
	var _AnalysisInfo2 = _interopRequireDefault(_AnalysisInfo);
	
	var _AnalysisApprove = __webpack_require__(/*! ./ref/AnalysisApprove */ 243);
	
	var _AnalysisApprove2 = _interopRequireDefault(_AnalysisApprove);
	
	var _CoaInfo = __webpack_require__(/*! ./ref/CoaInfo */ 244);
	
	var _CoaInfo2 = _interopRequireDefault(_CoaInfo);
	
	var _CoaApprove = __webpack_require__(/*! ./ref/CoaApprove */ 245);
	
	var _CoaApprove2 = _interopRequireDefault(_CoaApprove);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	/**
	 * Created by gaoxin on 2016/6/15.
	 */
	
	__webpack_require__(/*! assets/style/reset.css */ 168);
	__webpack_require__(/*! assets/style/common.less */ 170);
	__webpack_require__(/*! ./todos.less */ 246);
	
	var React = __webpack_require__(/*! react */ 1);
	var ReactDOM = __webpack_require__(/*! react-dom */ 38);
	
	
	var limsRegister = __webpack_require__(/*! assets/common/limsapi */ 253).limsRegister();
	
	__webpack_require__(/*! assets/js/util */ 255);
	__webpack_require__(/*! assets/js/config */ 256);
	
	var LimsLink = __webpack_require__(/*! components/LimsLink */ 239);
	
	var TodoHelp = __webpack_require__(/*! ./todohelp */ 257);
	
	var FastClick = __webpack_require__(/*! fastclick */ 258);
	
	var iScrollOptions = {
	  mouseWheel: true,
	  scrollbars: true,
	  scrollX: false,
	  probeType: 3,
	  preventDefaultException: { tagName: /^(INPUT|TEXTAREA|BUTTON|SELECT|LI)$/ }
	};
	
	//审核主页面
	var TodoApp = React.createClass({
	  displayName: 'TodoApp',
	
	  contextTypes: {
	    router: React.PropTypes.object.isRequired
	  },
	  onJsApi: function onJsApi(to) {
	    //H5页面按钮调用原生
	    var _url = TodoHelp.getURL(to);
	    console.log(_url);
	    TodoHelp.pushView({ url: _url }, function () {});
	  },
	  render: function render() {
	    //console.log(this.props.children);
	    return React.createElement(_TodoMenu2.default, { onJsApi: this.onJsApi });
	  },
	  componentWillUnmount: function componentWillUnmount() {}
	});
	
	//Tab组件
	var TodoTab = React.createClass({
	  displayName: 'TodoTab',
	  getInitialState: function getInitialState() {
	    return {
	      tabStatus: 'active'
	
	    };
	  },
	
	  contextTypes: {
	    router: React.PropTypes.object.isRequired
	  },
	
	  componentWillMount: function componentWillMount() {
	    var type = this.props.location.query.type;
	
	
	    switch (parseInt(type)) {
	      case 0:
	        TodoHelp.setTitle('消息管理');
	        break;
	      case 1:
	        TodoHelp.setTitle('分析任务审核');
	        break;
	      case 2:
	        TodoHelp.setTitle('合格证审核');
	        break;
	    }
	  },
	
	  tabClick: function tabClick(sign) {
	    //sign为0是待办，1是已办
	    var type = this.props.location.query.type;
	
	    this.context.type = type;
	    this.context.router.push({
	      pathname: "/todotab/todolist/" + sign,
	      action: "REPLACE",
	      query: { type: type }
	    });
	  },
	  render: function render() {
	    return React.createElement(
	      'div',
	      { id: 'todo-list' },
	      React.createElement(_LimsTab2.default, { tabClick: this.tabClick }),
	      this.props.children
	    );
	  }
	});
	
	//TabList
	var TodoList = React.createClass({
	  displayName: 'TodoList',
	
	  init: {
	    scrollStartPos: 0,
	    scrollPos: 0,
	    downreload: false,
	    upreload: false,
	    refresh: false
	  },
	  defaults: {
	    pageindex: 1,
	    pagesize: 5,
	    uid: ''
	  },
	  getInitialState: function getInitialState() {
	    return {
	      data_analysis: [],
	      data_coa: [],
	      todoDone: 0,
	      todoType: 0,
	      pageindex: this.defaults.pageindex,
	      y: 0,
	      isScrolling: false,
	      loadtip: ''
	    };
	  },
	
	  contextTypes: {
	    router: React.PropTypes.object.isRequired
	  },
	  componentWillMount: function componentWillMount() {
	    this.attachFastClick();
	    var todoDone = this.props.params.isdone;
	    var type = this.props.location.query.type;
	
	    this.setState({ todoDone: todoDone && parseInt(todoDone), todoType: type && parseInt(type) });
	  },
	  componentDidMount: function componentDidMount() {
	    var that = this;
	    TodoHelp.getUser(function (data) {
	      TodoHelp.setUser(data);
	      $.extend(that.defaults, { isDone: that.state.isDone, uid: LimsUser.IDENTITY });
	      that.queryList(that.defaults);
	    });
	  },
	  componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
	
	    if (this.state.todoDone == parseInt(nextProps.params.isdone)) {
	      return;
	    }
	    //this.setState({data_analysis: [], data_coa: [], todoDone: parseInt(nextProps.params.isdone)});
	    $.extend(this.defaults, { isDone: parseInt(nextProps.params.isdone) });
	    this.queryList(this.defaults);
	  },
	  //shouldComponentUpdate(nextProps, nextState){
	  //  //if (this.state.toDone == nextState.todoDone || this.state.todoType == nextProps.todoType){
	  //  //  return false;
	  //  //}
	  //  return true;
	  //
	  //  //return this.state.todoDone != nextState.todoDone; //状态不一致才更新
	  //},
	  attachFastClick: function attachFastClick() {
	    FastClick.attach(document.body);
	  },
	
	  sendAjax: function sendAjax(params) {
	    var _this2 = this;
	
	    var that = this;
	    util.api({
	      url: '/AppService.svc/GetTodosData',
	      data: params,
	      type: 'get',
	      success: function success(data) {
	
	        if (data['msgcode']) {
	          util.hidLoading();
	
	          params.type == 1 ? that.setState({ loadtip: false, todoDone: params.isDone, data_analysis: !that.init.refresh ? data['data']['fields'] : _this2.state.data_analysis.concat(data['data']['fields']) }) : that.setState({ loadtip: false, todoDone: params.isDone, data_coa: !that.init.refresh ? data['data']['fields'] : _this2.state.data_coa.concat(data['data']['fields']) });
	        }
	        that.init.refresh = false;
	        that.init.downreload = false;
	        that.init.upreload = false;
	      },
	      complete: function complete() {}
	    }, false);
	  },
	  queryList: function queryList(params) {
	    //type为审核类型，1为分析任务审核，2为合格证审核
	    util.showLoading();
	
	    if (this.state.todoType == 1 || this.state.todoType == 0) {
	      var params1 = util.clone(params);
	      this.sendAjax($.extend(params1, { type: 1 }));
	    }
	    //如果是消息管理，继续加载列表
	    if (this.state.todoType == 2 || this.state.todoType == 0) {
	      var param2 = util.clone(params);
	      this.sendAjax($.extend(param2, { type: 2 }));
	    }
	  },
	  onJsApi: function onJsApi(to) {
	    var pathObject = { pathname: to.pathname };
	    var _url = TodoHelp.getURL(pathObject);
	
	    var _json = {
	      url: _url,
	      "button": [{
	        "text": "审核",
	        "icon": "",
	        "jsapi": "approveBridge"
	      }],
	      "params": to.query
	    };
	    //如果是已办，不设置button
	    if (this.state.todoDone) {
	      _json['button'].length = 0;
	    }
	    TodoHelp.pushView(_json, function (response) {});
	  },
	  onScrollStart: function onScrollStart(iScrollInstance) {
	    //this.setState({isScrolling: true})
	    //console.log(`start:${iScrollInstance.y}`);
	    var me = iScrollInstance;
	    this.init.scrollStartPos = me.y;
	  },
	  onScrollEnd: function onScrollEnd(iScrollInstance) {
	    var me = iScrollInstance;
	
	    if (this.init.downreload || this.init.upreload) {
	
	      if (this.init.downreload) {
	        this.defaults.pageindex++;
	        this.init.refresh = true;
	      }
	      if (this.init.upreload) {
	        this.defaults.pageindex = 1;
	        this.init.refresh = false;
	      }
	      this.queryList(this.defaults);
	      me.scroller.querySelector('.upreload').innerHTML = '上拉可加载更多数据';
	      me.scroller.querySelector('.downfresh').innerHTML = '下拉刷新';
	    }
	
	    //this.setState({isScrolling: false, y: iScrollInstance.y})
	    //console.log(`end:${iScrollInstance.y}`);
	  },
	  onScrollRefresh: function onScrollRefresh(iScrollInstance) {
	
	    var hasVerticalScroll = iScrollInstance.hasVerticalScroll;
	
	    if (this.state.canVerticallyScroll !== hasVerticalScroll) {
	      this.setState({ canVerticallyScroll: hasVerticalScroll });
	    }
	  },
	  onScroll: function onScroll(iScrollInstance) {
	    var me = iScrollInstance;
	
	    if (me.y < me.maxScrollY - 50) {
	      this.init.downreload = true;
	      me.scroller.querySelector('.upreload').innerHTML = '松手加载数据';
	    }
	    if (me.y > 50) {
	      console.log('up');
	      this.init.upreload = true;
	      me.scroller.querySelector('.downfresh').innerHTML = '松手刷新数据';
	    }
	
	    //console.log(`onScroll:${iScrollInstance.y}`);
	  },
	  render: function render() {
	    var _this3 = this;
	
	    //根据params.id不同，请求不同list
	    var createItemAnaysis = function createItemAnaysis(item, index) {
	      return React.createElement(
	        LimsLink,
	        { className: 'link-item', onJsApi: _this3.onJsApi,
	          to: { pathname: '/todoinfo', query: { sign: _this3.state.todoType, type: 1, data: encodeURIComponent(JSON.stringify(item && item['fieldList'])) } } },
	        React.createElement(_ViewAnalysis2.default, { todoType: _this3.state.pageindex, todoDone: _this3.state.todoDone, item: item && item['fieldList'] })
	      );
	    };
	    var createItemCoa = function createItemCoa(item, index) {
	      return React.createElement(
	        LimsLink,
	        { className: 'link-item', onJsApi: _this3.onJsApi,
	          to: { pathname: '/todoinfo', query: { sign: _this3.state.todoType, type: 2, data: encodeURIComponent(JSON.stringify(item && item['fieldList'])) } } },
	        React.createElement(_ViewCoa2.default, { todoType: _this3.state.pageindex, todoDone: _this3.state.todoDone, item: item && item['fieldList'] })
	      );
	    };
	
	    return React.createElement(
	      'div',
	      { id: 'wrapper' },
	      React.createElement(
	        _reactIscroll2.default,
	        { iScroll: _iscroll2.default,
	          options: iScrollOptions,
	          onScrollStart: this.onScrollStart,
	          onScrollEnd: this.onScrollEnd,
	          onRefresh: this.onScrollRefresh,
	          onScroll: this.onScroll },
	        React.createElement(
	          'div',
	          { id: 'scroller' },
	          React.createElement(
	            'div',
	            { className: 'downfresh' },
	            '下拉刷新'
	          ),
	          (this.state.todoType == 1 || this.state.todoType == 0) && this.state.data_analysis && this.state.data_analysis.map(createItemAnaysis),
	          (this.state.todoType == 2 || this.state.todoType == 0) && this.state.data_coa && this.state.data_coa.map(createItemCoa),
	          React.createElement(
	            'div',
	            { className: 'upreload' },
	            '上拉可加载更多数据'
	          )
	        )
	      )
	    );
	  }
	
	});
	
	//TabInfo
	var TodoInfo = React.createClass({
	  displayName: 'TodoInfo',
	
	  defaults: {
	    recordkey: ''
	  },
	  getInitialState: function getInitialState() {
	    return {
	      type: 0,
	      result: null
	    };
	  },
	
	  onAppApi: function onAppApi(query) {
	    //H5页面按钮调用原生
	    var _url = TodoHelp.getURL({ pathname: '/todoapprove', query: query });
	    TodoHelp.pushView({ url: _url }, function (response) {});
	  },
	  componentWillMount: function componentWillMount() {
	
	    //如果是app模式则注册JS桥
	    if (LimsConfig.isApp) {
	      TodoHelp.setTitle('详细数据');
	      //拿到LOCATION,调用JS桥推送location页面
	      var _this = this;
	      limsRegister.approveBridge(function (data, responseCallback) {
	
	        //推审核的页面
	        if (typeof data == "string") {
	          data = JSON.parse(data);
	        }
	        data['data'] = _this.defaults.recordkey;
	        _this.onAppApi(data);
	      });
	
	      limsRegister.todoInfoBridge(function (data, responseCallback) {
	        responseCallback(data);
	        //推审核的页面
	
	        if (typeof data == "string") {
	          data = JSON.parse(data);
	        }
	        //_this.defaults.result = data['data'];
	        //alert( _this.defaults.result);
	        //_this.defaults.type = data['type'];
	        this.setState({ result: data['data'], type: data['type'] });
	      });
	    }
	  },
	  componentDidMount: function componentDidMount() {},
	  contextTypes: {
	    currentInfo: React.PropTypes.object
	  },
	  render: function render() {
	    alert(this.state.type);
	    var _props$location$query = this.props.location.query;
	    var data = _props$location$query.data;
	    var type = _props$location$query.type;
	    //为安卓机做兼容，如果为null，则走特殊的JS桥
	    //debugger
	
	    if (this.state.result) {
	      data = this.state.result;
	      type = this.state.type;
	    }
	
	    //var data = '%5B%7B%22id%22%3A%22IDENTITY%22%2C%22text%22%3A%22%E5%A7%94%E6%89%98%E5%8D%95%E5%8F%B7%22%2C%22value%22%3A%2239784%22%2C%22is_main%22%3A1%2C%22is_show%22%3A1%7D%2C%7B%22id%22%3A%22DELEGATOR_DATE%22%2C%22text%22%3A%22%E5%A7%94%E6%89%98%E6%97%B6%E9%97%B4%22%2C%22value%22%3A%222015%2F12%2F4%2017%3A36%3A20%22%2C%22is_main%22%3A1%2C%22is_show%22%3A1%7D%2C%7B%22id%22%3A%22DELEGATOR_NAME%22%2C%22text%22%3A%22%E5%A7%94%E6%89%98%E4%BA%BA%22%2C%22value%22%3A%22SYSTEM%22%2C%22is_main%22%3A1%2C%22is_show%22%3A1%7D%2C%7B%22id%22%3A%22ORDER_NUM%22%2C%22text%22%3A%22ORDER_NUM%22%2C%22value%22%3A%22%20%20%20%20%20%20%20%20%202%22%2C%22is_main%22%3A0%2C%22is_show%22%3A0%7D%2C%7B%22id%22%3A%22LO_NAME%22%2C%22text%22%3A%22%E8%A3%85%E7%BD%AE%22%2C%22value%22%3A%2222%E7%BD%90%E5%8C%BA%22%2C%22is_main%22%3A1%2C%22is_show%22%3A1%7D%2C%7B%22id%22%3A%22SP_NAME%22%2C%22text%22%3A%22%E9%87%87%E6%A0%B7%E7%82%B9%22%2C%22value%22%3A%222201%E7%BD%90%22%2C%22is_main%22%3A1%2C%22is_show%22%3A1%7D%2C%7B%22id%22%3A%22SAMPLE_NAME%22%2C%22text%22%3A%22%E6%A0%B7%E5%93%81%E5%90%8D%E7%A7%B0%22%2C%22value%22%3A%22%22%2C%22is_main%22%3A0%2C%22is_show%22%3A1%7D%2C%7B%22id%22%3A%22ANALYSIS_TYPE%22%2C%22text%22%3A%22%E5%88%86%E6%9E%90%E7%B1%BB%E5%9E%8B%22%2C%22value%22%3A%22%E6%AF%94%E5%AF%B9%E6%A0%B7%E5%93%81%22%2C%22is_main%22%3A0%2C%22is_show%22%3A1%7D%2C%7B%22id%22%3A%22ANALYSIS_ITEM%22%2C%22text%22%3A%22%E5%88%86%E6%9E%90%E9%A1%B9%E7%9B%AE%22%2C%22value%22%3A%22%22%2C%22is_main%22%3A0%2C%22is_show%22%3A1%7D%5D'
	    //var type=1;
	    var result = data && JSON.parse(decodeURIComponent(data)) || [];
	    var _iteratorNormalCompletion = true;
	    var _didIteratorError = false;
	    var _iteratorError = undefined;
	
	    try {
	      for (var _iterator = result[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
	        var item = _step.value;
	
	        if (item['id'] == 'IDENTITY' || item['id'] == 'ID') {
	          this.defaults.recordkey = item['value'];
	          break;
	        }
	      }
	    } catch (err) {
	      _didIteratorError = true;
	      _iteratorError = err;
	    } finally {
	      try {
	        if (!_iteratorNormalCompletion && _iterator.return) {
	          _iterator.return();
	        }
	      } finally {
	        if (_didIteratorError) {
	          throw _iteratorError;
	        }
	      }
	    }
	
	    switch (parseInt(type)) {
	      case 1:
	        return React.createElement(
	          'div',
	          null,
	          React.createElement(_AnalysisInfo2.default, { data: result, recordkey: this.defaults.recordkey }),
	          !LimsConfig.isApp ? React.createElement(
	            'div',
	            { onClick: function onClick() {
	                _reactRouter.browserHistory.goBack();
	              } },
	            '点我返回'
	          ) : ''
	        );
	        break;
	      case 2:
	        return React.createElement(
	          'div',
	          null,
	          React.createElement(_CoaInfo2.default, { data: result, recordkey: this.defaults.recordkey }),
	          !LimsConfig.isApp ? React.createElement(
	            'div',
	            { onClick: function onClick() {
	                _reactRouter.browserHistory.goBack();
	              } },
	            '点我返回'
	          ) : ''
	        );
	        break;
	      default:
	        return React.createElement(
	          'div',
	          null,
	          '暂无数据'
	        );
	        break;
	
	    }
	  }
	});
	
	//TodoApprove
	var TodoApprove = React.createClass({
	  displayName: 'TodoApprove',
	
	  defaults: {
	    uid: '',
	    recordkey: '',
	    uname: '',
	    type: 0,
	    sign: 0 //跳转到消息管理还是其他审核
	
	  },
	  propType: {
	    todoStatus: React.PropTypes.int
	  },
	  getDefaultProps: function getDefaultProps() {
	    return {
	      todoStatus: 1
	    };
	  },
	
	  contextTypes: {
	    router: React.PropTypes.object.isRequired
	  },
	  componentWillMount: function componentWillMount() {
	    //data修改为ID，因为安卓传参不兼容 by xin.gao@2016.10.24
	    var _props$location$query2 = this.props.location.query;
	    var data = _props$location$query2.data;
	    var type = _props$location$query2.type;
	    var sign = _props$location$query2.sign;
	
	    this.defaults.recordkey = data;
	    this.defaults.type = type;
	    this.defaults.sign = sign;
	    TodoHelp.setTitle(type == 1 ? '委托单号' + this.defaults.recordkey : '样品编号' + this.defaults.recordkey);
	  },
	  submitForm: function submitForm(action, text) {
	
	    var recordkey = this.defaults.recordkey;
	    var uname = '系统';
	    var uid = '';
	
	    var posturl = this.defaults.type == 1 ? 'CheckAnalysis' : 'CheckCoa';
	    var postData = { action: action, text: text, recordkey: recordkey, uname: uname, uid: uid };
	
	    TodoHelp.getUser(function (data) {
	      TodoHelp.setUser(data);
	
	      $.extend(postData, { uid: LimsUser.IDENTITY });
	
	      util.showLoading();
	      util.api({
	        url: '/AppService.svc/' + posturl,
	        data: postData,
	        type: 'get',
	        success: function success(data) {
	
	          if (data['msgcode']) {
	            util.hidLoading();
	            util.showTip('提交成功!1s后跳转');
	            setTimeout(function () {
	              TodoHelp.popView('message');
	              //sign为0是待办，1是已办,此处判断进入消息管理
	              //that.context.router.push(
	              //    {
	              //      pathname: "/todotab/todolist/0",
	              //      action: "REPLACE",
	              //      query: {type: type}
	              //    }
	              //);
	              //util.hidLoading();
	            }, 1000);
	          }
	        },
	        complete: function complete() {}
	      }, false);
	    });
	  },
	  render: function render() {
	    var type = this.props.location.query.type;
	
	    switch (parseInt(type)) {
	      case 1:
	        return React.createElement(
	          'div',
	          null,
	          React.createElement(_AnalysisApprove2.default, { submitForm: this.submitForm }),
	          !LimsConfig.isApp ? React.createElement(
	            'div',
	            { onClick: function onClick() {
	                _reactRouter.browserHistory.goBack();
	              } },
	            '点我返回'
	          ) : ''
	        );
	        break;
	      case 2:
	        return React.createElement(
	          'div',
	          null,
	          React.createElement(_CoaApprove2.default, { submitForm: this.submitForm }),
	          !LimsConfig.isApp ? React.createElement(
	            'div',
	            { onClick: function onClick() {
	                _reactRouter.browserHistory.goBack();
	              } },
	            '点我返回'
	          ) : ''
	        );
	        break;
	      default:
	        break;
	
	    }
	  }
	});
	
	//NoMatch
	var NoMatch = React.createClass({
	  displayName: 'NoMatch',
	  render: function render() {
	    return React.createElement(
	      'h3',
	      null,
	      '没有匹配的路径'
	    );
	  }
	});
	
	var Dashboard = React.createClass({
	  displayName: 'Dashboard',
	  render: function render() {
	    return React.createElement(
	      'div',
	      null,
	      'Welcome to the app!'
	    );
	  }
	});
	
	var DashboardAbout = React.createClass({
	  displayName: 'DashboardAbout',
	  render: function render() {
	    return React.createElement(
	      'div',
	      null,
	      'Welcome to the 审核!'
	    );
	  }
	});
	
	ReactDOM.render(React.createElement(
	  'div',
	  null,
	  React.createElement(
	    _reactRouter.Router,
	    { history: _reactRouter.hashHistory, location: 'history' },
	    React.createElement(_reactRouter.Route, { path: '/', component: TodoApp }),
	    React.createElement(
	      _reactRouter.Route,
	      { path: 'todotab', component: TodoTab, onLeave: function onLeave() {
	          console.log("离开了about路由页面");
	        },
	        onEnter: function onEnter() {
	          console.log("进入about路由页面");
	        } },
	      React.createElement(_reactRouter.IndexRoute, { component: DashboardAbout }),
	      React.createElement(
	        _reactRouter.Route,
	        { path: 'todolist/:isdone', component: TodoList },
	        React.createElement(_reactRouter.IndexRoute, { component: Dashboard })
	      )
	    ),
	    React.createElement(_reactRouter.Route, { path: 'todoinfo', component: TodoInfo }),
	    React.createElement(_reactRouter.Route, { path: 'todoapprove', component: TodoApprove }),
	    React.createElement(_reactRouter.Route, { path: '*', component: NoMatch })
	  )
	), document.getElementById('app'));

/***/ },

/***/ 168:
/*!************************************!*\
  !*** ./src/assets/style/reset.css ***!
  \************************************/
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },

/***/ 170:
/*!**************************************!*\
  !*** ./src/assets/style/common.less ***!
  \**************************************/
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },

/***/ 235:
/*!******************************************!*\
  !*** ./~/iscroll/build/iscroll-probe.js ***!
  \******************************************/
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;/*! iScroll v5.2.0 ~ (c) 2008-2016 Matteo Spinelli ~ http://cubiq.org/license */
	(function (window, document, Math) {
	var rAF = window.requestAnimationFrame	||
		window.webkitRequestAnimationFrame	||
		window.mozRequestAnimationFrame		||
		window.oRequestAnimationFrame		||
		window.msRequestAnimationFrame		||
		function (callback) { window.setTimeout(callback, 1000 / 60); };
	
	var utils = (function () {
		var me = {};
	
		var _elementStyle = document.createElement('div').style;
		var _vendor = (function () {
			var vendors = ['t', 'webkitT', 'MozT', 'msT', 'OT'],
				transform,
				i = 0,
				l = vendors.length;
	
			for ( ; i < l; i++ ) {
				transform = vendors[i] + 'ransform';
				if ( transform in _elementStyle ) return vendors[i].substr(0, vendors[i].length-1);
			}
	
			return false;
		})();
	
		function _prefixStyle (style) {
			if ( _vendor === false ) return false;
			if ( _vendor === '' ) return style;
			return _vendor + style.charAt(0).toUpperCase() + style.substr(1);
		}
	
		me.getTime = Date.now || function getTime () { return new Date().getTime(); };
	
		me.extend = function (target, obj) {
			for ( var i in obj ) {
				target[i] = obj[i];
			}
		};
	
		me.addEvent = function (el, type, fn, capture) {
			el.addEventListener(type, fn, !!capture);
		};
	
		me.removeEvent = function (el, type, fn, capture) {
			el.removeEventListener(type, fn, !!capture);
		};
	
		me.prefixPointerEvent = function (pointerEvent) {
			return window.MSPointerEvent ?
				'MSPointer' + pointerEvent.charAt(7).toUpperCase() + pointerEvent.substr(8):
				pointerEvent;
		};
	
		me.momentum = function (current, start, time, lowerMargin, wrapperSize, deceleration) {
			var distance = current - start,
				speed = Math.abs(distance) / time,
				destination,
				duration;
	
			deceleration = deceleration === undefined ? 0.0006 : deceleration;
	
			destination = current + ( speed * speed ) / ( 2 * deceleration ) * ( distance < 0 ? -1 : 1 );
			duration = speed / deceleration;
	
			if ( destination < lowerMargin ) {
				destination = wrapperSize ? lowerMargin - ( wrapperSize / 2.5 * ( speed / 8 ) ) : lowerMargin;
				distance = Math.abs(destination - current);
				duration = distance / speed;
			} else if ( destination > 0 ) {
				destination = wrapperSize ? wrapperSize / 2.5 * ( speed / 8 ) : 0;
				distance = Math.abs(current) + destination;
				duration = distance / speed;
			}
	
			return {
				destination: Math.round(destination),
				duration: duration
			};
		};
	
		var _transform = _prefixStyle('transform');
	
		me.extend(me, {
			hasTransform: _transform !== false,
			hasPerspective: _prefixStyle('perspective') in _elementStyle,
			hasTouch: 'ontouchstart' in window,
			hasPointer: !!(window.PointerEvent || window.MSPointerEvent), // IE10 is prefixed
			hasTransition: _prefixStyle('transition') in _elementStyle
		});
	
		/*
		This should find all Android browsers lower than build 535.19 (both stock browser and webview)
		- galaxy S2 is ok
	    - 2.3.6 : `AppleWebKit/533.1 (KHTML, like Gecko) Version/4.0 Mobile Safari/533.1`
	    - 4.0.4 : `AppleWebKit/534.30 (KHTML, like Gecko) Version/4.0 Mobile Safari/534.30`
	   - galaxy S3 is badAndroid (stock brower, webview)
	     `AppleWebKit/534.30 (KHTML, like Gecko) Version/4.0 Mobile Safari/534.30`
	   - galaxy S4 is badAndroid (stock brower, webview)
	     `AppleWebKit/534.30 (KHTML, like Gecko) Version/4.0 Mobile Safari/534.30`
	   - galaxy S5 is OK
	     `AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Mobile Safari/537.36 (Chrome/)`
	   - galaxy S6 is OK
	     `AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Mobile Safari/537.36 (Chrome/)`
	  */
		me.isBadAndroid = (function() {
			var appVersion = window.navigator.appVersion;
			// Android browser is not a chrome browser.
			if (/Android/.test(appVersion) && !(/Chrome\/\d/.test(appVersion))) {
				var safariVersion = appVersion.match(/Safari\/(\d+.\d)/);
				if(safariVersion && typeof safariVersion === "object" && safariVersion.length >= 2) {
					return parseFloat(safariVersion[1]) < 535.19;
				} else {
					return true;
				}
			} else {
				return false;
			}
		})();
	
		me.extend(me.style = {}, {
			transform: _transform,
			transitionTimingFunction: _prefixStyle('transitionTimingFunction'),
			transitionDuration: _prefixStyle('transitionDuration'),
			transitionDelay: _prefixStyle('transitionDelay'),
			transformOrigin: _prefixStyle('transformOrigin')
		});
	
		me.hasClass = function (e, c) {
			var re = new RegExp("(^|\\s)" + c + "(\\s|$)");
			return re.test(e.className);
		};
	
		me.addClass = function (e, c) {
			if ( me.hasClass(e, c) ) {
				return;
			}
	
			var newclass = e.className.split(' ');
			newclass.push(c);
			e.className = newclass.join(' ');
		};
	
		me.removeClass = function (e, c) {
			if ( !me.hasClass(e, c) ) {
				return;
			}
	
			var re = new RegExp("(^|\\s)" + c + "(\\s|$)", 'g');
			e.className = e.className.replace(re, ' ');
		};
	
		me.offset = function (el) {
			var left = -el.offsetLeft,
				top = -el.offsetTop;
	
			// jshint -W084
			while (el = el.offsetParent) {
				left -= el.offsetLeft;
				top -= el.offsetTop;
			}
			// jshint +W084
	
			return {
				left: left,
				top: top
			};
		};
	
		me.preventDefaultException = function (el, exceptions) {
			for ( var i in exceptions ) {
				if ( exceptions[i].test(el[i]) ) {
					return true;
				}
			}
	
			return false;
		};
	
		me.extend(me.eventType = {}, {
			touchstart: 1,
			touchmove: 1,
			touchend: 1,
	
			mousedown: 2,
			mousemove: 2,
			mouseup: 2,
	
			pointerdown: 3,
			pointermove: 3,
			pointerup: 3,
	
			MSPointerDown: 3,
			MSPointerMove: 3,
			MSPointerUp: 3
		});
	
		me.extend(me.ease = {}, {
			quadratic: {
				style: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
				fn: function (k) {
					return k * ( 2 - k );
				}
			},
			circular: {
				style: 'cubic-bezier(0.1, 0.57, 0.1, 1)',	// Not properly "circular" but this looks better, it should be (0.075, 0.82, 0.165, 1)
				fn: function (k) {
					return Math.sqrt( 1 - ( --k * k ) );
				}
			},
			back: {
				style: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)',
				fn: function (k) {
					var b = 4;
					return ( k = k - 1 ) * k * ( ( b + 1 ) * k + b ) + 1;
				}
			},
			bounce: {
				style: '',
				fn: function (k) {
					if ( ( k /= 1 ) < ( 1 / 2.75 ) ) {
						return 7.5625 * k * k;
					} else if ( k < ( 2 / 2.75 ) ) {
						return 7.5625 * ( k -= ( 1.5 / 2.75 ) ) * k + 0.75;
					} else if ( k < ( 2.5 / 2.75 ) ) {
						return 7.5625 * ( k -= ( 2.25 / 2.75 ) ) * k + 0.9375;
					} else {
						return 7.5625 * ( k -= ( 2.625 / 2.75 ) ) * k + 0.984375;
					}
				}
			},
			elastic: {
				style: '',
				fn: function (k) {
					var f = 0.22,
						e = 0.4;
	
					if ( k === 0 ) { return 0; }
					if ( k == 1 ) { return 1; }
	
					return ( e * Math.pow( 2, - 10 * k ) * Math.sin( ( k - f / 4 ) * ( 2 * Math.PI ) / f ) + 1 );
				}
			}
		});
	
		me.tap = function (e, eventName) {
			var ev = document.createEvent('Event');
			ev.initEvent(eventName, true, true);
			ev.pageX = e.pageX;
			ev.pageY = e.pageY;
			e.target.dispatchEvent(ev);
		};
	
		me.click = function (e) {
			var target = e.target,
				ev;
	
			if ( !(/(SELECT|INPUT|TEXTAREA)/i).test(target.tagName) ) {
				ev = document.createEvent('MouseEvents');
				ev.initMouseEvent('click', true, true, e.view, 1,
					target.screenX, target.screenY, target.clientX, target.clientY,
					e.ctrlKey, e.altKey, e.shiftKey, e.metaKey,
					0, null);
	
				ev._constructed = true;
				target.dispatchEvent(ev);
			}
		};
	
		return me;
	})();
	function IScroll (el, options) {
		this.wrapper = typeof el == 'string' ? document.querySelector(el) : el;
		this.scroller = this.wrapper.children[0];
		this.scrollerStyle = this.scroller.style;		// cache style for better performance
	
		this.options = {
	
			resizeScrollbars: true,
	
			mouseWheelSpeed: 20,
	
			snapThreshold: 0.334,
	
	// INSERT POINT: OPTIONS
			disablePointer : !utils.hasPointer,
			disableTouch : utils.hasPointer || !utils.hasTouch,
			disableMouse : utils.hasPointer || utils.hasTouch,
			startX: 0,
			startY: 0,
			scrollY: true,
			directionLockThreshold: 5,
			momentum: true,
	
			bounce: true,
			bounceTime: 600,
			bounceEasing: '',
	
			preventDefault: true,
			preventDefaultException: { tagName: /^(INPUT|TEXTAREA|BUTTON|SELECT)$/ },
	
			HWCompositing: true,
			useTransition: true,
			useTransform: true,
			bindToWrapper: typeof window.onmousedown === "undefined"
		};
	
		for ( var i in options ) {
			this.options[i] = options[i];
		}
	
		// Normalize options
		this.translateZ = this.options.HWCompositing && utils.hasPerspective ? ' translateZ(0)' : '';
	
		this.options.useTransition = utils.hasTransition && this.options.useTransition;
		this.options.useTransform = utils.hasTransform && this.options.useTransform;
	
		this.options.eventPassthrough = this.options.eventPassthrough === true ? 'vertical' : this.options.eventPassthrough;
		this.options.preventDefault = !this.options.eventPassthrough && this.options.preventDefault;
	
		// If you want eventPassthrough I have to lock one of the axes
		this.options.scrollY = this.options.eventPassthrough == 'vertical' ? false : this.options.scrollY;
		this.options.scrollX = this.options.eventPassthrough == 'horizontal' ? false : this.options.scrollX;
	
		// With eventPassthrough we also need lockDirection mechanism
		this.options.freeScroll = this.options.freeScroll && !this.options.eventPassthrough;
		this.options.directionLockThreshold = this.options.eventPassthrough ? 0 : this.options.directionLockThreshold;
	
		this.options.bounceEasing = typeof this.options.bounceEasing == 'string' ? utils.ease[this.options.bounceEasing] || utils.ease.circular : this.options.bounceEasing;
	
		this.options.resizePolling = this.options.resizePolling === undefined ? 60 : this.options.resizePolling;
	
		if ( this.options.tap === true ) {
			this.options.tap = 'tap';
		}
	
		if ( this.options.shrinkScrollbars == 'scale' ) {
			this.options.useTransition = false;
		}
	
		this.options.invertWheelDirection = this.options.invertWheelDirection ? -1 : 1;
	
		if ( this.options.probeType == 3 ) {
			this.options.useTransition = false;	}
	
	// INSERT POINT: NORMALIZATION
	
		// Some defaults
		this.x = 0;
		this.y = 0;
		this.directionX = 0;
		this.directionY = 0;
		this._events = {};
	
	// INSERT POINT: DEFAULTS
	
		this._init();
		this.refresh();
	
		this.scrollTo(this.options.startX, this.options.startY);
		this.enable();
	}
	
	IScroll.prototype = {
		version: '5.2.0',
	
		_init: function () {
			this._initEvents();
	
			if ( this.options.scrollbars || this.options.indicators ) {
				this._initIndicators();
			}
	
			if ( this.options.mouseWheel ) {
				this._initWheel();
			}
	
			if ( this.options.snap ) {
				this._initSnap();
			}
	
			if ( this.options.keyBindings ) {
				this._initKeys();
			}
	
	// INSERT POINT: _init
	
		},
	
		destroy: function () {
			this._initEvents(true);
			clearTimeout(this.resizeTimeout);
	 		this.resizeTimeout = null;
			this._execEvent('destroy');
		},
	
		_transitionEnd: function (e) {
			if ( e.target != this.scroller || !this.isInTransition ) {
				return;
			}
	
			this._transitionTime();
			if ( !this.resetPosition(this.options.bounceTime) ) {
				this.isInTransition = false;
				this._execEvent('scrollEnd');
			}
		},
	
		_start: function (e) {
			// React to left mouse button only
			if ( utils.eventType[e.type] != 1 ) {
			  // for button property
			  // http://unixpapa.com/js/mouse.html
			  var button;
		    if (!e.which) {
		      /* IE case */
		      button = (e.button < 2) ? 0 :
		               ((e.button == 4) ? 1 : 2);
		    } else {
		      /* All others */
		      button = e.button;
		    }
				if ( button !== 0 ) {
					return;
				}
			}
	
			if ( !this.enabled || (this.initiated && utils.eventType[e.type] !== this.initiated) ) {
				return;
			}
	
			if ( this.options.preventDefault && !utils.isBadAndroid && !utils.preventDefaultException(e.target, this.options.preventDefaultException) ) {
				e.preventDefault();
			}
	
			var point = e.touches ? e.touches[0] : e,
				pos;
	
			this.initiated	= utils.eventType[e.type];
			this.moved		= false;
			this.distX		= 0;
			this.distY		= 0;
			this.directionX = 0;
			this.directionY = 0;
			this.directionLocked = 0;
	
			this.startTime = utils.getTime();
	
			if ( this.options.useTransition && this.isInTransition ) {
				this._transitionTime();
				this.isInTransition = false;
				pos = this.getComputedPosition();
				this._translate(Math.round(pos.x), Math.round(pos.y));
				this._execEvent('scrollEnd');
			} else if ( !this.options.useTransition && this.isAnimating ) {
				this.isAnimating = false;
				this._execEvent('scrollEnd');
			}
	
			this.startX    = this.x;
			this.startY    = this.y;
			this.absStartX = this.x;
			this.absStartY = this.y;
			this.pointX    = point.pageX;
			this.pointY    = point.pageY;
	
			this._execEvent('beforeScrollStart');
		},
	
		_move: function (e) {
			if ( !this.enabled || utils.eventType[e.type] !== this.initiated ) {
				return;
			}
	
			if ( this.options.preventDefault ) {	// increases performance on Android? TODO: check!
				e.preventDefault();
			}
	
			var point		= e.touches ? e.touches[0] : e,
				deltaX		= point.pageX - this.pointX,
				deltaY		= point.pageY - this.pointY,
				timestamp	= utils.getTime(),
				newX, newY,
				absDistX, absDistY;
	
			this.pointX		= point.pageX;
			this.pointY		= point.pageY;
	
			this.distX		+= deltaX;
			this.distY		+= deltaY;
			absDistX		= Math.abs(this.distX);
			absDistY		= Math.abs(this.distY);
	
			// We need to move at least 10 pixels for the scrolling to initiate
			if ( timestamp - this.endTime > 300 && (absDistX < 10 && absDistY < 10) ) {
				return;
			}
	
			// If you are scrolling in one direction lock the other
			if ( !this.directionLocked && !this.options.freeScroll ) {
				if ( absDistX > absDistY + this.options.directionLockThreshold ) {
					this.directionLocked = 'h';		// lock horizontally
				} else if ( absDistY >= absDistX + this.options.directionLockThreshold ) {
					this.directionLocked = 'v';		// lock vertically
				} else {
					this.directionLocked = 'n';		// no lock
				}
			}
	
			if ( this.directionLocked == 'h' ) {
				if ( this.options.eventPassthrough == 'vertical' ) {
					e.preventDefault();
				} else if ( this.options.eventPassthrough == 'horizontal' ) {
					this.initiated = false;
					return;
				}
	
				deltaY = 0;
			} else if ( this.directionLocked == 'v' ) {
				if ( this.options.eventPassthrough == 'horizontal' ) {
					e.preventDefault();
				} else if ( this.options.eventPassthrough == 'vertical' ) {
					this.initiated = false;
					return;
				}
	
				deltaX = 0;
			}
	
			deltaX = this.hasHorizontalScroll ? deltaX : 0;
			deltaY = this.hasVerticalScroll ? deltaY : 0;
	
			newX = this.x + deltaX;
			newY = this.y + deltaY;
	
			// Slow down if outside of the boundaries
			if ( newX > 0 || newX < this.maxScrollX ) {
				newX = this.options.bounce ? this.x + deltaX / 3 : newX > 0 ? 0 : this.maxScrollX;
			}
			if ( newY > 0 || newY < this.maxScrollY ) {
				newY = this.options.bounce ? this.y + deltaY / 3 : newY > 0 ? 0 : this.maxScrollY;
			}
	
			this.directionX = deltaX > 0 ? -1 : deltaX < 0 ? 1 : 0;
			this.directionY = deltaY > 0 ? -1 : deltaY < 0 ? 1 : 0;
	
			if ( !this.moved ) {
				this._execEvent('scrollStart');
			}
	
			this.moved = true;
	
			this._translate(newX, newY);
	
	/* REPLACE START: _move */
			if ( timestamp - this.startTime > 300 ) {
				this.startTime = timestamp;
				this.startX = this.x;
				this.startY = this.y;
	
				if ( this.options.probeType == 1 ) {
					this._execEvent('scroll');
				}
			}
	
			if ( this.options.probeType > 1 ) {
				this._execEvent('scroll');
			}
	/* REPLACE END: _move */
	
		},
	
		_end: function (e) {
			if ( !this.enabled || utils.eventType[e.type] !== this.initiated ) {
				return;
			}
	
			if ( this.options.preventDefault && !utils.preventDefaultException(e.target, this.options.preventDefaultException) ) {
				e.preventDefault();
			}
	
			var point = e.changedTouches ? e.changedTouches[0] : e,
				momentumX,
				momentumY,
				duration = utils.getTime() - this.startTime,
				newX = Math.round(this.x),
				newY = Math.round(this.y),
				distanceX = Math.abs(newX - this.startX),
				distanceY = Math.abs(newY - this.startY),
				time = 0,
				easing = '';
	
			this.isInTransition = 0;
			this.initiated = 0;
			this.endTime = utils.getTime();
	
			// reset if we are outside of the boundaries
			if ( this.resetPosition(this.options.bounceTime) ) {
				return;
			}
	
			this.scrollTo(newX, newY);	// ensures that the last position is rounded
	
			// we scrolled less than 10 pixels
			if ( !this.moved ) {
				if ( this.options.tap ) {
					utils.tap(e, this.options.tap);
				}
	
				if ( this.options.click ) {
					utils.click(e);
				}
	
				this._execEvent('scrollCancel');
				return;
			}
	
			if ( this._events.flick && duration < 200 && distanceX < 100 && distanceY < 100 ) {
				this._execEvent('flick');
				return;
			}
	
			// start momentum animation if needed
			if ( this.options.momentum && duration < 300 ) {
				momentumX = this.hasHorizontalScroll ? utils.momentum(this.x, this.startX, duration, this.maxScrollX, this.options.bounce ? this.wrapperWidth : 0, this.options.deceleration) : { destination: newX, duration: 0 };
				momentumY = this.hasVerticalScroll ? utils.momentum(this.y, this.startY, duration, this.maxScrollY, this.options.bounce ? this.wrapperHeight : 0, this.options.deceleration) : { destination: newY, duration: 0 };
				newX = momentumX.destination;
				newY = momentumY.destination;
				time = Math.max(momentumX.duration, momentumY.duration);
				this.isInTransition = 1;
			}
	
	
			if ( this.options.snap ) {
				var snap = this._nearestSnap(newX, newY);
				this.currentPage = snap;
				time = this.options.snapSpeed || Math.max(
						Math.max(
							Math.min(Math.abs(newX - snap.x), 1000),
							Math.min(Math.abs(newY - snap.y), 1000)
						), 300);
				newX = snap.x;
				newY = snap.y;
	
				this.directionX = 0;
				this.directionY = 0;
				easing = this.options.bounceEasing;
			}
	
	// INSERT POINT: _end
	
			if ( newX != this.x || newY != this.y ) {
				// change easing function when scroller goes out of the boundaries
				if ( newX > 0 || newX < this.maxScrollX || newY > 0 || newY < this.maxScrollY ) {
					easing = utils.ease.quadratic;
				}
	
				this.scrollTo(newX, newY, time, easing);
				return;
			}
	
			this._execEvent('scrollEnd');
		},
	
		_resize: function () {
			var that = this;
	
			clearTimeout(this.resizeTimeout);
	
			this.resizeTimeout = setTimeout(function () {
				that.refresh();
			}, this.options.resizePolling);
		},
	
		resetPosition: function (time) {
			var x = this.x,
				y = this.y;
	
			time = time || 0;
	
			if ( !this.hasHorizontalScroll || this.x > 0 ) {
				x = 0;
			} else if ( this.x < this.maxScrollX ) {
				x = this.maxScrollX;
			}
	
			if ( !this.hasVerticalScroll || this.y > 0 ) {
				y = 0;
			} else if ( this.y < this.maxScrollY ) {
				y = this.maxScrollY;
			}
	
			if ( x == this.x && y == this.y ) {
				return false;
			}
	
			this.scrollTo(x, y, time, this.options.bounceEasing);
	
			return true;
		},
	
		disable: function () {
			this.enabled = false;
		},
	
		enable: function () {
			this.enabled = true;
		},
	
		refresh: function () {
			var rf = this.wrapper.offsetHeight;		// Force reflow
	
			this.wrapperWidth	= this.wrapper.clientWidth;
			this.wrapperHeight	= this.wrapper.clientHeight;
	
	/* REPLACE START: refresh */
	
			this.scrollerWidth	= this.scroller.offsetWidth;
			this.scrollerHeight	= this.scroller.offsetHeight;
	
			this.maxScrollX		= this.wrapperWidth - this.scrollerWidth;
			this.maxScrollY		= this.wrapperHeight - this.scrollerHeight;
	
	/* REPLACE END: refresh */
	
			this.hasHorizontalScroll	= this.options.scrollX && this.maxScrollX < 0;
			this.hasVerticalScroll		= this.options.scrollY && this.maxScrollY < 0;
	
			if ( !this.hasHorizontalScroll ) {
				this.maxScrollX = 0;
				this.scrollerWidth = this.wrapperWidth;
			}
	
			if ( !this.hasVerticalScroll ) {
				this.maxScrollY = 0;
				this.scrollerHeight = this.wrapperHeight;
			}
	
			this.endTime = 0;
			this.directionX = 0;
			this.directionY = 0;
	
			this.wrapperOffset = utils.offset(this.wrapper);
	
			this._execEvent('refresh');
	
			this.resetPosition();
	
	// INSERT POINT: _refresh
	
		},
	
		on: function (type, fn) {
			if ( !this._events[type] ) {
				this._events[type] = [];
			}
	
			this._events[type].push(fn);
		},
	
		off: function (type, fn) {
			if ( !this._events[type] ) {
				return;
			}
	
			var index = this._events[type].indexOf(fn);
	
			if ( index > -1 ) {
				this._events[type].splice(index, 1);
			}
		},
	
		_execEvent: function (type) {
			if ( !this._events[type] ) {
				return;
			}
	
			var i = 0,
				l = this._events[type].length;
	
			if ( !l ) {
				return;
			}
	
			for ( ; i < l; i++ ) {
				this._events[type][i].apply(this, [].slice.call(arguments, 1));
			}
		},
	
		scrollBy: function (x, y, time, easing) {
			x = this.x + x;
			y = this.y + y;
			time = time || 0;
	
			this.scrollTo(x, y, time, easing);
		},
	
		scrollTo: function (x, y, time, easing) {
			easing = easing || utils.ease.circular;
	
			this.isInTransition = this.options.useTransition && time > 0;
			var transitionType = this.options.useTransition && easing.style;
			if ( !time || transitionType ) {
					if(transitionType) {
						this._transitionTimingFunction(easing.style);
						this._transitionTime(time);
					}
				this._translate(x, y);
			} else {
				this._animate(x, y, time, easing.fn);
			}
		},
	
		scrollToElement: function (el, time, offsetX, offsetY, easing) {
			el = el.nodeType ? el : this.scroller.querySelector(el);
	
			if ( !el ) {
				return;
			}
	
			var pos = utils.offset(el);
	
			pos.left -= this.wrapperOffset.left;
			pos.top  -= this.wrapperOffset.top;
	
			// if offsetX/Y are true we center the element to the screen
			if ( offsetX === true ) {
				offsetX = Math.round(el.offsetWidth / 2 - this.wrapper.offsetWidth / 2);
			}
			if ( offsetY === true ) {
				offsetY = Math.round(el.offsetHeight / 2 - this.wrapper.offsetHeight / 2);
			}
	
			pos.left -= offsetX || 0;
			pos.top  -= offsetY || 0;
	
			pos.left = pos.left > 0 ? 0 : pos.left < this.maxScrollX ? this.maxScrollX : pos.left;
			pos.top  = pos.top  > 0 ? 0 : pos.top  < this.maxScrollY ? this.maxScrollY : pos.top;
	
			time = time === undefined || time === null || time === 'auto' ? Math.max(Math.abs(this.x-pos.left), Math.abs(this.y-pos.top)) : time;
	
			this.scrollTo(pos.left, pos.top, time, easing);
		},
	
		_transitionTime: function (time) {
			time = time || 0;
	
			var durationProp = utils.style.transitionDuration;
			this.scrollerStyle[durationProp] = time + 'ms';
	
			if ( !time && utils.isBadAndroid ) {
				this.scrollerStyle[durationProp] = '0.0001ms';
				// remove 0.0001ms
				var self = this;
				rAF(function() {
					if(self.scrollerStyle[durationProp] === '0.0001ms') {
						self.scrollerStyle[durationProp] = '0s';
					}
				});
			}
	
	
			if ( this.indicators ) {
				for ( var i = this.indicators.length; i--; ) {
					this.indicators[i].transitionTime(time);
				}
			}
	
	
	// INSERT POINT: _transitionTime
	
		},
	
		_transitionTimingFunction: function (easing) {
			this.scrollerStyle[utils.style.transitionTimingFunction] = easing;
	
	
			if ( this.indicators ) {
				for ( var i = this.indicators.length; i--; ) {
					this.indicators[i].transitionTimingFunction(easing);
				}
			}
	
	
	// INSERT POINT: _transitionTimingFunction
	
		},
	
		_translate: function (x, y) {
			if ( this.options.useTransform ) {
	
	/* REPLACE START: _translate */
	
				this.scrollerStyle[utils.style.transform] = 'translate(' + x + 'px,' + y + 'px)' + this.translateZ;
	
	/* REPLACE END: _translate */
	
			} else {
				x = Math.round(x);
				y = Math.round(y);
				this.scrollerStyle.left = x + 'px';
				this.scrollerStyle.top = y + 'px';
			}
	
			this.x = x;
			this.y = y;
	
	
		if ( this.indicators ) {
			for ( var i = this.indicators.length; i--; ) {
				this.indicators[i].updatePosition();
			}
		}
	
	
	// INSERT POINT: _translate
	
		},
	
		_initEvents: function (remove) {
			var eventType = remove ? utils.removeEvent : utils.addEvent,
				target = this.options.bindToWrapper ? this.wrapper : window;
	
			eventType(window, 'orientationchange', this);
			eventType(window, 'resize', this);
	
			if ( this.options.click ) {
				eventType(this.wrapper, 'click', this, true);
			}
	
			if ( !this.options.disableMouse ) {
				eventType(this.wrapper, 'mousedown', this);
				eventType(target, 'mousemove', this);
				eventType(target, 'mousecancel', this);
				eventType(target, 'mouseup', this);
			}
	
			if ( utils.hasPointer && !this.options.disablePointer ) {
				eventType(this.wrapper, utils.prefixPointerEvent('pointerdown'), this);
				eventType(target, utils.prefixPointerEvent('pointermove'), this);
				eventType(target, utils.prefixPointerEvent('pointercancel'), this);
				eventType(target, utils.prefixPointerEvent('pointerup'), this);
			}
	
			if ( utils.hasTouch && !this.options.disableTouch ) {
				eventType(this.wrapper, 'touchstart', this);
				eventType(target, 'touchmove', this);
				eventType(target, 'touchcancel', this);
				eventType(target, 'touchend', this);
			}
	
			eventType(this.scroller, 'transitionend', this);
			eventType(this.scroller, 'webkitTransitionEnd', this);
			eventType(this.scroller, 'oTransitionEnd', this);
			eventType(this.scroller, 'MSTransitionEnd', this);
		},
	
		getComputedPosition: function () {
			var matrix = window.getComputedStyle(this.scroller, null),
				x, y;
	
			if ( this.options.useTransform ) {
				matrix = matrix[utils.style.transform].split(')')[0].split(', ');
				x = +(matrix[12] || matrix[4]);
				y = +(matrix[13] || matrix[5]);
			} else {
				x = +matrix.left.replace(/[^-\d.]/g, '');
				y = +matrix.top.replace(/[^-\d.]/g, '');
			}
	
			return { x: x, y: y };
		},
		_initIndicators: function () {
			var interactive = this.options.interactiveScrollbars,
				customStyle = typeof this.options.scrollbars != 'string',
				indicators = [],
				indicator;
	
			var that = this;
	
			this.indicators = [];
	
			if ( this.options.scrollbars ) {
				// Vertical scrollbar
				if ( this.options.scrollY ) {
					indicator = {
						el: createDefaultScrollbar('v', interactive, this.options.scrollbars),
						interactive: interactive,
						defaultScrollbars: true,
						customStyle: customStyle,
						resize: this.options.resizeScrollbars,
						shrink: this.options.shrinkScrollbars,
						fade: this.options.fadeScrollbars,
						listenX: false
					};
	
					this.wrapper.appendChild(indicator.el);
					indicators.push(indicator);
				}
	
				// Horizontal scrollbar
				if ( this.options.scrollX ) {
					indicator = {
						el: createDefaultScrollbar('h', interactive, this.options.scrollbars),
						interactive: interactive,
						defaultScrollbars: true,
						customStyle: customStyle,
						resize: this.options.resizeScrollbars,
						shrink: this.options.shrinkScrollbars,
						fade: this.options.fadeScrollbars,
						listenY: false
					};
	
					this.wrapper.appendChild(indicator.el);
					indicators.push(indicator);
				}
			}
	
			if ( this.options.indicators ) {
				// TODO: check concat compatibility
				indicators = indicators.concat(this.options.indicators);
			}
	
			for ( var i = indicators.length; i--; ) {
				this.indicators.push( new Indicator(this, indicators[i]) );
			}
	
			// TODO: check if we can use array.map (wide compatibility and performance issues)
			function _indicatorsMap (fn) {
				if (that.indicators) {
					for ( var i = that.indicators.length; i--; ) {
						fn.call(that.indicators[i]);
					}
				}
			}
	
			if ( this.options.fadeScrollbars ) {
				this.on('scrollEnd', function () {
					_indicatorsMap(function () {
						this.fade();
					});
				});
	
				this.on('scrollCancel', function () {
					_indicatorsMap(function () {
						this.fade();
					});
				});
	
				this.on('scrollStart', function () {
					_indicatorsMap(function () {
						this.fade(1);
					});
				});
	
				this.on('beforeScrollStart', function () {
					_indicatorsMap(function () {
						this.fade(1, true);
					});
				});
			}
	
	
			this.on('refresh', function () {
				_indicatorsMap(function () {
					this.refresh();
				});
			});
	
			this.on('destroy', function () {
				_indicatorsMap(function () {
					this.destroy();
				});
	
				delete this.indicators;
			});
		},
	
		_initWheel: function () {
			utils.addEvent(this.wrapper, 'wheel', this);
			utils.addEvent(this.wrapper, 'mousewheel', this);
			utils.addEvent(this.wrapper, 'DOMMouseScroll', this);
	
			this.on('destroy', function () {
				clearTimeout(this.wheelTimeout);
				this.wheelTimeout = null;
				utils.removeEvent(this.wrapper, 'wheel', this);
				utils.removeEvent(this.wrapper, 'mousewheel', this);
				utils.removeEvent(this.wrapper, 'DOMMouseScroll', this);
			});
		},
	
		_wheel: function (e) {
			if ( !this.enabled ) {
				return;
			}
	
			e.preventDefault();
	
			var wheelDeltaX, wheelDeltaY,
				newX, newY,
				that = this;
	
			if ( this.wheelTimeout === undefined ) {
				that._execEvent('scrollStart');
			}
	
			// Execute the scrollEnd event after 400ms the wheel stopped scrolling
			clearTimeout(this.wheelTimeout);
			this.wheelTimeout = setTimeout(function () {
				if(!that.options.snap) {
					that._execEvent('scrollEnd');
				}
				that.wheelTimeout = undefined;
			}, 400);
	
			if ( 'deltaX' in e ) {
				if (e.deltaMode === 1) {
					wheelDeltaX = -e.deltaX * this.options.mouseWheelSpeed;
					wheelDeltaY = -e.deltaY * this.options.mouseWheelSpeed;
				} else {
					wheelDeltaX = -e.deltaX;
					wheelDeltaY = -e.deltaY;
				}
			} else if ( 'wheelDeltaX' in e ) {
				wheelDeltaX = e.wheelDeltaX / 120 * this.options.mouseWheelSpeed;
				wheelDeltaY = e.wheelDeltaY / 120 * this.options.mouseWheelSpeed;
			} else if ( 'wheelDelta' in e ) {
				wheelDeltaX = wheelDeltaY = e.wheelDelta / 120 * this.options.mouseWheelSpeed;
			} else if ( 'detail' in e ) {
				wheelDeltaX = wheelDeltaY = -e.detail / 3 * this.options.mouseWheelSpeed;
			} else {
				return;
			}
	
			wheelDeltaX *= this.options.invertWheelDirection;
			wheelDeltaY *= this.options.invertWheelDirection;
	
			if ( !this.hasVerticalScroll ) {
				wheelDeltaX = wheelDeltaY;
				wheelDeltaY = 0;
			}
	
			if ( this.options.snap ) {
				newX = this.currentPage.pageX;
				newY = this.currentPage.pageY;
	
				if ( wheelDeltaX > 0 ) {
					newX--;
				} else if ( wheelDeltaX < 0 ) {
					newX++;
				}
	
				if ( wheelDeltaY > 0 ) {
					newY--;
				} else if ( wheelDeltaY < 0 ) {
					newY++;
				}
	
				this.goToPage(newX, newY);
	
				return;
			}
	
			newX = this.x + Math.round(this.hasHorizontalScroll ? wheelDeltaX : 0);
			newY = this.y + Math.round(this.hasVerticalScroll ? wheelDeltaY : 0);
	
			this.directionX = wheelDeltaX > 0 ? -1 : wheelDeltaX < 0 ? 1 : 0;
			this.directionY = wheelDeltaY > 0 ? -1 : wheelDeltaY < 0 ? 1 : 0;
	
			if ( newX > 0 ) {
				newX = 0;
			} else if ( newX < this.maxScrollX ) {
				newX = this.maxScrollX;
			}
	
			if ( newY > 0 ) {
				newY = 0;
			} else if ( newY < this.maxScrollY ) {
				newY = this.maxScrollY;
			}
	
			this.scrollTo(newX, newY, 0);
	
			if ( this.options.probeType > 1 ) {
				this._execEvent('scroll');
			}
	
	// INSERT POINT: _wheel
		},
	
		_initSnap: function () {
			this.currentPage = {};
	
			if ( typeof this.options.snap == 'string' ) {
				this.options.snap = this.scroller.querySelectorAll(this.options.snap);
			}
	
			this.on('refresh', function () {
				var i = 0, l,
					m = 0, n,
					cx, cy,
					x = 0, y,
					stepX = this.options.snapStepX || this.wrapperWidth,
					stepY = this.options.snapStepY || this.wrapperHeight,
					el;
	
				this.pages = [];
	
				if ( !this.wrapperWidth || !this.wrapperHeight || !this.scrollerWidth || !this.scrollerHeight ) {
					return;
				}
	
				if ( this.options.snap === true ) {
					cx = Math.round( stepX / 2 );
					cy = Math.round( stepY / 2 );
	
					while ( x > -this.scrollerWidth ) {
						this.pages[i] = [];
						l = 0;
						y = 0;
	
						while ( y > -this.scrollerHeight ) {
							this.pages[i][l] = {
								x: Math.max(x, this.maxScrollX),
								y: Math.max(y, this.maxScrollY),
								width: stepX,
								height: stepY,
								cx: x - cx,
								cy: y - cy
							};
	
							y -= stepY;
							l++;
						}
	
						x -= stepX;
						i++;
					}
				} else {
					el = this.options.snap;
					l = el.length;
					n = -1;
	
					for ( ; i < l; i++ ) {
						if ( i === 0 || el[i].offsetLeft <= el[i-1].offsetLeft ) {
							m = 0;
							n++;
						}
	
						if ( !this.pages[m] ) {
							this.pages[m] = [];
						}
	
						x = Math.max(-el[i].offsetLeft, this.maxScrollX);
						y = Math.max(-el[i].offsetTop, this.maxScrollY);
						cx = x - Math.round(el[i].offsetWidth / 2);
						cy = y - Math.round(el[i].offsetHeight / 2);
	
						this.pages[m][n] = {
							x: x,
							y: y,
							width: el[i].offsetWidth,
							height: el[i].offsetHeight,
							cx: cx,
							cy: cy
						};
	
						if ( x > this.maxScrollX ) {
							m++;
						}
					}
				}
	
				this.goToPage(this.currentPage.pageX || 0, this.currentPage.pageY || 0, 0);
	
				// Update snap threshold if needed
				if ( this.options.snapThreshold % 1 === 0 ) {
					this.snapThresholdX = this.options.snapThreshold;
					this.snapThresholdY = this.options.snapThreshold;
				} else {
					this.snapThresholdX = Math.round(this.pages[this.currentPage.pageX][this.currentPage.pageY].width * this.options.snapThreshold);
					this.snapThresholdY = Math.round(this.pages[this.currentPage.pageX][this.currentPage.pageY].height * this.options.snapThreshold);
				}
			});
	
			this.on('flick', function () {
				var time = this.options.snapSpeed || Math.max(
						Math.max(
							Math.min(Math.abs(this.x - this.startX), 1000),
							Math.min(Math.abs(this.y - this.startY), 1000)
						), 300);
	
				this.goToPage(
					this.currentPage.pageX + this.directionX,
					this.currentPage.pageY + this.directionY,
					time
				);
			});
		},
	
		_nearestSnap: function (x, y) {
			if ( !this.pages.length ) {
				return { x: 0, y: 0, pageX: 0, pageY: 0 };
			}
	
			var i = 0,
				l = this.pages.length,
				m = 0;
	
			// Check if we exceeded the snap threshold
			if ( Math.abs(x - this.absStartX) < this.snapThresholdX &&
				Math.abs(y - this.absStartY) < this.snapThresholdY ) {
				return this.currentPage;
			}
	
			if ( x > 0 ) {
				x = 0;
			} else if ( x < this.maxScrollX ) {
				x = this.maxScrollX;
			}
	
			if ( y > 0 ) {
				y = 0;
			} else if ( y < this.maxScrollY ) {
				y = this.maxScrollY;
			}
	
			for ( ; i < l; i++ ) {
				if ( x >= this.pages[i][0].cx ) {
					x = this.pages[i][0].x;
					break;
				}
			}
	
			l = this.pages[i].length;
	
			for ( ; m < l; m++ ) {
				if ( y >= this.pages[0][m].cy ) {
					y = this.pages[0][m].y;
					break;
				}
			}
	
			if ( i == this.currentPage.pageX ) {
				i += this.directionX;
	
				if ( i < 0 ) {
					i = 0;
				} else if ( i >= this.pages.length ) {
					i = this.pages.length - 1;
				}
	
				x = this.pages[i][0].x;
			}
	
			if ( m == this.currentPage.pageY ) {
				m += this.directionY;
	
				if ( m < 0 ) {
					m = 0;
				} else if ( m >= this.pages[0].length ) {
					m = this.pages[0].length - 1;
				}
	
				y = this.pages[0][m].y;
			}
	
			return {
				x: x,
				y: y,
				pageX: i,
				pageY: m
			};
		},
	
		goToPage: function (x, y, time, easing) {
			easing = easing || this.options.bounceEasing;
	
			if ( x >= this.pages.length ) {
				x = this.pages.length - 1;
			} else if ( x < 0 ) {
				x = 0;
			}
	
			if ( y >= this.pages[x].length ) {
				y = this.pages[x].length - 1;
			} else if ( y < 0 ) {
				y = 0;
			}
	
			var posX = this.pages[x][y].x,
				posY = this.pages[x][y].y;
	
			time = time === undefined ? this.options.snapSpeed || Math.max(
				Math.max(
					Math.min(Math.abs(posX - this.x), 1000),
					Math.min(Math.abs(posY - this.y), 1000)
				), 300) : time;
	
			this.currentPage = {
				x: posX,
				y: posY,
				pageX: x,
				pageY: y
			};
	
			this.scrollTo(posX, posY, time, easing);
		},
	
		next: function (time, easing) {
			var x = this.currentPage.pageX,
				y = this.currentPage.pageY;
	
			x++;
	
			if ( x >= this.pages.length && this.hasVerticalScroll ) {
				x = 0;
				y++;
			}
	
			this.goToPage(x, y, time, easing);
		},
	
		prev: function (time, easing) {
			var x = this.currentPage.pageX,
				y = this.currentPage.pageY;
	
			x--;
	
			if ( x < 0 && this.hasVerticalScroll ) {
				x = 0;
				y--;
			}
	
			this.goToPage(x, y, time, easing);
		},
	
		_initKeys: function (e) {
			// default key bindings
			var keys = {
				pageUp: 33,
				pageDown: 34,
				end: 35,
				home: 36,
				left: 37,
				up: 38,
				right: 39,
				down: 40
			};
			var i;
	
			// if you give me characters I give you keycode
			if ( typeof this.options.keyBindings == 'object' ) {
				for ( i in this.options.keyBindings ) {
					if ( typeof this.options.keyBindings[i] == 'string' ) {
						this.options.keyBindings[i] = this.options.keyBindings[i].toUpperCase().charCodeAt(0);
					}
				}
			} else {
				this.options.keyBindings = {};
			}
	
			for ( i in keys ) {
				this.options.keyBindings[i] = this.options.keyBindings[i] || keys[i];
			}
	
			utils.addEvent(window, 'keydown', this);
	
			this.on('destroy', function () {
				utils.removeEvent(window, 'keydown', this);
			});
		},
	
		_key: function (e) {
			if ( !this.enabled ) {
				return;
			}
	
			var snap = this.options.snap,	// we are using this alot, better to cache it
				newX = snap ? this.currentPage.pageX : this.x,
				newY = snap ? this.currentPage.pageY : this.y,
				now = utils.getTime(),
				prevTime = this.keyTime || 0,
				acceleration = 0.250,
				pos;
	
			if ( this.options.useTransition && this.isInTransition ) {
				pos = this.getComputedPosition();
	
				this._translate(Math.round(pos.x), Math.round(pos.y));
				this.isInTransition = false;
			}
	
			this.keyAcceleration = now - prevTime < 200 ? Math.min(this.keyAcceleration + acceleration, 50) : 0;
	
			switch ( e.keyCode ) {
				case this.options.keyBindings.pageUp:
					if ( this.hasHorizontalScroll && !this.hasVerticalScroll ) {
						newX += snap ? 1 : this.wrapperWidth;
					} else {
						newY += snap ? 1 : this.wrapperHeight;
					}
					break;
				case this.options.keyBindings.pageDown:
					if ( this.hasHorizontalScroll && !this.hasVerticalScroll ) {
						newX -= snap ? 1 : this.wrapperWidth;
					} else {
						newY -= snap ? 1 : this.wrapperHeight;
					}
					break;
				case this.options.keyBindings.end:
					newX = snap ? this.pages.length-1 : this.maxScrollX;
					newY = snap ? this.pages[0].length-1 : this.maxScrollY;
					break;
				case this.options.keyBindings.home:
					newX = 0;
					newY = 0;
					break;
				case this.options.keyBindings.left:
					newX += snap ? -1 : 5 + this.keyAcceleration>>0;
					break;
				case this.options.keyBindings.up:
					newY += snap ? 1 : 5 + this.keyAcceleration>>0;
					break;
				case this.options.keyBindings.right:
					newX -= snap ? -1 : 5 + this.keyAcceleration>>0;
					break;
				case this.options.keyBindings.down:
					newY -= snap ? 1 : 5 + this.keyAcceleration>>0;
					break;
				default:
					return;
			}
	
			if ( snap ) {
				this.goToPage(newX, newY);
				return;
			}
	
			if ( newX > 0 ) {
				newX = 0;
				this.keyAcceleration = 0;
			} else if ( newX < this.maxScrollX ) {
				newX = this.maxScrollX;
				this.keyAcceleration = 0;
			}
	
			if ( newY > 0 ) {
				newY = 0;
				this.keyAcceleration = 0;
			} else if ( newY < this.maxScrollY ) {
				newY = this.maxScrollY;
				this.keyAcceleration = 0;
			}
	
			this.scrollTo(newX, newY, 0);
	
			this.keyTime = now;
		},
	
		_animate: function (destX, destY, duration, easingFn) {
			var that = this,
				startX = this.x,
				startY = this.y,
				startTime = utils.getTime(),
				destTime = startTime + duration;
	
			function step () {
				var now = utils.getTime(),
					newX, newY,
					easing;
	
				if ( now >= destTime ) {
					that.isAnimating = false;
					that._translate(destX, destY);
					
					if ( !that.resetPosition(that.options.bounceTime) ) {
						that._execEvent('scrollEnd');
					}
	
					return;
				}
	
				now = ( now - startTime ) / duration;
				easing = easingFn(now);
				newX = ( destX - startX ) * easing + startX;
				newY = ( destY - startY ) * easing + startY;
				that._translate(newX, newY);
	
				if ( that.isAnimating ) {
					rAF(step);
				}
	
				if ( that.options.probeType == 3 ) {
					that._execEvent('scroll');
				}
			}
	
			this.isAnimating = true;
			step();
		},
	
		handleEvent: function (e) {
	
			switch ( e.type ) {
				case 'touchstart':
				case 'pointerdown':
				case 'MSPointerDown':
				case 'mousedown':
					this._start(e);
					break;
				case 'touchmove':
				case 'pointermove':
				case 'MSPointerMove':
				case 'mousemove':
					this._move(e);
					break;
				case 'touchend':
				case 'pointerup':
				case 'MSPointerUp':
				case 'mouseup':
				case 'touchcancel':
				case 'pointercancel':
				case 'MSPointerCancel':
				case 'mousecancel':
					this._end(e);
					break;
				case 'orientationchange':
				case 'resize':
					this._resize();
					break;
				case 'transitionend':
				case 'webkitTransitionEnd':
				case 'oTransitionEnd':
				case 'MSTransitionEnd':
					this._transitionEnd(e);
					break;
				case 'wheel':
				case 'DOMMouseScroll':
				case 'mousewheel':
					this._wheel(e);
					break;
				case 'keydown':
					this._key(e);
					break;
				case 'click':
					if ( this.enabled && !e._constructed ) {
						e.preventDefault();
						e.stopPropagation();
					}
					break;
			}
		}
	};
	function createDefaultScrollbar (direction, interactive, type) {
		var scrollbar = document.createElement('div'),
			indicator = document.createElement('div');
	
		if ( type === true ) {
			scrollbar.style.cssText = 'position:absolute;z-index:9999';
			indicator.style.cssText = '-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;position:absolute;background:rgba(0,0,0,0.5);border:1px solid rgba(255,255,255,0.9);border-radius:3px';
		}
	
		indicator.className = 'iScrollIndicator';
	
		if ( direction == 'h' ) {
			if ( type === true ) {
				scrollbar.style.cssText += ';height:7px;left:2px;right:2px;bottom:0';
				indicator.style.height = '100%';
			}
			scrollbar.className = 'iScrollHorizontalScrollbar';
		} else {
			if ( type === true ) {
				scrollbar.style.cssText += ';width:7px;bottom:2px;top:2px;right:1px';
				indicator.style.width = '100%';
			}
			scrollbar.className = 'iScrollVerticalScrollbar';
		}
	
		scrollbar.style.cssText += ';overflow:hidden';
	
		if ( !interactive ) {
			scrollbar.style.pointerEvents = 'none';
		}
	
		scrollbar.appendChild(indicator);
	
		return scrollbar;
	}
	
	function Indicator (scroller, options) {
		this.wrapper = typeof options.el == 'string' ? document.querySelector(options.el) : options.el;
		this.wrapperStyle = this.wrapper.style;
		this.indicator = this.wrapper.children[0];
		this.indicatorStyle = this.indicator.style;
		this.scroller = scroller;
	
		this.options = {
			listenX: true,
			listenY: true,
			interactive: false,
			resize: true,
			defaultScrollbars: false,
			shrink: false,
			fade: false,
			speedRatioX: 0,
			speedRatioY: 0
		};
	
		for ( var i in options ) {
			this.options[i] = options[i];
		}
	
		this.sizeRatioX = 1;
		this.sizeRatioY = 1;
		this.maxPosX = 0;
		this.maxPosY = 0;
	
		if ( this.options.interactive ) {
			if ( !this.options.disableTouch ) {
				utils.addEvent(this.indicator, 'touchstart', this);
				utils.addEvent(window, 'touchend', this);
			}
			if ( !this.options.disablePointer ) {
				utils.addEvent(this.indicator, utils.prefixPointerEvent('pointerdown'), this);
				utils.addEvent(window, utils.prefixPointerEvent('pointerup'), this);
			}
			if ( !this.options.disableMouse ) {
				utils.addEvent(this.indicator, 'mousedown', this);
				utils.addEvent(window, 'mouseup', this);
			}
		}
	
		if ( this.options.fade ) {
			this.wrapperStyle[utils.style.transform] = this.scroller.translateZ;
			var durationProp = utils.style.transitionDuration;
			this.wrapperStyle[durationProp] = utils.isBadAndroid ? '0.0001ms' : '0ms';
			// remove 0.0001ms
			var self = this;
			if(utils.isBadAndroid) {
				rAF(function() {
					if(self.wrapperStyle[durationProp] === '0.0001ms') {
						self.wrapperStyle[durationProp] = '0s';
					}
				});
			}
			this.wrapperStyle.opacity = '0';
		}
	}
	
	Indicator.prototype = {
		handleEvent: function (e) {
			switch ( e.type ) {
				case 'touchstart':
				case 'pointerdown':
				case 'MSPointerDown':
				case 'mousedown':
					this._start(e);
					break;
				case 'touchmove':
				case 'pointermove':
				case 'MSPointerMove':
				case 'mousemove':
					this._move(e);
					break;
				case 'touchend':
				case 'pointerup':
				case 'MSPointerUp':
				case 'mouseup':
				case 'touchcancel':
				case 'pointercancel':
				case 'MSPointerCancel':
				case 'mousecancel':
					this._end(e);
					break;
			}
		},
	
		destroy: function () {
			if ( this.options.fadeScrollbars ) {
				clearTimeout(this.fadeTimeout);
				this.fadeTimeout = null;
			}
			if ( this.options.interactive ) {
				utils.removeEvent(this.indicator, 'touchstart', this);
				utils.removeEvent(this.indicator, utils.prefixPointerEvent('pointerdown'), this);
				utils.removeEvent(this.indicator, 'mousedown', this);
	
				utils.removeEvent(window, 'touchmove', this);
				utils.removeEvent(window, utils.prefixPointerEvent('pointermove'), this);
				utils.removeEvent(window, 'mousemove', this);
	
				utils.removeEvent(window, 'touchend', this);
				utils.removeEvent(window, utils.prefixPointerEvent('pointerup'), this);
				utils.removeEvent(window, 'mouseup', this);
			}
	
			if ( this.options.defaultScrollbars ) {
				this.wrapper.parentNode.removeChild(this.wrapper);
			}
		},
	
		_start: function (e) {
			var point = e.touches ? e.touches[0] : e;
	
			e.preventDefault();
			e.stopPropagation();
	
			this.transitionTime();
	
			this.initiated = true;
			this.moved = false;
			this.lastPointX	= point.pageX;
			this.lastPointY	= point.pageY;
	
			this.startTime	= utils.getTime();
	
			if ( !this.options.disableTouch ) {
				utils.addEvent(window, 'touchmove', this);
			}
			if ( !this.options.disablePointer ) {
				utils.addEvent(window, utils.prefixPointerEvent('pointermove'), this);
			}
			if ( !this.options.disableMouse ) {
				utils.addEvent(window, 'mousemove', this);
			}
	
			this.scroller._execEvent('beforeScrollStart');
		},
	
		_move: function (e) {
			var point = e.touches ? e.touches[0] : e,
				deltaX, deltaY,
				newX, newY,
				timestamp = utils.getTime();
	
			if ( !this.moved ) {
				this.scroller._execEvent('scrollStart');
			}
	
			this.moved = true;
	
			deltaX = point.pageX - this.lastPointX;
			this.lastPointX = point.pageX;
	
			deltaY = point.pageY - this.lastPointY;
			this.lastPointY = point.pageY;
	
			newX = this.x + deltaX;
			newY = this.y + deltaY;
	
			this._pos(newX, newY);
	
	
			if ( this.scroller.options.probeType == 1 && timestamp - this.startTime > 300 ) {
				this.startTime = timestamp;
				this.scroller._execEvent('scroll');
			} else if ( this.scroller.options.probeType > 1 ) {
				this.scroller._execEvent('scroll');
			}
	
	
	// INSERT POINT: indicator._move
	
			e.preventDefault();
			e.stopPropagation();
		},
	
		_end: function (e) {
			if ( !this.initiated ) {
				return;
			}
	
			this.initiated = false;
	
			e.preventDefault();
			e.stopPropagation();
	
			utils.removeEvent(window, 'touchmove', this);
			utils.removeEvent(window, utils.prefixPointerEvent('pointermove'), this);
			utils.removeEvent(window, 'mousemove', this);
	
			if ( this.scroller.options.snap ) {
				var snap = this.scroller._nearestSnap(this.scroller.x, this.scroller.y);
	
				var time = this.options.snapSpeed || Math.max(
						Math.max(
							Math.min(Math.abs(this.scroller.x - snap.x), 1000),
							Math.min(Math.abs(this.scroller.y - snap.y), 1000)
						), 300);
	
				if ( this.scroller.x != snap.x || this.scroller.y != snap.y ) {
					this.scroller.directionX = 0;
					this.scroller.directionY = 0;
					this.scroller.currentPage = snap;
					this.scroller.scrollTo(snap.x, snap.y, time, this.scroller.options.bounceEasing);
				}
			}
	
			if ( this.moved ) {
				this.scroller._execEvent('scrollEnd');
			}
		},
	
		transitionTime: function (time) {
			time = time || 0;
			var durationProp = utils.style.transitionDuration;
			this.indicatorStyle[durationProp] = time + 'ms';
	
			if ( !time && utils.isBadAndroid ) {
				this.indicatorStyle[durationProp] = '0.0001ms';
				// remove 0.0001ms
				var self = this;
				rAF(function() {
					if(self.indicatorStyle[durationProp] === '0.0001ms') {
						self.indicatorStyle[durationProp] = '0s';
					}
				});
			}
		},
	
		transitionTimingFunction: function (easing) {
			this.indicatorStyle[utils.style.transitionTimingFunction] = easing;
		},
	
		refresh: function () {
			this.transitionTime();
	
			if ( this.options.listenX && !this.options.listenY ) {
				this.indicatorStyle.display = this.scroller.hasHorizontalScroll ? 'block' : 'none';
			} else if ( this.options.listenY && !this.options.listenX ) {
				this.indicatorStyle.display = this.scroller.hasVerticalScroll ? 'block' : 'none';
			} else {
				this.indicatorStyle.display = this.scroller.hasHorizontalScroll || this.scroller.hasVerticalScroll ? 'block' : 'none';
			}
	
			if ( this.scroller.hasHorizontalScroll && this.scroller.hasVerticalScroll ) {
				utils.addClass(this.wrapper, 'iScrollBothScrollbars');
				utils.removeClass(this.wrapper, 'iScrollLoneScrollbar');
	
				if ( this.options.defaultScrollbars && this.options.customStyle ) {
					if ( this.options.listenX ) {
						this.wrapper.style.right = '8px';
					} else {
						this.wrapper.style.bottom = '8px';
					}
				}
			} else {
				utils.removeClass(this.wrapper, 'iScrollBothScrollbars');
				utils.addClass(this.wrapper, 'iScrollLoneScrollbar');
	
				if ( this.options.defaultScrollbars && this.options.customStyle ) {
					if ( this.options.listenX ) {
						this.wrapper.style.right = '2px';
					} else {
						this.wrapper.style.bottom = '2px';
					}
				}
			}
	
			var r = this.wrapper.offsetHeight;	// force refresh
	
			if ( this.options.listenX ) {
				this.wrapperWidth = this.wrapper.clientWidth;
				if ( this.options.resize ) {
					this.indicatorWidth = Math.max(Math.round(this.wrapperWidth * this.wrapperWidth / (this.scroller.scrollerWidth || this.wrapperWidth || 1)), 8);
					this.indicatorStyle.width = this.indicatorWidth + 'px';
				} else {
					this.indicatorWidth = this.indicator.clientWidth;
				}
	
				this.maxPosX = this.wrapperWidth - this.indicatorWidth;
	
				if ( this.options.shrink == 'clip' ) {
					this.minBoundaryX = -this.indicatorWidth + 8;
					this.maxBoundaryX = this.wrapperWidth - 8;
				} else {
					this.minBoundaryX = 0;
					this.maxBoundaryX = this.maxPosX;
				}
	
				this.sizeRatioX = this.options.speedRatioX || (this.scroller.maxScrollX && (this.maxPosX / this.scroller.maxScrollX));
			}
	
			if ( this.options.listenY ) {
				this.wrapperHeight = this.wrapper.clientHeight;
				if ( this.options.resize ) {
					this.indicatorHeight = Math.max(Math.round(this.wrapperHeight * this.wrapperHeight / (this.scroller.scrollerHeight || this.wrapperHeight || 1)), 8);
					this.indicatorStyle.height = this.indicatorHeight + 'px';
				} else {
					this.indicatorHeight = this.indicator.clientHeight;
				}
	
				this.maxPosY = this.wrapperHeight - this.indicatorHeight;
	
				if ( this.options.shrink == 'clip' ) {
					this.minBoundaryY = -this.indicatorHeight + 8;
					this.maxBoundaryY = this.wrapperHeight - 8;
				} else {
					this.minBoundaryY = 0;
					this.maxBoundaryY = this.maxPosY;
				}
	
				this.maxPosY = this.wrapperHeight - this.indicatorHeight;
				this.sizeRatioY = this.options.speedRatioY || (this.scroller.maxScrollY && (this.maxPosY / this.scroller.maxScrollY));
			}
	
			this.updatePosition();
		},
	
		updatePosition: function () {
			var x = this.options.listenX && Math.round(this.sizeRatioX * this.scroller.x) || 0,
				y = this.options.listenY && Math.round(this.sizeRatioY * this.scroller.y) || 0;
	
			if ( !this.options.ignoreBoundaries ) {
				if ( x < this.minBoundaryX ) {
					if ( this.options.shrink == 'scale' ) {
						this.width = Math.max(this.indicatorWidth + x, 8);
						this.indicatorStyle.width = this.width + 'px';
					}
					x = this.minBoundaryX;
				} else if ( x > this.maxBoundaryX ) {
					if ( this.options.shrink == 'scale' ) {
						this.width = Math.max(this.indicatorWidth - (x - this.maxPosX), 8);
						this.indicatorStyle.width = this.width + 'px';
						x = this.maxPosX + this.indicatorWidth - this.width;
					} else {
						x = this.maxBoundaryX;
					}
				} else if ( this.options.shrink == 'scale' && this.width != this.indicatorWidth ) {
					this.width = this.indicatorWidth;
					this.indicatorStyle.width = this.width + 'px';
				}
	
				if ( y < this.minBoundaryY ) {
					if ( this.options.shrink == 'scale' ) {
						this.height = Math.max(this.indicatorHeight + y * 3, 8);
						this.indicatorStyle.height = this.height + 'px';
					}
					y = this.minBoundaryY;
				} else if ( y > this.maxBoundaryY ) {
					if ( this.options.shrink == 'scale' ) {
						this.height = Math.max(this.indicatorHeight - (y - this.maxPosY) * 3, 8);
						this.indicatorStyle.height = this.height + 'px';
						y = this.maxPosY + this.indicatorHeight - this.height;
					} else {
						y = this.maxBoundaryY;
					}
				} else if ( this.options.shrink == 'scale' && this.height != this.indicatorHeight ) {
					this.height = this.indicatorHeight;
					this.indicatorStyle.height = this.height + 'px';
				}
			}
	
			this.x = x;
			this.y = y;
	
			if ( this.scroller.options.useTransform ) {
				this.indicatorStyle[utils.style.transform] = 'translate(' + x + 'px,' + y + 'px)' + this.scroller.translateZ;
			} else {
				this.indicatorStyle.left = x + 'px';
				this.indicatorStyle.top = y + 'px';
			}
		},
	
		_pos: function (x, y) {
			if ( x < 0 ) {
				x = 0;
			} else if ( x > this.maxPosX ) {
				x = this.maxPosX;
			}
	
			if ( y < 0 ) {
				y = 0;
			} else if ( y > this.maxPosY ) {
				y = this.maxPosY;
			}
	
			x = this.options.listenX ? Math.round(x / this.sizeRatioX) : this.scroller.x;
			y = this.options.listenY ? Math.round(y / this.sizeRatioY) : this.scroller.y;
	
			this.scroller.scrollTo(x, y);
		},
	
		fade: function (val, hold) {
			if ( hold && !this.visible ) {
				return;
			}
	
			clearTimeout(this.fadeTimeout);
			this.fadeTimeout = null;
	
			var time = val ? 250 : 500,
				delay = val ? 0 : 300;
	
			val = val ? '1' : '0';
	
			this.wrapperStyle[utils.style.transitionDuration] = time + 'ms';
	
			this.fadeTimeout = setTimeout((function (val) {
				this.wrapperStyle.opacity = val;
				this.visible = +val;
			}).bind(this, val), delay);
		}
	};
	
	IScroll.utils = utils;
	
	if ( typeof module != 'undefined' && module.exports ) {
		module.exports = IScroll;
	} else if ( true ) {
	        !(__WEBPACK_AMD_DEFINE_RESULT__ = function () { return IScroll; }.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	} else {
		window.IScroll = IScroll;
	}
	
	})(window, document, Math);


/***/ },

/***/ 236:
/*!*****************************************!*\
  !*** ./src/components/react-iscroll.js ***!
  \*****************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _react = __webpack_require__(/*! react */ 1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _reactDom = __webpack_require__(/*! react-dom */ 38);
	
	var _reactDom2 = _interopRequireDefault(_reactDom);
	
	var _deepEqual = __webpack_require__(/*! deep-equal */ 191);
	
	var _deepEqual2 = _interopRequireDefault(_deepEqual);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var PropTypes = _react2.default.PropTypes;
	
	// Events available on iScroll instance
	// [`iScroll event name`, `react component event name`]
	
	var availableEvents = [['beforeScrollStart', "onBeforeScrollStart"], ['scrollCancel', "onScrollCancel"], ['scrollStart', "onScrollStart"], ['scroll', "onScroll"], ['scrollEnd', "onScrollEnd"], ['flick', "onFlick"], ['zoomStart', "onZoomStart"], ['zoomEnd', "onZoomEnd"]];
	
	var iScrollPropType = function iScrollPropType(props, propName, componentName) {
	
	  var iScroll = props[propName];
	  var proto = iScroll && iScroll.prototype;
	
	  if (!iScroll || !proto || !proto.version || !proto.scrollTo) {
	    return new Error(componentName + ": iScroll not passed to component props.");
	  } else {
	    if (!/^5\..*/.test(proto.version)) {
	      console.warn(componentName + ": different version than 5.x.y of iScroll is required. Some features won't work properly.");
	    }
	
	    if (props.options && props.options.zoom && !proto.zoom) {
	      console.warn(componentName + ": options.zoom is set, but iscroll-zoom version is not required. Zoom feature won't work properly.");
	    }
	  }
	};
	
	// Generate propTypes with event function validating
	var propTypes = {
	  defer: _react2.default.PropTypes.oneOfType([_react2.default.PropTypes.bool, _react2.default.PropTypes.number]),
	  options: PropTypes.object,
	  iScroll: iScrollPropType,
	  onRefresh: PropTypes.func
	};
	
	for (var i = 0; i < availableEvents.length; i++) {
	  propTypes[availableEvents[i][1]] = PropTypes.func;
	}
	
	var ReactIScroll = function (_React$Component) {
	  _inherits(ReactIScroll, _React$Component);
	
	  function ReactIScroll(props) {
	    _classCallCheck(this, ReactIScroll);
	
	    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(ReactIScroll).call(this, props));
	
	    _this._queuedCallbacks = [];
	    _this._iScrollBindedEvents = {};
	    return _this;
	  }
	
	  _createClass(ReactIScroll, [{
	    key: 'componentDidMount',
	    value: function componentDidMount() {
	      this._initializeIScroll();
	    }
	  }, {
	    key: 'componentWillUnmount',
	    value: function componentWillUnmount() {
	      this._teardownIScroll();
	    }
	
	    // There is no state, we can compare only props.
	
	  }, {
	    key: 'shouldComponentUpdate',
	    value: function shouldComponentUpdate(nextProps) {
	      return !(0, _deepEqual2.default)(this.props, nextProps);
	    }
	
	    // Check if iScroll options has changed and recreate instance with new one
	
	  }, {
	    key: 'componentDidUpdate',
	    value: function componentDidUpdate(prevProps) {
	      var _this2 = this;
	
	      // If options are same, iScroll behaviour will not change. Just refresh events and trigger refresh
	      if ((0, _deepEqual2.default)(prevProps.options, this.props.options)) {
	        this._updateIScrollEvents(prevProps, this.props);
	        this.refresh();
	
	        // If options changed, we will destroy iScroll instance and create new one with same scroll position
	        // TODO test if this will work with indicators
	      } else {
	          this.withIScroll(true, function (iScrollInstance) {
	            // Save current state
	            var x = iScrollInstance.x;
	            var y = iScrollInstance.y;
	            var scale = iScrollInstance.scale;
	
	            // Destroy current and Create new instance of iScroll
	
	            _this2._teardownIScroll();
	            _this2._initializeIScroll();
	
	            _this2.withIScroll(true, function (newIScrollInstance) {
	              // Restore previous state
	              if (scale && newIScrollInstance.zoom) newIScrollInstance.zoom(scale, 0, 0, 0);
	
	              newIScrollInstance.scrollTo(x, y);
	            });
	          });
	        }
	    }
	  }, {
	    key: 'getIScroll',
	    value: function getIScroll() {
	      return this._iScrollInstance;
	    }
	  }, {
	    key: 'getIScrollInstance',
	    value: function getIScrollInstance() {
	      console.warn("Function 'getIScrollInstance' is deprecated. Instead use 'getIScroll'");
	      return this._iScrollInstance;
	    }
	  }, {
	    key: 'withIScroll',
	    value: function withIScroll(waitForInit, callback) {
	
	      if (!callback && typeof waitForInit == "function") {
	        callback = waitForInit;
	      }
	
	      if (this.getIScroll()) {
	        callback(this.getIScroll());
	      } else if (waitForInit === true) {
	        this._queuedCallbacks.push(callback);
	      }
	    }
	  }, {
	    key: 'refresh',
	    value: function refresh() {
	
	      this.withIScroll(function (iScrollInstance) {
	        return iScrollInstance.refresh();
	      });
	    }
	  }, {
	    key: '_runInitializeIScroll',
	    value: function _runInitializeIScroll() {
	      var _this3 = this;
	
	      var _props = this.props;
	      var iScroll = _props.iScroll;
	      var options = _props.options;
	
	      // Create iScroll instance with given options
	
	      var iScrollInstance = new iScroll(_reactDom2.default.findDOMNode(this), options);
	      this._iScrollInstance = iScrollInstance;
	
	      // TODO there should be new event 'onInitialize'
	      this._triggerRefreshEvent();
	
	      // Patch iScroll instance .refresh() function to trigger our onRefresh event
	      var origRefresh = iScrollInstance.refresh;
	
	      iScrollInstance.refresh = function () {
	
	        origRefresh.apply(iScrollInstance);
	        _this3._triggerRefreshEvent();
	      };
	
	      // Bind iScroll events
	      this._bindIScrollEvents();
	
	      this._callQueuedCallbacks();
	    }
	  }, {
	    key: '_initializeIScroll',
	    value: function _initializeIScroll() {
	      var _this4 = this;
	
	      var defer = this.props.defer;
	
	
	      if (defer === false) {
	        this._runInitializeIScroll();
	      } else {
	        setTimeout(function () {
	          return _this4._runInitializeIScroll();
	        }, defer);
	      }
	    }
	  }, {
	    key: '_callQueuedCallbacks',
	    value: function _callQueuedCallbacks() {
	      var callbacks = this._queuedCallbacks,
	          len = callbacks.length;
	
	      this._queuedCallbacks = [];
	
	      for (var _i = 0; _i < len; _i++) {
	        callbacks[_i](this.getIScroll());
	      }
	    }
	  }, {
	    key: '_teardownIScroll',
	    value: function _teardownIScroll() {
	
	      if (this._iScrollInstance) {
	        this._iScrollInstance.destroy();
	        this._iScrollInstance = undefined;
	      }
	    }
	  }, {
	    key: '_bindIScrollEvents',
	    value: function _bindIScrollEvents() {
	
	      // Bind events on iScroll instance
	      this._iScrollBindedEvents = {};
	      this._updateIScrollEvents({}, this.props);
	    }
	
	    // Iterate through available events and update one by one
	
	  }, {
	    key: '_updateIScrollEvents',
	    value: function _updateIScrollEvents(prevProps, nextProps) {
	
	      var len = availableEvents.length;
	
	      for (var _i2 = 0; _i2 < len; _i2++) {
	        var _availableEvents$_i = _slicedToArray(availableEvents[_i2], 2);
	
	        var iScrollEventName = _availableEvents$_i[0];
	        var reactEventName = _availableEvents$_i[1];
	
	        this._updateIScrollEvent(iScrollEventName, prevProps[reactEventName], nextProps[reactEventName]);
	      }
	    }
	
	    // Unbind and/or Bind event if it was changed during update
	
	  }, {
	    key: '_updateIScrollEvent',
	    value: function _updateIScrollEvent(iScrollEventName, prevEvent, currentEvent) {
	      var _this5 = this;
	
	      if (prevEvent !== currentEvent) {
	        this.withIScroll(true, function (iScrollInstance) {
	          var currentEvents = _this5._iScrollBindedEvents;
	
	          if (prevEvent) {
	            iScrollInstance.off(iScrollEventName, currentEvents[iScrollEventName]);
	            currentEvents[iScrollEventName] = undefined;
	          }
	
	          if (currentEvent) {
	            var wrappedCallback = function wrappedCallback() {
	              for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	                args[_key] = arguments[_key];
	              }
	
	              currentEvent.apply(undefined, [iScrollInstance].concat(args));
	            };
	
	            iScrollInstance.on(iScrollEventName, wrappedCallback);
	            currentEvents[iScrollEventName] = wrappedCallback;
	          }
	        });
	      }
	    }
	  }, {
	    key: '_triggerRefreshEvent',
	    value: function _triggerRefreshEvent() {
	      var onRefresh = this.props.onRefresh;
	
	
	      if (onRefresh) {
	        this.withIScroll(function (iScrollInstance) {
	          return onRefresh(iScrollInstance);
	        });
	      }
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      // Keep only html properties
	      var htmlProps = {};
	
	      for (var prop in this.props) {
	        if (!propTypes[prop]) {
	          htmlProps[prop] = this.props[prop];
	        }
	      }
	
	      return _react2.default.createElement('div', htmlProps);
	    }
	  }]);
	
	  return ReactIScroll;
	}(_react2.default.Component);
	
	ReactIScroll.displayName = 'ReactIScroll';
	ReactIScroll.propTypes = propTypes;
	ReactIScroll.defaultProps = {
	  defer: 0,
	  options: {},
	  style: {
	    position: "relative",
	    height: "100%",
	    width: "100%",
	    overflow: "hidden"
	  }
	};
	exports.default = ReactIScroll;

/***/ },

/***/ 237:
/*!**********************************!*\
  !*** ./src/todos/ref/LimsTab.js ***!
  \**********************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _react = __webpack_require__(/*! react */ 1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _reactDom = __webpack_require__(/*! react-dom */ 38);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Created by gaoxin on 2016/7/27.
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */
	
	var LimsTab = function (_Component) {
	  _inherits(LimsTab, _Component);
	
	  function LimsTab(props) {
	    _classCallCheck(this, LimsTab);
	
	    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(LimsTab).call(this, props));
	
	    _this.tabClick = function (type, e) {
	      //console.log(type);
	      //console.log(e.target);
	
	      _this.setState({ actived: type });
	      _this.props.tabClick(type);
	    };
	
	    _this.state = {
	      liked: false,
	      actived: 0
	    };
	    _this.tabClick = _this.tabClick.bind(_this);
	    return _this;
	  }
	
	  _createClass(LimsTab, [{
	    key: 'componentDidMount',
	    value: function componentDidMount() {
	      this.props.tabClick(0);
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      return _react2.default.createElement(
	        'ul',
	        { className: 'tab', key: Date.now() + Math.random() * 1000 },
	        _react2.default.createElement(
	          'li',
	          { className: this.state.actived == 0 ? 'active' : '', onClick: this.tabClick.bind(this, 0) },
	          _react2.default.createElement('i', null),
	          _react2.default.createElement(
	            'span',
	            null,
	            '待办'
	          )
	        ),
	        _react2.default.createElement(
	          'li',
	          { className: this.state.actived == 1 ? 'active' : '', onClick: this.tabClick.bind(this, 1) },
	          _react2.default.createElement('i', null),
	          _react2.default.createElement(
	            'span',
	            null,
	            '已办'
	          )
	        )
	      );
	    }
	  }]);
	
	  return LimsTab;
	}(_react.Component);
	
	exports.default = LimsTab;

/***/ },

/***/ 238:
/*!***********************************!*\
  !*** ./src/todos/ref/TodoMenu.js ***!
  \***********************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _react = __webpack_require__(/*! react */ 1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _reactDom = __webpack_require__(/*! react-dom */ 38);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Created by gaoxin on 2016/7/27.
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */
	
	var LimsLink = __webpack_require__(/*! components/LimsLink */ 239);
	
	var TodoMenu = function (_Component) {
	  _inherits(TodoMenu, _Component);
	
	  function TodoMenu(props) {
	    _classCallCheck(this, TodoMenu);
	
	    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(TodoMenu).call(this, props));
	
	    _this.onJsApi = function (e) {
	      _this.props.onJsApi(e);
	    };
	
	    return _this;
	  }
	
	  _createClass(TodoMenu, [{
	    key: 'render',
	    value: function render() {
	      return _react2.default.createElement(
	        'div',
	        { id: 'todos-menu' },
	        _react2.default.createElement(
	          LimsLink,
	          { className: 'link-item',
	            onJsApi: this.onJsApi,
	            to: { pathname: '/todotab', query: { type: 1 } } },
	          _react2.default.createElement(
	            'div',
	            { className: 'menu menu_analysis' },
	            _react2.default.createElement(
	              'span',
	              null,
	              '分析任务审核'
	            ),
	            _react2.default.createElement('i', null)
	          )
	        ),
	        _react2.default.createElement(
	          LimsLink,
	          { className: 'link-item',
	            onJsApi: this.onJsApi,
	            to: { pathname: '/todotab', query: { type: 2 } } },
	          _react2.default.createElement(
	            'div',
	            { className: 'menu menu_coa' },
	            _react2.default.createElement(
	              'span',
	              null,
	              '合格证审核'
	            ),
	            _react2.default.createElement('i', null)
	          )
	        ),
	        !LimsConfig.isApp ? _react2.default.createElement(
	          LimsLink,
	          { className: 'link-item',
	            onJsApi: this.onJsApi,
	            to: { pathname: '/todotab', query: { type: 0 } } },
	          _react2.default.createElement(
	            'div',
	            { className: 'menu menu_coa' },
	            _react2.default.createElement(
	              'span',
	              null,
	              '消息管理'
	            ),
	            _react2.default.createElement('i', null)
	          )
	        ) : ''
	      );
	    }
	  }]);
	
	  return TodoMenu;
	}(_react.Component);
	
	exports.default = TodoMenu;

/***/ },

/***/ 239:
/*!************************************!*\
  !*** ./src/components/LimsLink.js ***!
  \************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	/**
	 * Created by gaoxin on 2016/7/21.
	 */
	
	var React = __webpack_require__(/*! react */ 1);
	var ReactDOM = __webpack_require__(/*! react-dom */ 38);
	//重写LINK组件
	var LimsLink = React.createClass({
	  displayName: 'LimsLink',
	
	  contextTypes: {
	    router: React.PropTypes.object.isRequired
	  },
	
	  componentWillMount: function componentWillMount() {},
	  getDefaultProps: function getDefaultProps() {
	    return {
	      to: {
	        pathname: '',
	        query: null
	      },
	      className: '',
	      onJsApi: null
	    };
	  },
	
	  clickHandle: function clickHandle(ev) {
	    //如果是APP模式，并且设置了jsAPI,则调用该JSAPI，传入PATHNAME和QUERY
	
	    ev.preventDefault();
	
	    if (LimsConfig.isApp && this.props.onJsApi) {
	      this.props.onJsApi(this.props.to);
	      return;
	    }
	
	    this.context.router.push({
	      pathname: this.props.to.pathname,
	      query: this.props.to.query
	    });
	  },
	  render: function render() {
	    return React.createElement(
	      'div',
	      { className: this.props.className, onClick: this.clickHandle },
	      this.props.children
	    );
	  }
	
	});
	module.exports = LimsLink;

/***/ },

/***/ 240:
/*!***************************************!*\
  !*** ./src/todos/ref/ViewAnalysis.js ***!
  \***************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _react = __webpack_require__(/*! react */ 1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _reactDom = __webpack_require__(/*! react-dom */ 38);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Created by gaoxin on 2016/7/27.
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */
	
	var ViewAnalysis = function (_Component) {
	  _inherits(ViewAnalysis, _Component);
	
	  function ViewAnalysis(props) {
	    _classCallCheck(this, ViewAnalysis);
	
	    return _possibleConstructorReturn(this, Object.getPrototypeOf(ViewAnalysis).call(this, props));
	  }
	
	  _createClass(ViewAnalysis, [{
	    key: 'shouldComponentUpdate',
	    value: function shouldComponentUpdate(nextProps, nextState) {
	
	      if (this.props.todoType == nextProps.todoType && this.props.todoDone == nextProps.todoDone) {
	        return false;
	      }
	
	      return true;
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      var createRow = function createRow(item, index) {
	        if (item.is_show && item.is_main) {
	          return _react2.default.createElement(
	            'li',
	            { key: Date.now() + Math.random() * 1000 },
	            _react2.default.createElement(
	              'span',
	              null,
	              item.text
	            ),
	            _react2.default.createElement(
	              'span',
	              null,
	              item.value
	            )
	          );
	        }
	      };
	      return _react2.default.createElement(
	        'div',
	        { id: 'list-data', className: 'list-data', key: Date.now() + Math.random() * 1000 },
	        _react2.default.createElement(
	          'div',
	          { className: 'title' },
	          _react2.default.createElement(
	            'span',
	            null,
	            '待办类型'
	          ),
	          _react2.default.createElement(
	            'span',
	            null,
	            '分析任务审批'
	          )
	        ),
	        _react2.default.createElement(
	          'ul',
	          { className: 'content' },
	          this.props.item.map(createRow)
	        )
	      );
	    }
	  }]);
	
	  return ViewAnalysis;
	}(_react.Component);
	
	exports.default = ViewAnalysis;

/***/ },

/***/ 241:
/*!**********************************!*\
  !*** ./src/todos/ref/ViewCoa.js ***!
  \**********************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _react = __webpack_require__(/*! react */ 1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _reactDom = __webpack_require__(/*! react-dom */ 38);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Created by gaoxin on 2016/7/27.
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */
	
	var ViewCoa = function (_Component) {
	  _inherits(ViewCoa, _Component);
	
	  function ViewCoa(props) {
	    _classCallCheck(this, ViewCoa);
	
	    return _possibleConstructorReturn(this, Object.getPrototypeOf(ViewCoa).call(this, props));
	  }
	
	  _createClass(ViewCoa, [{
	    key: 'shouldComponentUpdate',
	    value: function shouldComponentUpdate(nextProps, nextState) {
	
	      if (this.props.todoType == nextProps.todoType && this.props.todoDone == nextProps.todoDone) {
	        return false;
	      }
	      return true;
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	
	      var createRow = function createRow(item, index) {
	
	        if (item.is_show && item.is_main) {
	          return _react2.default.createElement(
	            'li',
	            { key: Date.now() + Math.random() * 1000 },
	            _react2.default.createElement(
	              'span',
	              null,
	              item.text
	            ),
	            _react2.default.createElement(
	              'span',
	              null,
	              item.value
	            )
	          );
	        }
	      };
	      return _react2.default.createElement(
	        'div',
	        { id: 'list-data', className: 'list-data', key: Date.now() + Math.random() * 1000 },
	        _react2.default.createElement(
	          'div',
	          { className: 'title' },
	          _react2.default.createElement(
	            'span',
	            null,
	            '待办类型'
	          ),
	          _react2.default.createElement(
	            'span',
	            null,
	            '合格证审批'
	          )
	        ),
	        _react2.default.createElement(
	          'ul',
	          { className: 'content' },
	          this.props.item.map(createRow)
	        )
	      );
	    }
	  }]);
	
	  return ViewCoa;
	}(_react.Component);
	
	exports.default = ViewCoa;

/***/ },

/***/ 242:
/*!***************************************!*\
  !*** ./src/todos/ref/AnalysisInfo.js ***!
  \***************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _react = __webpack_require__(/*! react */ 1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _reactDom = __webpack_require__(/*! react-dom */ 38);
	
	var _reactRouter = __webpack_require__(/*! react-router */ 173);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Created by gaoxin on 2016/8/2.
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */
	
	var AnalysisInfo = function (_Component) {
	  _inherits(AnalysisInfo, _Component);
	
	  function AnalysisInfo(props) {
	    _classCallCheck(this, AnalysisInfo);
	
	    return _possibleConstructorReturn(this, Object.getPrototypeOf(AnalysisInfo).call(this, props));
	  }
	
	  _createClass(AnalysisInfo, [{
	    key: 'render',
	    value: function render() {
	      var createItem = function createItem(item, index) {
	        if (item.is_show) {
	          return _react2.default.createElement(
	            'li',
	            { key: Date.now() + Math.random() * 1000 },
	            _react2.default.createElement(
	              'span',
	              null,
	              item.text
	            ),
	            _react2.default.createElement(
	              'span',
	              null,
	              item.value
	            )
	          );
	        }
	      };
	
	      return _react2.default.createElement(
	        'div',
	        { className: 'todo-info', id: 'todo-info' },
	        _react2.default.createElement(
	          'ul',
	          null,
	          this.props.data.map(createItem)
	        ),
	        !LimsConfig.isApp ? _react2.default.createElement(
	          _reactRouter.Link,
	          { to: { pathname: '/todoapprove', query: { type: 1, data: this.props.recordkey } } },
	          '点我进入审核'
	        ) : ''
	      );
	    }
	  }]);
	
	  return AnalysisInfo;
	}(_react.Component);
	
	exports.default = AnalysisInfo;

/***/ },

/***/ 243:
/*!******************************************!*\
  !*** ./src/todos/ref/AnalysisApprove.js ***!
  \******************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _react = __webpack_require__(/*! react */ 1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _reactDom = __webpack_require__(/*! react-dom */ 38);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Created by gaoxin on 2016/8/2.
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */
	
	var AnalysisApprove = function (_Component) {
	  _inherits(AnalysisApprove, _Component);
	
	  function AnalysisApprove(props) {
	    _classCallCheck(this, AnalysisApprove);
	
	    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(AnalysisApprove).call(this, props));
	
	    _this.checkedClick = function (e) {
	      _this.setState({ actived: !_this.state.actived });
	    };
	
	    _this.handleChange = function (e) {
	
	      _this.setState({ value: _this.refs.txtcontent.value });
	    };
	
	    _this.submitForm = function (e) {
	
	      var _isApprove = _this.state.actived ? 'pass' : 'reject';
	
	      var _contet = _this.state.value;
	
	      _this.props.submitForm(_isApprove, _contet);
	    };
	
	    _this.state = {
	      value: '',
	      actived: true
	    };
	    return _this;
	  }
	
	  _createClass(AnalysisApprove, [{
	    key: 'render',
	    value: function render() {
	      return _react2.default.createElement(
	        'div',
	        { className: 'todo-approve', id: 'todo-approve' },
	        _react2.default.createElement(
	          'div',
	          { className: 'checkboxs' },
	          _react2.default.createElement(
	            'span',
	            { onClick: this.checkedClick, className: this.state.actived ? 'active' : '' },
	            '同意'
	          ),
	          _react2.default.createElement(
	            'span',
	            { onClick: this.checkedClick, className: this.state.actived ? '' : 'active' },
	            '拒绝'
	          )
	        ),
	        _react2.default.createElement('textarea', { className: 'textinput', value: this.state.value,
	          ref: 'txtcontent', onChange: this.handleChange.bind(this), placeholder: '请输入审批意见!' }),
	        _react2.default.createElement('br', null),
	        _react2.default.createElement(
	          'button',
	          { className: 'button', onClick: this.submitForm },
	          '提交'
	        )
	      );
	    }
	  }]);
	
	  return AnalysisApprove;
	}(_react.Component);
	
	exports.default = AnalysisApprove;

/***/ },

/***/ 244:
/*!**********************************!*\
  !*** ./src/todos/ref/CoaInfo.js ***!
  \**********************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _react = __webpack_require__(/*! react */ 1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _reactDom = __webpack_require__(/*! react-dom */ 38);
	
	var _reactRouter = __webpack_require__(/*! react-router */ 173);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Created by gaoxin on 2016/8/2.
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */
	/**
	 * Created by gaoxin on 2016/8/2.
	 */
	
	var CoaInfo = function (_Component) {
	  _inherits(CoaInfo, _Component);
	
	  function CoaInfo(props) {
	    _classCallCheck(this, CoaInfo);
	
	    return _possibleConstructorReturn(this, Object.getPrototypeOf(CoaInfo).call(this, props));
	  }
	
	  _createClass(CoaInfo, [{
	    key: 'render',
	    value: function render() {
	      var createItem = function createItem(item, index) {
	        if (item.is_show) {
	          return _react2.default.createElement(
	            'li',
	            { key: Date.now() + Math.random() * 1000 },
	            _react2.default.createElement(
	              'span',
	              null,
	              item.text
	            ),
	            _react2.default.createElement(
	              'span',
	              null,
	              item.value
	            )
	          );
	        }
	      };
	
	      return _react2.default.createElement(
	        'div',
	        { className: 'todo-info', id: 'todo-info' },
	        _react2.default.createElement(
	          'ul',
	          null,
	          this.props.data.map(createItem)
	        ),
	        !LimsConfig.isApp ? _react2.default.createElement(
	          _reactRouter.Link,
	          { to: { pathname: '/todoapprove', query: { type: 2, data: this.props.recordkey } } },
	          '点我进入审核'
	        ) : ''
	      );
	    }
	  }]);
	
	  return CoaInfo;
	}(_react.Component);
	
	exports.default = CoaInfo;

/***/ },

/***/ 245:
/*!*************************************!*\
  !*** ./src/todos/ref/CoaApprove.js ***!
  \*************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _react = __webpack_require__(/*! react */ 1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _reactDom = __webpack_require__(/*! react-dom */ 38);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Created by gaoxin on 2016/8/2.
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */
	
	var CoaApprove = function (_Component) {
	  _inherits(CoaApprove, _Component);
	
	  function CoaApprove(props) {
	    _classCallCheck(this, CoaApprove);
	
	    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(CoaApprove).call(this, props));
	
	    _this.checkedClick = function (type, e) {
	      _this.setState({ actived: type });
	    };
	
	    _this.handleChange = function (e) {
	      _this.setState({ value: _this.refs.txtcontent.value });
	    };
	
	    _this.submitForm = function (e) {
	
	      var _isApprove = _this.state.actived;
	      var _contet = _this.state.value;
	
	      _this.props.submitForm(_isApprove, _contet);
	    };
	
	    _this.state = {
	      value: '',
	      actived: 1
	    };
	    return _this;
	  }
	
	  _createClass(CoaApprove, [{
	    key: 'render',
	    value: function render() {
	      return _react2.default.createElement(
	        'div',
	        { className: 'todo-approve', id: 'todo-approve' },
	        _react2.default.createElement(
	          'div',
	          { className: 'checkboxs' },
	          _react2.default.createElement(
	            'span',
	            { onClick: this.checkedClick.bind(this, 1), className: this.state.actived == 1 ? 'active' : '' },
	            '同意'
	          ),
	          _react2.default.createElement(
	            'span',
	            { onClick: this.checkedClick.bind(this, 2), className: this.state.actived == 2 ? 'active' : '' },
	            '拒绝'
	          ),
	          _react2.default.createElement(
	            'span',
	            { onClick: this.checkedClick.bind(this, 3), className: this.state.actived == 3 ? 'active' : '' },
	            '废弃'
	          )
	        ),
	        _react2.default.createElement('textarea', { className: 'textinput', value: this.state.value,
	          ref: 'txtcontent', onChange: this.handleChange, placeholder: '请输入审批意见!' }),
	        _react2.default.createElement('br', null),
	        _react2.default.createElement(
	          'button',
	          { className: 'button', onClick: this.submitForm },
	          '提交'
	        )
	      );
	    }
	  }]);
	
	  return CoaApprove;
	}(_react.Component);
	
	exports.default = CoaApprove;

/***/ },

/***/ 246:
/*!******************************!*\
  !*** ./src/todos/todos.less ***!
  \******************************/
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },

/***/ 253:
/*!**************************************!*\
  !*** ./src/assets/common/limsapi.js ***!
  \**************************************/
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	/**
	 * Created by hubq on 2016/2/29.
	 */
	var JsAPI = __webpack_require__(/*! ./apifactory */ 254);
	var jsAPI = new JsAPI(); //拿一个API对象
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
	  limsCaller: function limsCaller() {
	
	    return {
	      pushView: function pushView(params, callback) {
	        jsAPI.limsCaller("pushView", params, callback);
	        return this;
	      },
	      popView: function popView(name, callback) {
	        jsAPI.limsCaller("popView", name, callback);
	        return this;
	      },
	      setTitle: function setTitle(name, callback) {
	        jsAPI.limsCaller("setTitle", name, callback);
	        return this;
	      },
	      getUser: function getUser(callback) {
	        jsAPI.limsCaller("getUser", '', callback);
	        return this;
	      }
	
	    };
	  },
	  limsRegister: function limsRegister() {
	    return {
	      approveBridge: function approveBridge(callback) {
	        jsAPI.limsregister("approveBridge", callback);
	        return this;
	      },
	      todoInfoBridge: function todoInfoBridge(callback) {
	        jsAPI.limsregister("todoInfoBridge", callback);
	        return this;
	      }
	
	    };
	  }
	};

/***/ },

/***/ 254:
/*!*****************************************!*\
  !*** ./src/assets/common/apifactory.js ***!
  \*****************************************/
/***/ function(module, exports) {

	'use strict';
	
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
	
	//判断访问终端
	var browser = {
	  versions: function () {
	    var u = navigator.userAgent,
	        app = navigator.appVersion;
	    return {
	      trident: u.indexOf('Trident') > -1, //IE内核
	      presto: u.indexOf('Presto') > -1, //opera内核
	      webKit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核
	      gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1, //火狐内核
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
	};
	
	JsAPI.prototype = {
	  destroy: function destroy() {
	    this.events = null;
	    this.sends = null;
	  },
	  inited: window.WebViewJavascriptBridgeInited || false, //因为最多仅能初始化一次
	  doAndInit: function doAndInit(callback) {
	    var me = this;
	    if (WebViewJavascriptBridge) {
	
	      !window.WebViewJavascriptBridgeInited && WebViewJavascriptBridge.init(function (message, responseCallback) {
	        responseCallback && responseCallback('init success from js');
	      });
	      if (!window.WebViewJavascriptBridgeInited) {
	        me.inited = window.WebViewJavascriptBridgeInited = true;
	      }
	      callback(WebViewJavascriptBridge);
	    }
	  },
	  connectWebViewJavascriptBridge: function connectWebViewJavascriptBridge(callback) {
	
	    if (!browser.versions.android) {
	      if (window.WebViewJavascriptBridge) {
	        return callback(WebViewJavascriptBridge);
	      }
	      if (window.WVJBCallbacks) {
	        return window.WVJBCallbacks.push(callback);
	      }
	      window.WVJBCallbacks = [callback];
	      var WVJBIframe = document.createElement('iframe');
	      WVJBIframe.style.display = 'none';
	      WVJBIframe.src = 'wvjbscheme://__BRIDGE_LOADED__';
	      document.documentElement.appendChild(WVJBIframe);
	      setTimeout(function () {
	        document.documentElement.removeChild(WVJBIframe);
	      }, 0);
	      return this;
	    }
	    //原始方案
	    var me = this;
	    if (window.WebViewJavascriptBridge) {
	      me.doAndInit(callback);
	    } else {
	      document.addEventListener('WebViewJavascriptBridgeReady', function () {
	        me.doAndInit(callback);
	      }, false);
	    }
	    return this;
	  },
	  //H5发送消息给原生
	  limsCaller: function limsCaller(name, params, callback) {
	    var me = this;
	    try {
	      me.connectWebViewJavascriptBridge(function (bridge) {
	        bridge.callHandler(name, params, function (response) {
	          if (callback) {
	            callback(response);
	          }
	        });
	      });
	    } catch (e) {}
	    return this;
	  },
	  //原生调用JS
	  limsregister: function limsregister(name, callback) {
	    var me = this;
	    try {
	      me.connectWebViewJavascriptBridge(function (bridge) {
	        bridge.registerHandler(name, function (data, responseCallback) {
	
	          callback(data, responseCallback);
	        });
	      });
	    } catch (e) {}
	    return this;
	  },
	  on: function on(name, callback, rightNow) {
	    this.events.push({ name: name, callback: callback });
	    if (rightNow) {
	      this.do();
	    }
	    return this;
	  },
	  send: function send(name, callback, rightNow) {
	    this.sends.push({ name: name, callback: callback });
	    if (rightNow) {
	      this.do();
	    }
	    return this;
	  },
	  do: function _do() {
	    var funcs = [].slice.call(arguments);
	    var me = this;
	    try {
	      me.connectWebViewJavascriptBridge(function (bridge) {
	        me.events.forEach(function (n, i) {
	          (function (name, callback) {
	            bridge.registerHandler(name, function (responseData) {
	              callback && callback(responseData);
	              funcs.length > i && funcs[i](responseData);
	            });
	          })(n.name, n.callback);
	        });
	        me.events = []; //绑定完后清空掉
	        me.sends.forEach(function (n, i) {
	          (function (name, callback) {
	            bridge.send({ action: name }, function (responseData) {
	              callback && callback(responseData);
	            });
	          })(n.name, n.callback);
	        });
	        me.sends = []; //执行完后清空掉
	      });
	    } catch (e) {}
	    return this;
	  }
	};
	module.exports = JsAPI;

/***/ },

/***/ 255:
/*!*******************************!*\
  !*** ./src/assets/js/util.js ***!
  \*******************************/
/***/ function(module, exports) {

	'use strict';
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };
	
	(function () {
	
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
	        show: function show() {
	            mask.style.display = "block";
	            oImgRefresh.style.display = "block";
	        },
	
	        //隐藏刷新图片和遮罩层
	        hide: function hide() {
	            mask.style.display = "none";
	            oImgRefresh.style.display = "none";
	        }
	    };
	})();;
	(function ($) {
	
	    //
	    // 对Date的扩展，将 Date 转化为指定格式的String
	    // 月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符，
	    // 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字)
	    // 例子：
	    // (new Date())._format("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423
	    // (new Date())._format("yyyy-M-d h:m:s.S")      ==> 2006-7-2 8:9:4.18
	    //
	    Date.prototype._format = function (fmt) {
	        //author: meizz
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
	        for (var k in o) {
	            if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
	        }return fmt;
	    };
	
	    var win = window,
	        TIME_OUT = 300000; //请求超时时间
	
	    var $body = $('body');
	    /**
	     *@description工具类对象
	     */
	    var util = {
	        clone: function clone(obj) {
	            function Fn() {}
	            Fn.prototype = obj;
	            var o = new Fn();
	            for (var a in o) {
	                if (_typeof(o[a]) == "object") {
	                    o[a] = clone(o[a]);
	                }
	            }
	            return o;
	        },
	
	        /*
	         *  计算日期
	         *  @param AddDayCount {number}
	         *  根据输入的 number 计算返回的日期
	         *  如 -1 返回昨天的日期
	         */
	        getDateStr: function getDateStr(AddDayCount) {
	
	            var dd = new Date();
	            dd.setDate(dd.getDate() + AddDayCount); //获取AddDayCount天后的日期
	            var y = dd.getFullYear();
	            var m = dd.getMonth() + 1; //获取当前月份的日期
	            var d = dd.getDate();
	            return y + "-" + (m < 10 ? '0' + m : m) + "-" + (d < 10 ? '0' + d : d);
	        },
	        showLoading: function showLoading() {
	            window.refresh && window.refresh.show();
	        },
	        hidLoading: function hidLoading() {
	            window.refresh && window.refresh.hide();
	        },
	        /**
	         * @desc 显示toast
	         *
	         */
	        showToast: function showToast(msg) {
	            var htmlStr = '<div class="error-box">' + msg + '</div>';
	            $body.append(htmlStr);
	            if (timer) {
	                win.clearTimeout(timer);
	            }
	            var timer = win.setTimeout(function () {
	                $body.find('.error-box').remove();
	            }, 2000);
	        },
	
	        /**
	         * 显示提示
	         *
	         */
	
	        showTip: function showTip(msg) {
	            var htmlStr = '<div class="info-box">' + msg + '</div>';
	            $body.append(htmlStr);
	            if (timer) {
	                win.clearTimeout(timer);
	            }
	            var timer = win.setTimeout(function () {
	                $body.find('.info-box').remove();
	            }, 3000);
	        },
	        /**
	         * @desc重新封装ajax
	         * @param {Object} opt
	         *
	         */
	
	        ajax: function ajax(opt) {
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
	                success: function success(data, status, xhr) {
	                    opt.success && opt.success(data, status, xhr);
	                },
	                error: function error() {
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
	
	        api: function api(opt, mask) {
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
	                    'el': null
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
	            }
	            //else {
	            //    opt.url = IBSS.API_PATH + opt.url;
	            //}
	
	            var _startTime = Date.now();
	
	            opt.beforeSend = function () {
	                window.refresh && window.refresh.show();
	                //if (mask == true) {
	                //    util.showGlobalLoading();
	                //}
	                opt.button.el && opt.button.el.attr('disabled', 'disabled').text(opt.button.text);
	                return beforeSend && beforeSend.apply(this, arguments);
	            };
	
	            opt.success = function (data, status, xhr) {
	                if (data.login == false) {
	                    location.href = "/login?from=" + location.pathname;
	                    return;
	                }
	
	                if (!data.msgcode) {
	                    //截取20位
	                    if (data.msg && data.msg.length > 20) {
	                        data.msg = data.msg.slice(0, 20);
	                    } else {
	                        data.msg = data.msg + ',请尝试刷新！';
	                    }
	
	                    that.showToast('请求错误  ' + data.msg);
	                }
	                return success && success.apply(this, arguments);
	            };
	            opt.error = function (info) {
	
	                if (info && info.statusText == "abort") return;
	                if (info && info.status == 0) return;
	                that.showToast('网络错误' + '(' + info.status + ')' + '!');
	                return error && error.apply(this);
	            };
	            opt.complete = function () {
	                window.refresh && window.refresh.hide();
	
	                // 采集接口耗时
	                var time = Date.now() - _startTime;
	                // var api = _.parseURL(url).path;
	                window.FS && FS.collector && FS.collector.log('api', {
	                    api: opt.url,
	                    time: time
	                }, true);
	
	                //if (mask == true) {
	                //    util.hideGlobalLoading();
	                //}
	                opt.button.el && opt.button.el.removeAttr('disabled').text(btntext);
	                return complete && complete.apply(this, arguments);
	            };
	            return $.ajax(opt);
	        }
	
	    };
	
	    win.util = util;
	})(window.Zepto);

/***/ },

/***/ 256:
/*!*********************************!*\
  !*** ./src/assets/js/config.js ***!
  \*********************************/
/***/ function(module, exports) {

	'use strict';
	
	;(function (win, config) {
	  //var win = window,
	  //	IBSS = win.IBSS;
	
	  //config.host = 'http://10.238.18.59:8016/1.0/';
	  config.host = 'http://10.238.18.59:8016/1.0/';
	  config.apihost = 'http://10.238.18.59:8016/';
	  config.isApp = 0; //1为APP模式，0为WEB模式
	
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
	    LimsUser.IDENTITY = '';
	    LimsUser.NAME = '';
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
	})(window, window.LimsConfig || (window.LimsConfig = {}));

/***/ },

/***/ 257:
/*!*******************************!*\
  !*** ./src/todos/todohelp.js ***!
  \*******************************/
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	/**
	 * Created by gaoxin on 2016/8/26.
	 */
	var limsCaller = __webpack_require__(/*! assets/common/limsapi */ 253).limsCaller();
	
	module.exports = {
	  getUser: function getUser(callback) {
	    if (LimsConfig.isApp) {
	      limsCaller.getUser(callback);
	    } else {
	      callback(LimsUser);
	    }
	  },
	  setUser: function setUser(data) {
	
	    if (typeof data == "string") {
	      data = JSON.parse(data.toUpperCase());
	    }
	
	    if (data) {
	      LimsUser.IDENTITY = data.IDENTITY;
	      LimsUser.NAME = data.NAME;
	      LimsUser.EMAIL = data.EMAIL;
	      LimsUser.ROLE = data.ROLE;
	      LimsUser.GROUP_ID = data.GROUP_ID;
	
	      //responseCallback&&responseCallback(1);
	    }
	  },
	  getURL: function getURL(to) {
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
	      return LimsConfig.host + "todos.html#" + to.pathname + to.search;
	    }
	    //自己解析参数，拼成URL
	    var _query = paramUrl(to.query);
	    return LimsConfig.host + "todos.html#" + to.pathname + "?" + _query;
	  },
	
	  setTitle: function setTitle(name) {
	    if (LimsConfig.isApp) {
	      limsCaller.setTitle(name);
	    }
	  },
	
	  popView: function popView(name) {
	    if (LimsConfig.isApp) {
	      limsCaller.popView(name);
	    }
	  },
	
	  pushView: function pushView(pushjson, callback) {
	    limsCaller.pushView({
	      url: pushjson['url'] && pushjson['url'] || '',
	      "button": pushjson['button'] && pushjson['button'] || [],
	      "params": pushjson['params'] && pushjson['params'] || {}
	    }, callback);
	  }
	
	};

/***/ },

/***/ 258:
/*!**************************************!*\
  !*** ./~/fastclick/lib/fastclick.js ***!
  \**************************************/
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;;(function () {
		'use strict';
	
		/**
		 * @preserve FastClick: polyfill to remove click delays on browsers with touch UIs.
		 *
		 * @codingstandard ftlabs-jsv2
		 * @copyright The Financial Times Limited [All Rights Reserved]
		 * @license MIT License (see LICENSE.txt)
		 */
	
		/*jslint browser:true, node:true*/
		/*global define, Event, Node*/
	
	
		/**
		 * Instantiate fast-clicking listeners on the specified layer.
		 *
		 * @constructor
		 * @param {Element} layer The layer to listen on
		 * @param {Object} [options={}] The options to override the defaults
		 */
		function FastClick(layer, options) {
			var oldOnClick;
	
			options = options || {};
	
			/**
			 * Whether a click is currently being tracked.
			 *
			 * @type boolean
			 */
			this.trackingClick = false;
	
	
			/**
			 * Timestamp for when click tracking started.
			 *
			 * @type number
			 */
			this.trackingClickStart = 0;
	
	
			/**
			 * The element being tracked for a click.
			 *
			 * @type EventTarget
			 */
			this.targetElement = null;
	
	
			/**
			 * X-coordinate of touch start event.
			 *
			 * @type number
			 */
			this.touchStartX = 0;
	
	
			/**
			 * Y-coordinate of touch start event.
			 *
			 * @type number
			 */
			this.touchStartY = 0;
	
	
			/**
			 * ID of the last touch, retrieved from Touch.identifier.
			 *
			 * @type number
			 */
			this.lastTouchIdentifier = 0;
	
	
			/**
			 * Touchmove boundary, beyond which a click will be cancelled.
			 *
			 * @type number
			 */
			this.touchBoundary = options.touchBoundary || 10;
	
	
			/**
			 * The FastClick layer.
			 *
			 * @type Element
			 */
			this.layer = layer;
	
			/**
			 * The minimum time between tap(touchstart and touchend) events
			 *
			 * @type number
			 */
			this.tapDelay = options.tapDelay || 200;
	
			/**
			 * The maximum time for a tap
			 *
			 * @type number
			 */
			this.tapTimeout = options.tapTimeout || 700;
	
			if (FastClick.notNeeded(layer)) {
				return;
			}
	
			// Some old versions of Android don't have Function.prototype.bind
			function bind(method, context) {
				return function() { return method.apply(context, arguments); };
			}
	
	
			var methods = ['onMouse', 'onClick', 'onTouchStart', 'onTouchMove', 'onTouchEnd', 'onTouchCancel'];
			var context = this;
			for (var i = 0, l = methods.length; i < l; i++) {
				context[methods[i]] = bind(context[methods[i]], context);
			}
	
			// Set up event handlers as required
			if (deviceIsAndroid) {
				layer.addEventListener('mouseover', this.onMouse, true);
				layer.addEventListener('mousedown', this.onMouse, true);
				layer.addEventListener('mouseup', this.onMouse, true);
			}
	
			layer.addEventListener('click', this.onClick, true);
			layer.addEventListener('touchstart', this.onTouchStart, false);
			layer.addEventListener('touchmove', this.onTouchMove, false);
			layer.addEventListener('touchend', this.onTouchEnd, false);
			layer.addEventListener('touchcancel', this.onTouchCancel, false);
	
			// Hack is required for browsers that don't support Event#stopImmediatePropagation (e.g. Android 2)
			// which is how FastClick normally stops click events bubbling to callbacks registered on the FastClick
			// layer when they are cancelled.
			if (!Event.prototype.stopImmediatePropagation) {
				layer.removeEventListener = function(type, callback, capture) {
					var rmv = Node.prototype.removeEventListener;
					if (type === 'click') {
						rmv.call(layer, type, callback.hijacked || callback, capture);
					} else {
						rmv.call(layer, type, callback, capture);
					}
				};
	
				layer.addEventListener = function(type, callback, capture) {
					var adv = Node.prototype.addEventListener;
					if (type === 'click') {
						adv.call(layer, type, callback.hijacked || (callback.hijacked = function(event) {
							if (!event.propagationStopped) {
								callback(event);
							}
						}), capture);
					} else {
						adv.call(layer, type, callback, capture);
					}
				};
			}
	
			// If a handler is already declared in the element's onclick attribute, it will be fired before
			// FastClick's onClick handler. Fix this by pulling out the user-defined handler function and
			// adding it as listener.
			if (typeof layer.onclick === 'function') {
	
				// Android browser on at least 3.2 requires a new reference to the function in layer.onclick
				// - the old one won't work if passed to addEventListener directly.
				oldOnClick = layer.onclick;
				layer.addEventListener('click', function(event) {
					oldOnClick(event);
				}, false);
				layer.onclick = null;
			}
		}
	
		/**
		* Windows Phone 8.1 fakes user agent string to look like Android and iPhone.
		*
		* @type boolean
		*/
		var deviceIsWindowsPhone = navigator.userAgent.indexOf("Windows Phone") >= 0;
	
		/**
		 * Android requires exceptions.
		 *
		 * @type boolean
		 */
		var deviceIsAndroid = navigator.userAgent.indexOf('Android') > 0 && !deviceIsWindowsPhone;
	
	
		/**
		 * iOS requires exceptions.
		 *
		 * @type boolean
		 */
		var deviceIsIOS = /iP(ad|hone|od)/.test(navigator.userAgent) && !deviceIsWindowsPhone;
	
	
		/**
		 * iOS 4 requires an exception for select elements.
		 *
		 * @type boolean
		 */
		var deviceIsIOS4 = deviceIsIOS && (/OS 4_\d(_\d)?/).test(navigator.userAgent);
	
	
		/**
		 * iOS 6.0-7.* requires the target element to be manually derived
		 *
		 * @type boolean
		 */
		var deviceIsIOSWithBadTarget = deviceIsIOS && (/OS [6-7]_\d/).test(navigator.userAgent);
	
		/**
		 * BlackBerry requires exceptions.
		 *
		 * @type boolean
		 */
		var deviceIsBlackBerry10 = navigator.userAgent.indexOf('BB10') > 0;
	
		/**
		 * Determine whether a given element requires a native click.
		 *
		 * @param {EventTarget|Element} target Target DOM element
		 * @returns {boolean} Returns true if the element needs a native click
		 */
		FastClick.prototype.needsClick = function(target) {
			switch (target.nodeName.toLowerCase()) {
	
			// Don't send a synthetic click to disabled inputs (issue #62)
			case 'button':
			case 'select':
			case 'textarea':
				if (target.disabled) {
					return true;
				}
	
				break;
			case 'input':
	
				// File inputs need real clicks on iOS 6 due to a browser bug (issue #68)
				if ((deviceIsIOS && target.type === 'file') || target.disabled) {
					return true;
				}
	
				break;
			case 'label':
			case 'iframe': // iOS8 homescreen apps can prevent events bubbling into frames
			case 'video':
				return true;
			}
	
			return (/\bneedsclick\b/).test(target.className);
		};
	
	
		/**
		 * Determine whether a given element requires a call to focus to simulate click into element.
		 *
		 * @param {EventTarget|Element} target Target DOM element
		 * @returns {boolean} Returns true if the element requires a call to focus to simulate native click.
		 */
		FastClick.prototype.needsFocus = function(target) {
			switch (target.nodeName.toLowerCase()) {
			case 'textarea':
				return true;
			case 'select':
				return !deviceIsAndroid;
			case 'input':
				switch (target.type) {
				case 'button':
				case 'checkbox':
				case 'file':
				case 'image':
				case 'radio':
				case 'submit':
					return false;
				}
	
				// No point in attempting to focus disabled inputs
				return !target.disabled && !target.readOnly;
			default:
				return (/\bneedsfocus\b/).test(target.className);
			}
		};
	
	
		/**
		 * Send a click event to the specified element.
		 *
		 * @param {EventTarget|Element} targetElement
		 * @param {Event} event
		 */
		FastClick.prototype.sendClick = function(targetElement, event) {
			var clickEvent, touch;
	
			// On some Android devices activeElement needs to be blurred otherwise the synthetic click will have no effect (#24)
			if (document.activeElement && document.activeElement !== targetElement) {
				document.activeElement.blur();
			}
	
			touch = event.changedTouches[0];
	
			// Synthesise a click event, with an extra attribute so it can be tracked
			clickEvent = document.createEvent('MouseEvents');
			clickEvent.initMouseEvent(this.determineEventType(targetElement), true, true, window, 1, touch.screenX, touch.screenY, touch.clientX, touch.clientY, false, false, false, false, 0, null);
			clickEvent.forwardedTouchEvent = true;
			targetElement.dispatchEvent(clickEvent);
		};
	
		FastClick.prototype.determineEventType = function(targetElement) {
	
			//Issue #159: Android Chrome Select Box does not open with a synthetic click event
			if (deviceIsAndroid && targetElement.tagName.toLowerCase() === 'select') {
				return 'mousedown';
			}
	
			return 'click';
		};
	
	
		/**
		 * @param {EventTarget|Element} targetElement
		 */
		FastClick.prototype.focus = function(targetElement) {
			var length;
	
			// Issue #160: on iOS 7, some input elements (e.g. date datetime month) throw a vague TypeError on setSelectionRange. These elements don't have an integer value for the selectionStart and selectionEnd properties, but unfortunately that can't be used for detection because accessing the properties also throws a TypeError. Just check the type instead. Filed as Apple bug #15122724.
			if (deviceIsIOS && targetElement.setSelectionRange && targetElement.type.indexOf('date') !== 0 && targetElement.type !== 'time' && targetElement.type !== 'month') {
				length = targetElement.value.length;
				targetElement.setSelectionRange(length, length);
			} else {
				targetElement.focus();
			}
		};
	
	
		/**
		 * Check whether the given target element is a child of a scrollable layer and if so, set a flag on it.
		 *
		 * @param {EventTarget|Element} targetElement
		 */
		FastClick.prototype.updateScrollParent = function(targetElement) {
			var scrollParent, parentElement;
	
			scrollParent = targetElement.fastClickScrollParent;
	
			// Attempt to discover whether the target element is contained within a scrollable layer. Re-check if the
			// target element was moved to another parent.
			if (!scrollParent || !scrollParent.contains(targetElement)) {
				parentElement = targetElement;
				do {
					if (parentElement.scrollHeight > parentElement.offsetHeight) {
						scrollParent = parentElement;
						targetElement.fastClickScrollParent = parentElement;
						break;
					}
	
					parentElement = parentElement.parentElement;
				} while (parentElement);
			}
	
			// Always update the scroll top tracker if possible.
			if (scrollParent) {
				scrollParent.fastClickLastScrollTop = scrollParent.scrollTop;
			}
		};
	
	
		/**
		 * @param {EventTarget} targetElement
		 * @returns {Element|EventTarget}
		 */
		FastClick.prototype.getTargetElementFromEventTarget = function(eventTarget) {
	
			// On some older browsers (notably Safari on iOS 4.1 - see issue #56) the event target may be a text node.
			if (eventTarget.nodeType === Node.TEXT_NODE) {
				return eventTarget.parentNode;
			}
	
			return eventTarget;
		};
	
	
		/**
		 * On touch start, record the position and scroll offset.
		 *
		 * @param {Event} event
		 * @returns {boolean}
		 */
		FastClick.prototype.onTouchStart = function(event) {
			var targetElement, touch, selection;
	
			// Ignore multiple touches, otherwise pinch-to-zoom is prevented if both fingers are on the FastClick element (issue #111).
			if (event.targetTouches.length > 1) {
				return true;
			}
	
			targetElement = this.getTargetElementFromEventTarget(event.target);
			touch = event.targetTouches[0];
	
			if (deviceIsIOS) {
	
				// Only trusted events will deselect text on iOS (issue #49)
				selection = window.getSelection();
				if (selection.rangeCount && !selection.isCollapsed) {
					return true;
				}
	
				if (!deviceIsIOS4) {
	
					// Weird things happen on iOS when an alert or confirm dialog is opened from a click event callback (issue #23):
					// when the user next taps anywhere else on the page, new touchstart and touchend events are dispatched
					// with the same identifier as the touch event that previously triggered the click that triggered the alert.
					// Sadly, there is an issue on iOS 4 that causes some normal touch events to have the same identifier as an
					// immediately preceeding touch event (issue #52), so this fix is unavailable on that platform.
					// Issue 120: touch.identifier is 0 when Chrome dev tools 'Emulate touch events' is set with an iOS device UA string,
					// which causes all touch events to be ignored. As this block only applies to iOS, and iOS identifiers are always long,
					// random integers, it's safe to to continue if the identifier is 0 here.
					if (touch.identifier && touch.identifier === this.lastTouchIdentifier) {
						event.preventDefault();
						return false;
					}
	
					this.lastTouchIdentifier = touch.identifier;
	
					// If the target element is a child of a scrollable layer (using -webkit-overflow-scrolling: touch) and:
					// 1) the user does a fling scroll on the scrollable layer
					// 2) the user stops the fling scroll with another tap
					// then the event.target of the last 'touchend' event will be the element that was under the user's finger
					// when the fling scroll was started, causing FastClick to send a click event to that layer - unless a check
					// is made to ensure that a parent layer was not scrolled before sending a synthetic click (issue #42).
					this.updateScrollParent(targetElement);
				}
			}
	
			this.trackingClick = true;
			this.trackingClickStart = event.timeStamp;
			this.targetElement = targetElement;
	
			this.touchStartX = touch.pageX;
			this.touchStartY = touch.pageY;
	
			// Prevent phantom clicks on fast double-tap (issue #36)
			if ((event.timeStamp - this.lastClickTime) < this.tapDelay) {
				event.preventDefault();
			}
	
			return true;
		};
	
	
		/**
		 * Based on a touchmove event object, check whether the touch has moved past a boundary since it started.
		 *
		 * @param {Event} event
		 * @returns {boolean}
		 */
		FastClick.prototype.touchHasMoved = function(event) {
			var touch = event.changedTouches[0], boundary = this.touchBoundary;
	
			if (Math.abs(touch.pageX - this.touchStartX) > boundary || Math.abs(touch.pageY - this.touchStartY) > boundary) {
				return true;
			}
	
			return false;
		};
	
	
		/**
		 * Update the last position.
		 *
		 * @param {Event} event
		 * @returns {boolean}
		 */
		FastClick.prototype.onTouchMove = function(event) {
			if (!this.trackingClick) {
				return true;
			}
	
			// If the touch has moved, cancel the click tracking
			if (this.targetElement !== this.getTargetElementFromEventTarget(event.target) || this.touchHasMoved(event)) {
				this.trackingClick = false;
				this.targetElement = null;
			}
	
			return true;
		};
	
	
		/**
		 * Attempt to find the labelled control for the given label element.
		 *
		 * @param {EventTarget|HTMLLabelElement} labelElement
		 * @returns {Element|null}
		 */
		FastClick.prototype.findControl = function(labelElement) {
	
			// Fast path for newer browsers supporting the HTML5 control attribute
			if (labelElement.control !== undefined) {
				return labelElement.control;
			}
	
			// All browsers under test that support touch events also support the HTML5 htmlFor attribute
			if (labelElement.htmlFor) {
				return document.getElementById(labelElement.htmlFor);
			}
	
			// If no for attribute exists, attempt to retrieve the first labellable descendant element
			// the list of which is defined here: http://www.w3.org/TR/html5/forms.html#category-label
			return labelElement.querySelector('button, input:not([type=hidden]), keygen, meter, output, progress, select, textarea');
		};
	
	
		/**
		 * On touch end, determine whether to send a click event at once.
		 *
		 * @param {Event} event
		 * @returns {boolean}
		 */
		FastClick.prototype.onTouchEnd = function(event) {
			var forElement, trackingClickStart, targetTagName, scrollParent, touch, targetElement = this.targetElement;
	
			if (!this.trackingClick) {
				return true;
			}
	
			// Prevent phantom clicks on fast double-tap (issue #36)
			if ((event.timeStamp - this.lastClickTime) < this.tapDelay) {
				this.cancelNextClick = true;
				return true;
			}
	
			if ((event.timeStamp - this.trackingClickStart) > this.tapTimeout) {
				return true;
			}
	
			// Reset to prevent wrong click cancel on input (issue #156).
			this.cancelNextClick = false;
	
			this.lastClickTime = event.timeStamp;
	
			trackingClickStart = this.trackingClickStart;
			this.trackingClick = false;
			this.trackingClickStart = 0;
	
			// On some iOS devices, the targetElement supplied with the event is invalid if the layer
			// is performing a transition or scroll, and has to be re-detected manually. Note that
			// for this to function correctly, it must be called *after* the event target is checked!
			// See issue #57; also filed as rdar://13048589 .
			if (deviceIsIOSWithBadTarget) {
				touch = event.changedTouches[0];
	
				// In certain cases arguments of elementFromPoint can be negative, so prevent setting targetElement to null
				targetElement = document.elementFromPoint(touch.pageX - window.pageXOffset, touch.pageY - window.pageYOffset) || targetElement;
				targetElement.fastClickScrollParent = this.targetElement.fastClickScrollParent;
			}
	
			targetTagName = targetElement.tagName.toLowerCase();
			if (targetTagName === 'label') {
				forElement = this.findControl(targetElement);
				if (forElement) {
					this.focus(targetElement);
					if (deviceIsAndroid) {
						return false;
					}
	
					targetElement = forElement;
				}
			} else if (this.needsFocus(targetElement)) {
	
				// Case 1: If the touch started a while ago (best guess is 100ms based on tests for issue #36) then focus will be triggered anyway. Return early and unset the target element reference so that the subsequent click will be allowed through.
				// Case 2: Without this exception for input elements tapped when the document is contained in an iframe, then any inputted text won't be visible even though the value attribute is updated as the user types (issue #37).
				if ((event.timeStamp - trackingClickStart) > 100 || (deviceIsIOS && window.top !== window && targetTagName === 'input')) {
					this.targetElement = null;
					return false;
				}
	
				this.focus(targetElement);
				this.sendClick(targetElement, event);
	
				// Select elements need the event to go through on iOS 4, otherwise the selector menu won't open.
				// Also this breaks opening selects when VoiceOver is active on iOS6, iOS7 (and possibly others)
				if (!deviceIsIOS || targetTagName !== 'select') {
					this.targetElement = null;
					event.preventDefault();
				}
	
				return false;
			}
	
			if (deviceIsIOS && !deviceIsIOS4) {
	
				// Don't send a synthetic click event if the target element is contained within a parent layer that was scrolled
				// and this tap is being used to stop the scrolling (usually initiated by a fling - issue #42).
				scrollParent = targetElement.fastClickScrollParent;
				if (scrollParent && scrollParent.fastClickLastScrollTop !== scrollParent.scrollTop) {
					return true;
				}
			}
	
			// Prevent the actual click from going though - unless the target node is marked as requiring
			// real clicks or if it is in the whitelist in which case only non-programmatic clicks are permitted.
			if (!this.needsClick(targetElement)) {
				event.preventDefault();
				this.sendClick(targetElement, event);
			}
	
			return false;
		};
	
	
		/**
		 * On touch cancel, stop tracking the click.
		 *
		 * @returns {void}
		 */
		FastClick.prototype.onTouchCancel = function() {
			this.trackingClick = false;
			this.targetElement = null;
		};
	
	
		/**
		 * Determine mouse events which should be permitted.
		 *
		 * @param {Event} event
		 * @returns {boolean}
		 */
		FastClick.prototype.onMouse = function(event) {
	
			// If a target element was never set (because a touch event was never fired) allow the event
			if (!this.targetElement) {
				return true;
			}
	
			if (event.forwardedTouchEvent) {
				return true;
			}
	
			// Programmatically generated events targeting a specific element should be permitted
			if (!event.cancelable) {
				return true;
			}
	
			// Derive and check the target element to see whether the mouse event needs to be permitted;
			// unless explicitly enabled, prevent non-touch click events from triggering actions,
			// to prevent ghost/doubleclicks.
			if (!this.needsClick(this.targetElement) || this.cancelNextClick) {
	
				// Prevent any user-added listeners declared on FastClick element from being fired.
				if (event.stopImmediatePropagation) {
					event.stopImmediatePropagation();
				} else {
	
					// Part of the hack for browsers that don't support Event#stopImmediatePropagation (e.g. Android 2)
					event.propagationStopped = true;
				}
	
				// Cancel the event
				event.stopPropagation();
				event.preventDefault();
	
				return false;
			}
	
			// If the mouse event is permitted, return true for the action to go through.
			return true;
		};
	
	
		/**
		 * On actual clicks, determine whether this is a touch-generated click, a click action occurring
		 * naturally after a delay after a touch (which needs to be cancelled to avoid duplication), or
		 * an actual click which should be permitted.
		 *
		 * @param {Event} event
		 * @returns {boolean}
		 */
		FastClick.prototype.onClick = function(event) {
			var permitted;
	
			// It's possible for another FastClick-like library delivered with third-party code to fire a click event before FastClick does (issue #44). In that case, set the click-tracking flag back to false and return early. This will cause onTouchEnd to return early.
			if (this.trackingClick) {
				this.targetElement = null;
				this.trackingClick = false;
				return true;
			}
	
			// Very odd behaviour on iOS (issue #18): if a submit element is present inside a form and the user hits enter in the iOS simulator or clicks the Go button on the pop-up OS keyboard the a kind of 'fake' click event will be triggered with the submit-type input element as the target.
			if (event.target.type === 'submit' && event.detail === 0) {
				return true;
			}
	
			permitted = this.onMouse(event);
	
			// Only unset targetElement if the click is not permitted. This will ensure that the check for !targetElement in onMouse fails and the browser's click doesn't go through.
			if (!permitted) {
				this.targetElement = null;
			}
	
			// If clicks are permitted, return true for the action to go through.
			return permitted;
		};
	
	
		/**
		 * Remove all FastClick's event listeners.
		 *
		 * @returns {void}
		 */
		FastClick.prototype.destroy = function() {
			var layer = this.layer;
	
			if (deviceIsAndroid) {
				layer.removeEventListener('mouseover', this.onMouse, true);
				layer.removeEventListener('mousedown', this.onMouse, true);
				layer.removeEventListener('mouseup', this.onMouse, true);
			}
	
			layer.removeEventListener('click', this.onClick, true);
			layer.removeEventListener('touchstart', this.onTouchStart, false);
			layer.removeEventListener('touchmove', this.onTouchMove, false);
			layer.removeEventListener('touchend', this.onTouchEnd, false);
			layer.removeEventListener('touchcancel', this.onTouchCancel, false);
		};
	
	
		/**
		 * Check whether FastClick is needed.
		 *
		 * @param {Element} layer The layer to listen on
		 */
		FastClick.notNeeded = function(layer) {
			var metaViewport;
			var chromeVersion;
			var blackberryVersion;
			var firefoxVersion;
	
			// Devices that don't support touch don't need FastClick
			if (typeof window.ontouchstart === 'undefined') {
				return true;
			}
	
			// Chrome version - zero for other browsers
			chromeVersion = +(/Chrome\/([0-9]+)/.exec(navigator.userAgent) || [,0])[1];
	
			if (chromeVersion) {
	
				if (deviceIsAndroid) {
					metaViewport = document.querySelector('meta[name=viewport]');
	
					if (metaViewport) {
						// Chrome on Android with user-scalable="no" doesn't need FastClick (issue #89)
						if (metaViewport.content.indexOf('user-scalable=no') !== -1) {
							return true;
						}
						// Chrome 32 and above with width=device-width or less don't need FastClick
						if (chromeVersion > 31 && document.documentElement.scrollWidth <= window.outerWidth) {
							return true;
						}
					}
	
				// Chrome desktop doesn't need FastClick (issue #15)
				} else {
					return true;
				}
			}
	
			if (deviceIsBlackBerry10) {
				blackberryVersion = navigator.userAgent.match(/Version\/([0-9]*)\.([0-9]*)/);
	
				// BlackBerry 10.3+ does not require Fastclick library.
				// https://github.com/ftlabs/fastclick/issues/251
				if (blackberryVersion[1] >= 10 && blackberryVersion[2] >= 3) {
					metaViewport = document.querySelector('meta[name=viewport]');
	
					if (metaViewport) {
						// user-scalable=no eliminates click delay.
						if (metaViewport.content.indexOf('user-scalable=no') !== -1) {
							return true;
						}
						// width=device-width (or less than device-width) eliminates click delay.
						if (document.documentElement.scrollWidth <= window.outerWidth) {
							return true;
						}
					}
				}
			}
	
			// IE10 with -ms-touch-action: none or manipulation, which disables double-tap-to-zoom (issue #97)
			if (layer.style.msTouchAction === 'none' || layer.style.touchAction === 'manipulation') {
				return true;
			}
	
			// Firefox version - zero for other browsers
			firefoxVersion = +(/Firefox\/([0-9]+)/.exec(navigator.userAgent) || [,0])[1];
	
			if (firefoxVersion >= 27) {
				// Firefox 27+ does not have tap delay if the content is not zoomable - https://bugzilla.mozilla.org/show_bug.cgi?id=922896
	
				metaViewport = document.querySelector('meta[name=viewport]');
				if (metaViewport && (metaViewport.content.indexOf('user-scalable=no') !== -1 || document.documentElement.scrollWidth <= window.outerWidth)) {
					return true;
				}
			}
	
			// IE11: prefixed -ms-touch-action is no longer supported and it's recomended to use non-prefixed version
			// http://msdn.microsoft.com/en-us/library/windows/apps/Hh767313.aspx
			if (layer.style.touchAction === 'none' || layer.style.touchAction === 'manipulation') {
				return true;
			}
	
			return false;
		};
	
	
		/**
		 * Factory method for creating a FastClick object
		 *
		 * @param {Element} layer The layer to listen on
		 * @param {Object} [options={}] The options to override the defaults
		 */
		FastClick.attach = function(layer, options) {
			return new FastClick(layer, options);
		};
	
	
		if (true) {
	
			// AMD. Register as an anonymous module.
			!(__WEBPACK_AMD_DEFINE_RESULT__ = function() {
				return FastClick;
			}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
		} else if (typeof module !== 'undefined' && module.exports) {
			module.exports = FastClick.attach;
			module.exports.FastClick = FastClick;
		} else {
			window.FastClick = FastClick;
		}
	}());


/***/ }

});
//# sourceMappingURL=todos.js.map