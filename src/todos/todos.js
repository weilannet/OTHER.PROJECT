/**
 * Created by gaoxin on 2016/6/15.
 */

require('assets/style/reset.css');
require('assets/style/common.less');
require('./todos.css');

let React = require('react');
let ReactDOM = require('react-dom');
import { Router, Route, Link,IndexRoute,hashHistory,browserHistory} from 'react-router'


let limsCaller= require('assets/common/limsapi').limsCaller();
let limsRegister= require('assets/common/limsapi').limsRegister();
require('assets/js/config');
let LimsLink= require('components/LimsLink');


function getURL(to) {
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

  if (to && to.search) {
    return `${LimsConfig.host}todos.html#${to.pathname}${to.search}`;

  }

  let _query = paramUrl(to.query);
  return `${LimsConfig.host}todos.html#${to.pathname}?${_query }`;

}

//审核主页面
const App = new React.createClass({
  propType: {
    todoStatus: React.PropTypes.int
  },
  contextTypes: {
    router: React.PropTypes.object.isRequired
  },
  getDefaultProps: function () {
    return {
      todoStatus: 1

    };

  },
  getInitialState: function () {
    return {
      value: 'Hello!'
    };
  },
  handleChange: function (event) {
    this.setState({value: event.target.value});
  },

  onJsApi: function (to) {
    //H5页面按钮调用原生
    let _url = getURL(to);
    console.log(_url);
    limsCaller.pushView({url: _url},function(){

    });
  },
  render: function () {
    return (
        <div id="todos">

          <h2>主页</h2>
          <input
              type="text"
              value={this.state.value}
              onChange={this.handleChange}
          />

          <LimsLink className="link-item"
                    onJsApi={this.onJsApi} to={{ pathname: '/about', query:{'name':encodeURIComponent('分析任务审核')}}}>

            <div className="menu menu_analysis"><span>分析任务审核</span><i></i></div>
          </LimsLink>
          <LimsLink className="link-item"
                    onJsApi={this.onJsApi} to={{ pathname: '/Inbox', query:{'name':encodeURIComponent('合格证审核')}}}>
            <div className="menu menu_coa"><span>合格证审核</span><i></i></div>
          </LimsLink>
          <div className="agenda">
            {this.props.children}
          </div>
        </div>

    );
  },

  componentWillUnmount: function () {

  }


});


const About = React.createClass({
  getInitialState() {
    return {
      currentInfo: 'hehe'

    };
  },
  contextTypes: {
    router: React.PropTypes.object.isRequired
  } ,
  childContextTypes:{
    currentInfo: React.PropTypes.string
  },
  getChildContext: function() {
    return {
      currentInfo: this.state.currentInfo
    }
  },
  componentWillMount: function () {

  },
  backFunction: function () {
    //browserHistory.goBack();
    this.context.router.replace('/');
  },
  goInbox: function () {
    this.context.router.push('/inbox');
    //Router.browserHistory.pushState(null, '/inbox');
    //browserHistory.push('/inbox');

  },
  render: function () {

    let { name }=this.props.location.query;
    return (
        <div>

          <p>测试currentInfo {this.state.currentInfo}</p>
          <h1>地址传参{ decodeURIComponent(name) }</h1>
          <div onClick={ this.backFunction }>点我返回</div>

          <ul>
            <li><Link to= { { pathname:"/about/message/1",action:"REPLACE" }} >待办</Link></li>
            <li><Link to= { { pathname:"/about/message/2",action:"REPLACE" }} >已办</Link></li>
          </ul>
          {this.props.children}
        </div>

    );
  }
});

