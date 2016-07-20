/**
 * Created by gaoxin on 2016/6/15.
 */

require('assets/style/reset.css');
require('assets/style/common.less');

require('./todos.less');

let React = require('react');
let ReactDOM = require('react-dom');
import { Router, Route, Link,IndexRoute,hashHistory,browserHistory} from 'react-router'

window.host = 'http://10.238.18.59:8033/';
window.isApp = 0;

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

function setupWebViewJavascriptBridge(callback) {
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
    document.documentElement.removeChild(WVJBIframe)
  }, 0)
}


function getLocation(to) {

  if (to && to.search) {
    return `${window.host}todos.html#${to.pathname}${to.search}`;

  }

  let _query = paramUrl(to.query);
  return `${window.host}todos.html#${to.pathname}?${_query }`;

}

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
  childContextTypes: {
    todoStatus: React.PropTypes.number
  },
  getChildContext: function () {
    return {
      todoStatus: this.props.todoStatus
    }
  },
  testApi:function(){


  },
  handleChange: function (event) {
    this.setState({value: event.target.value});
  },

  onJsApi: function (to) {
    //H5页面按钮调用原生
    var _this = this;
    let _url = getLocation(to);
    console.log(_url);
    setupWebViewJavascriptBridge(
        function (bridge) {
          bridge.callHandler('pushView', {url: _url}, function (response) {
            //log('JS got response', response)

          });
        });

  },
  render: function () {
    return (
        <div>

          <h2>主页</h2>
          <input
              type="text"
              value={this.state.value}
              onChange={this.handleChange}
          />
          <LimsLink className="link-item"
                    onJsApi={this.onJsApi} to={{ pathname: '/about', query:{'name':encodeURIComponent('分析任务审核')}}}>
            分析任务审核
          </LimsLink>
          <div onClick={ this.testApi }>测试新的JSAPI</div>
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
  contextTypes: {
    router: React.PropTypes.object.isRequired
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
          <h1>传参{ decodeURIComponent(name) }</h1>
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

const LimsLink = React.createClass({
  contextTypes: {
    router: React.PropTypes.object.isRequired
  },

  componentWillMount: function () {

  },
  getDefaultProps(){
    return {
      to: {
        pathname: '',
        query: null
      },
      className: '',
      onJsApi: null
    }

  },
  clickHandle: function () {

    if (window.isApp && this.props.onJsApi) {
      this.props.onJsApi(this.props.to);
      return;
    }

    this.context.router.push(
        {
          pathname: this.props.to.pathname,
          query: this.props.to.query
        }
    );

  },
  render: function () {
    return (<div className={this.props.className} onClick={ this.clickHandle }>{this.props.children}</div>);

  }

});

const Message = React.createClass({
  getInitialState() {
    return {
      currentInfo: 'hehe'

    };
  },
  contextTypes: {
    router: React.PropTypes.object.isRequired
  },
  childContextTypes: {
    currentInfo: React.PropTypes.string

  },
  getChildContext: function () {
    return {
      currentInfo: this.state.currentInfo
    }
  },
  onJsApi: function (to) {


    let _url = getLocation(to);
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

    setupWebViewJavascriptBridge(
        function (bridge) {
          bridge.callHandler('pushView', _json, function (response) {
            //log('JS got response', response)

          });
        });
  },
  render: function () {

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

        <ul >
          {list.map(createItem)}
        </ul>
    );
  }

});


const messageInfo = React.createClass({

  onAppApi: function (query) {
    //H5页面按钮调用原生
    var _this = this;
    //alert("query.id"+query.id);
    let _url = getLocation( {pathname:'/messageapprove/'+query.id,query: query});
    console.log(_url);
    setupWebViewJavascriptBridge(
        function (bridge) {
          bridge.callHandler('pushView', {url: _url}, function (response) {
            //log('JS got response', response)

          });
        });

  },
  componentWillMount: function () {
    // alert(1);
    //拿到LOCATION,调用JS桥推送location页面
    //
   var _this= this;

    setupWebViewJavascriptBridge(
        function (bridge) {
          bridge.registerHandler('approveBridge', function (data, responseCallback) {
            console.log(JSON.stringify(data));
           // var responseData = {'app says': 'okay!'}

            //推审核的页面
            _this.onAppApi(data);

            responseCallback("ok");
          })
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

    // console.log(this.context.currentInfo);
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
