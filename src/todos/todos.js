/**
 * Created by gaoxin on 2016/6/15.
 */

require('assets/style/reset.css');
require('assets/style/common.less');
require('./todos.less');

let React = require('react');
let ReactDOM = require('react-dom');
import { Router, Route, Link,IndexRoute,hashHistory,browserHistory} from 'react-router'
import iScroll from 'iscroll'

let limsCaller = require('assets/common/limsapi').limsCaller();
let limsRegister = require('assets/common/limsapi').limsRegister();

require('assets/js/util');
require('assets/js/config');

let LimsLink = require('components/LimsLink');
import ReactIScroll from 'components/react-iscroll';
let TodoHelp = require('./todohelp');

let FastClick = require('fastclick');

import LimsTab from './ref/LimsTab';
import  TodoMenu from './ref/TodoMenu';
import ViewAnalysis from './ref/ViewAnalysis';
import ViewCoa from './ref/ViewCoa';
import AnalysisInfo from './ref/AnalysisInfo';
import AnalysisApprove from './ref/AnalysisApprove';
import CoaInfo from './ref/CoaInfo';
import CoaApprove from './ref/CoaApprove';



const iScrollOptions = {
  mouseWheel: true,
  scrollbars: true,
  scrollX: false,
  probeType: 3,
  preventDefaultException: { tagName: /^(INPUT|TEXTAREA|BUTTON|SELECT|LI)$/ }
}

//审核主页面
const TodoApp = new React.createClass({
  contextTypes: {
    router: React.PropTypes.object.isRequired
  },
  onJsApi: function (to) {

    //H5页面按钮调用原生
    let _url = TodoHelp.getURL(to);
    console.log(_url);
    limsCaller.pushView({url: _url}, function () {
    });
  },
  render: function () {
    //console.log(this.props.children);
    return (
        <TodoMenu onJsApi={this.onJsApi}></TodoMenu>
    );
  },
  componentWillUnmount: function () {

  }
});