const Message = React.createClass({
  getInitialState() {
    return {
      //currentInfo: 'hehe'

    };
  },
  contextTypes: {
    router: React.PropTypes.object.isRequired,
    currentInfo: React.PropTypes.string
  },
  onJsApi: function (to) {

    let _url = getURL(to);
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
    limsCaller.pushView(_json,function(response){

    });

  },
  render: function () {
    this.context.currentInfo="lala";
    //根据params.id不同，请求不同list
    let list = [];
    if (this.props.params.id == 1) {
      list = [
        {id: "1", "name": "待办-gaoxin", age: 18},
        {id: "2", "name": "待办-gaoxin2", age: 19},
        {id: "3", "name": "待办-gaoxin3", age: 20},
        {id: "4", "name": "待办-gaoxin4", age: 21},
        {id: "5", "name": "待办-gaoxin5", age: 22},

      ];

    } else {
      list = [
        {id: "1", "name": "已办-gaoxin", age: 18},
        {id: "2", "name": "已办-gaoxin2", age: 19},
        {id: "3", "name": "已办-gaoxin3", age: 20},
        {id: "4", "name": "已办-gaoxin4", age: 21},
        {id: "5", "name": "已办-gaoxin5", age: 22},

      ];

    }

    let createItem = (item, index) => {
      return (
          <li className="list-item" key={item.id}>

            <LimsLink className="link-item"
                      onJsApi={this.onJsApi}
                      to={{ pathname: '/messageinfo/'+item.id, query:{'id':item.id, 'name': encodeURIComponent(item.name) ,'age':item.age}}}
                     >

              <div>{item.id}</div>
              <div>{item.name}</div>
              <div>{item.age}</div>
            </LimsLink>

          </li>
      );
    };

    return (
        <div>
          <h1>测试currentInfo传参{this.context.currentInfo}</h1>
        <ul >
          {list.map(createItem)}
        </ul>
          </div>
    );
  }

});


const messageInfo = React.createClass({

  onAppApi: function (query) {
    //H5页面按钮调用原生
    let _url = getURL( {pathname:'/messageapprove/'+query.id,query: query});
    console.log(_url);
    limsCaller.pushView( {url: _url},function(response){

    });

  },
  componentWillMount: function () {

    //拿到LOCATION,调用JS桥推送location页面
   var _this= this;
    limsRegister.approveBridge(function(data,responseCallback){

          //推审核的页面
         _this.onAppApi(data);
    });
  },
  componentDidMount: function () {


  },
  contextTypes: {
    currentInfo: React.PropTypes.object
  },

  getList: function () {
    let {id,name,age}=this.props.location.query;
    return (
        <div>
          <div onClick={()=>{ browserHistory.goBack() }}>点我返回</div>

          <ul>
            <li>{id}</li>
            <li>{ decodeURIComponent(name)}</li>
            <li>{age}</li>

          </ul>
          <Link  to={{ pathname: '/messageapprove/'+id, query:{'id':id, 'name':name,'age':age}}}>点我进入待办</Link>
        </div>

    );
    //

  },
  render: function () {
    return this.getList();
  }


});

const messageApprove= React.createClass({

   render(){

     let {id,name,age}=this.props.location.query;

   return (
     <div>
       <p>这里是审核界面</p><br/>
       <ul>
         <li>id:{id}</li>
         <li>name:{decodeURIComponent(name)}</li>
         <li>age:{age}</li>
       </ul><br/>
       <div onClick={()=>{ browserHistory.goBack() }}>点我返回</div>

       <div><span>同意</span><span>选择</span></div>
       <div><span>拒绝</span><span>选择</span></div>

       <textarea width="100%" height="500px" placeholder="请输入审批意见!"></textarea>
       <br/><button width="100%" height="100px" >提交 </button>
     </div>

   );
   }

});

const Inbox = React.createClass({
  render: function () {
    return (

        <div >
          <h1>我是合格证审核</h1>
          <div onClick={() => browserHistory.goBack()}>点我返回</div>
        </div>
    );
  }

});


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
          <Route path="/" component={App}>
            <IndexRoute component={Dashboard}/>
            <Route path="inbox" component={Inbox}/>

          </Route>
          <Route path="about" component={About} onLeave={()=>{console.log("离开了about路由页面");}}
                 onEnter={()=>{console.log("进入about路由页面")}}>
            <IndexRoute component={DashboardAbout}/>

            <Route path="message/:id" component={Message}>
            <IndexRoute component={Dashboard}/>
          </Route>

          </Route>
          <Route path="messageinfo/:id" component={messageInfo}>

          </Route>
          <Route path="messageapprove/:id" component={messageApprove}>

          </Route>
          <Route path="*" component={NoMatch}/>
        </Router>

      }

    </div>,
    document.getElementById('app')
);
