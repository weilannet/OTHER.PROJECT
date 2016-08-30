//import React, {Component} from 'react';
//import ReactDOM from 'react-dom';
//import { Router, Route, Link,IndexRoute,hashHistory,browserHistory} from 'react-router'

require('assets/style/reset.css');
require('assets/style/common.less');

require('./result.less');

let React = require('react');
let ReactDOM = require('react-dom');
import { Router, Route, Link,IndexRoute,hashHistory,browserHistory} from 'react-router'


const App = React.createClass({
  render() {
    return (
        <div>
          <h1>App</h1>
          <ul>
            <li><Link to="/about">About</Link></li>
            <li><Link to="/inbox">Inbox</Link></li>
            <li><Link to="/inbox1">Inbox111111111111</Link></li>
          </ul>
          {this.props.children}
        </div>
    )
  }
})

const About = React.createClass({
  render() {
    return <h3>About</h3>
  }
})

const Inbox = React.createClass({
  render() {
    return (
        <div>
          <h2>Inbox</h2>
          <ul>
            <li><Link to="/inbox/messages/2">2</Link></li>
            <li><Link to="/inbox/messages/3">3</Link></li>
          </ul>
          {this.props.children || "Welcome to your Inbox"}
        </div>
    )
  }
})

const Dashboard = React.createClass({
  render() {
    return <div>Welcome to the app!</div>
  }
})

const Message = React.createClass({
  componentDidMount:function(){
    setTimeout(function(){
      browserHistory.push('/about')
    },5000)
  },
  render() {
    return <h3>Message {this.props.params.id}</h3>
  }
})

const NoMatch = React.createClass({
  render() {
    return <h3>没有匹配的路径</h3>
  }
})

ReactDOM.render(
    <div>
      {
        <Router history={hashHistory}>
          <Route path="/" component={App}>
            <IndexRoute component={Dashboard} />
            <Route path="about" component={About} onLeave={()=>{console.log("离开了about路由页面");}}  onEnter={()=>{console.log("进入about路由页面")}}/>
            <Route path="inbox" component={Inbox}>
              <Route path="messages/:id" component={Message} />
              {
                //绝对路由写法
                //<Route path="/messages/:id" component={Message} />
              }
            </Route>

          </Route>
          <Route path="*" component={NoMatch}/>
        </Router>

      }

    </div>,
    document.getElementById('app')
);