//Tab组件
const TodoTab = React.createClass({
      getInitialState() {
        return {
          tabStatus: 'active'

        };
      },
      contextTypes: {
        router: React.PropTypes.object.isRequired
      },

      componentWillMount: function () {
        let { type }=this.props.location.query;

        switch (parseInt(type) ){
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

      tabClick: function (sign) {

        //sign为0是待办，1是已办
        let { type }=this.props.location.query;
        this.context.type = type;
        this.context.router.push(
            {
              pathname: "/todotab/todolist/" + sign,
              action: "REPLACE",
              query: {type: type}
            }
        );

      },
      render: function () {
        return (
            <div id="todo-list">
              <LimsTab tabClick={ this.tabClick}></LimsTab>
              {this.props.children}
            </div>

        );
      }
    });

//TabList
const TodoList = React.createClass({
  init:{
    scrollStartPos:0,
    scrollPos:0,
    downreload:false,
    upreload:false,
    refresh:false
  },
  defaults: {
    pageindex: 1,
    pagesize: 5,
    uid: ''
  },
  getInitialState(){
    return {
      data_analysis: [],
      data_coa: [],
      todoDone: 0,
      todoType: 0,
      pageindex: this.defaults.pageindex,
      y: 0,
      isScrolling: false
    };
  },
  contextTypes: {
    router: React.PropTypes.object.isRequired
  },
  componentWillMount: function () {
    this.attachFastClick();
    let todoDone = this.props.params.isdone;
    let { type }=this.props.location.query;
    this.setState({todoDone: todoDone && parseInt(todoDone), todoType: type && parseInt(type)});

  },
  componentDidMount: function () {
    var that= this;
    TodoHelp.getUser(function(data){
      TodoHelp.setUser(data);
      $.extend(that.defaults, { isDone:that.state.isDone,uid:LimsUser.IDENTITY });
      that.queryList(that.defaults);

    });
  },
  componentWillReceiveProps: function (nextProps) {

    if (this.state.todoDone == parseInt(nextProps.params.isdone)) {
      return;
    }
    //this.setState({data_analysis: [], data_coa: [], todoDone: parseInt(nextProps.params.isdone)});
    $.extend(this.defaults, { isDone:parseInt(nextProps.params.isdone) });
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
  attachFastClick() {
    FastClick.attach(document.body);
  },
  sendAjax:function(params){
    var that = this;
    util.api({
      url: '/AppService.svc/GetTodosData',
      data: params,
      type: 'get',
      success: data => {

        if (data['msgcode']) {
          util.hidLoading();

          params.type==1
              ? that.setState({todoDone:params.isDone,data_analysis: (!that.init.refresh?data['data']['fields']:this.state.data_analysis.concat(data['data']['fields']))})
              : that.setState({todoDone:params.isDone,data_coa: (!that.init.refresh?data['data']['fields']:this.state.data_coa.concat(data['data']['fields']))});
        }
        that.init.refresh=false;
        that.init.downreload=false;
        that.init.upreload=false;
      },
      complete: function () {

      }
    }, false);
  },
  queryList: function (params) {
    //type为审核类型，1为分析任务审核，2为合格证审核
    util.showLoading();

    if (this.state.todoType == 1 || this.state.todoType == 0) {
      var params1= util.clone(params);
      this.sendAjax( $.extend(params1, {type: 1}));
    }
    //如果是消息管理，继续加载列表
    if (this.state.todoType == 2 || this.state.todoType == 0) {
      var param2= util.clone(params);
      this.sendAjax($.extend(param2, {type: 2}));

    }

  },
  onJsApi: function (to) {
    let _url = TodoHelp.getURL(to);
    console.log(_url);

    let _json = {
      url: _url,
      "button": [
        {
          "text": "审核",
          "icon": "",
          "jsapi": "approveBridge"
        }
      ],
      "params": to.query
    }
    //如果是已办，不设置button
    if (this.state.todoDone){
      _json['button'].length=0;
    }
    limsCaller.pushView(_json, function (response) {
    });

  },
  backFunction: function () {
    //browserHistory.goBack();
    this.context.router.replace('/');
  },
  onScrollStart:function(iScrollInstance){
    //this.setState({isScrolling: true})
    //console.log(`start:${iScrollInstance.y}`);
    var me= iScrollInstance;

    this.init.scrollStartPos=me.y;

  },
  onScrollEnd:function(iScrollInstance){
    var me=iScrollInstance;

    if (this.init.downreload||this.init.upreload){

      if (this.init.downreload){
        this.defaults.pageindex++;
        this.init.refresh = true;
      }
      if (this.init.upreload){
        this.defaults.pageindex=1;
        this.init.refresh = false;
      }
      this.queryList(this.defaults);
    }

    //this.setState({isScrolling: false, y: iScrollInstance.y})
    //console.log(`end:${iScrollInstance.y}`);
  },
  onScrollRefresh:function(iScrollInstance){

    const hasVerticalScroll = iScrollInstance.hasVerticalScroll

    if(this.state.canVerticallyScroll !== hasVerticalScroll) {
      this.setState({canVerticallyScroll: hasVerticalScroll})
    }
  },
  onScroll:function(iScrollInstance){
    var me= iScrollInstance;

    if (me.y < me.maxScrollY-50){
      //alert('刷');
      this.init.downreload=true;
    }
    if (me.y > 50){
      //alert('刷');
      this.init.upreload=true;
    }

    console.log(`onScroll:${iScrollInstance.y}`);
  },
  render: function () {

    //根据params.id不同，请求不同list
    let createItemAnaysis = (item, index) => {
      return (
          <LimsLink className="link-item" onJsApi={this.onJsApi}
                    to={{ pathname: '/todoinfo', query:{sign:this.state.todoType, type:1,data:encodeURIComponent(JSON.stringify(item&&item['fieldList']))}}}>
            <ViewAnalysis todoType={this.state.pageindex} todoDone={this.state.todoDone} item={item&&item['fieldList']}></ViewAnalysis>
          </LimsLink>
      );
    };
    let createItemCoa = (item, index) => {
      return (
          <LimsLink className="link-item" onJsApi={this.onJsApi}
                    to={{ pathname: '/todoinfo', query:{sign:this.state.todoType, type:2,data:encodeURIComponent(JSON.stringify(item&&item['fieldList']))}}}>
            <ViewCoa todoType={this.state.pageindex} todoDone={this.state.todoDone} item={item&&item['fieldList']}></ViewCoa>
          </LimsLink>
      );
    };

    return (
        <div id="wrapper">
          <ReactIScroll iScroll={iScroll}
                        options={iScrollOptions}
                        onScrollStart={this.onScrollStart}
                        onScrollEnd={this.onScrollEnd}
                        onRefresh={this.onScrollRefresh}
                        onScroll={this.onScroll}>
          <div id="scroller">
            { (this.state.todoType==1||this.state.todoType==0) &&this.state.data_analysis && this.state.data_analysis.map(createItemAnaysis)}
            { (this.state.todoType==2||this.state.todoType==0) &&this.state.data_coa && this.state.data_coa.map(createItemCoa)}

          </div>
          </ReactIScroll>

        </div>
    );

  }

});

//TabInfo
const TodoInfo = React.createClass({

  onAppApi: function (query) {
    //H5页面按钮调用原生
    let _url = TodoHelp.getURL({pathname: '/todoapprove', query: query});

    console.log(_url);
    limsCaller.pushView({url: _url}, function (response) {
    });

  },
  componentWillMount: function () {

    //如果是app模式则注册JS桥
    //alert(this.props.onJsApi);
    if (LimsConfig.isApp) {
      TodoHelp.setTitle('详细数据');
      //拿到LOCATION,调用JS桥推送location页面
      var _this = this;
      limsRegister.approveBridge(function (data, responseCallback) {
        //推审核的页面

        _this.onAppApi(data);
      });
    }
  },
  componentDidMount: function () {
  },
  contextTypes: {
    currentInfo: React.PropTypes.object
  },
  render: function () {

    let {data,type}=this.props.location.query;
    let result = JSON.parse(decodeURIComponent(data));
    switch (parseInt(type)) {
      case 1:
        return (
            <div>
              <AnalysisInfo data={ result }></AnalysisInfo>
              {!LimsConfig.isApp? <div onClick={()=>{ browserHistory.goBack() }}>点我返回</div>:''}

            </div>
        );
        break;
      case 2:
        return (
            <div>
              <CoaInfo data={ result }></CoaInfo>
              {!LimsConfig.isApp? <div onClick={()=>{ browserHistory.goBack() }}>点我返回</div>:''}
            </div>
        );
        break;
      default:
        break;

    }

  }
});

//TodoApprove
const TodoApprove = React.createClass({
  defaults : {
    uid:'',
    recordkey:'',
    uname:'',
    type:0,
    sign:0 //跳转到消息管理还是其他审核

 },
  propType: {
    todoStatus: React.PropTypes.int
  },
  getDefaultProps: function () {
    return {
      todoStatus: 1
    };
  },

  contextTypes: {
    router: React.PropTypes.object.isRequired
  },
  componentWillMount: function () {

    let {data,type,sign}=this.props.location.query;
    var result = JSON.parse(decodeURIComponent(data));

    for (var item of result) {
      if (item['id']=='IDENTITY' || item['id']=='ID'){
        this.defaults.recordkey=item['value'];
        break;
      }
    }
    this.defaults.type= type;
    this.defaults.sign= sign;
    TodoHelp.setTitle(type==1?`委托单号${this.defaults.recordkey}`:`样品编号${this.defaults.recordkey}`);

  },
  submitForm: function (action, text) {

    let recordkey=this.defaults.recordkey;
    let uname='系统';
    let uid='';

    let posturl=this.defaults.type==1?'CheckAnalysis':'CheckCoa';
    let postData = {action, text, recordkey, uname , uid};

    var that= this;
    TodoHelp.getUser(function(data){
      TodoHelp.setUser(data);

      $.extend(postData, { uid:LimsUser.IDENTITY });

      util.showLoading();
      util.api({
        url: '/AppService.svc/'+posturl,
        data: postData,
        type: 'get',
        success: data => {

          if (data['msgcode']) {
            util.hidLoading();
            util.showTip('提交成功!1s后跳转');
            setTimeout(function () {
              TodoHelp.popView('message');
              //alert(that.defaults.sign);
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
        complete: function () {

        }
      }, false);
    });







  },
  render(){
    let {type}=this.props.location.query;
    switch (parseInt(type)) {
      case 1:
        return (
            <div>
              <AnalysisApprove submitForm={this.submitForm}></AnalysisApprove>
              {!LimsConfig.isApp? <div onClick={()=>{ browserHistory.goBack() }}>点我返回</div>:''}

            </div>
        );
        break;
      case 2:
        return (
            <div>
              <CoaApprove submitForm={this.submitForm}></CoaApprove>
              {!LimsConfig.isApp? <div onClick={()=>{ browserHistory.goBack() }}>点我返回</div>:''}

            </div>
        );
        break;
      default:
        break;

    }

  }

});

//NoMatch
const NoMatch = React.createClass({
  render() {
    return <h3>没有匹配的路径</h3>
  }
});

const Dashboard = React.createClass({
  render() {
    return <div>Welcome to the app!</div>
  }
})

const DashboardAbout = React.createClass({
  render() {
    return <div>Welcome to the 审核!</div>
  }
})

ReactDOM.render(
    <div>
      {
        <Router history={hashHistory} location="history">
          <Route path="/" component={TodoApp}>

          </Route>
          <Route path="todotab" component={TodoTab} onLeave={()=>{console.log("离开了about路由页面");}}
                 onEnter={()=>{console.log("进入about路由页面")}}>
            <IndexRoute component={DashboardAbout}/>

            <Route path="todolist/:isdone" component={TodoList}>
              <IndexRoute component={Dashboard}/>
            </Route>

          </Route>
          <Route path="todoinfo" component={TodoInfo}>

          </Route>
          <Route path="todoapprove" component={TodoApprove}>

          </Route>
          <Route path="*" component={NoMatch}/>
        </Router>

      }
    </div>,
    document.getElementById('app')
);
