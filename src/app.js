import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Link,IndexRoute,hashHistory,browserHistory} from 'react-router'


import Hello from './components/Hello/Hello.js';
import Hello2 from './components/Hello2.js';
import LinkButton from './components/LinkButton.jsx';
import MyInputFocus from './components/MyInputFocus.jsx';
import TodoApp from './components/TodoList.js';
import Message1 from './components/Message.js';
import WC from './components/WC.js';

//扩展属性
//var props = {};
//props.foo = "石";
//props.bar = "国";
//<Hello foo="shi" too="guo" foo="石" bar="国"/>
//<Hello foo="shi" too="guo" {...props}/>


const App = React.createClass({
    render() {
        return (
            <div>
                <h1>App</h1>
                <ul>
                    <li><Link to="/about">About</Link></li>
                    <li><Link to="/inbox">Inbox2222</Link></li>
                    <li><Link to="/inbox1">Inbox1</Link></li>
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
        <Router history={browserHistory}>
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


        //    <Message1 messages={["1","2","3"]}/>
        //<WC/>
            //<TodoApp/>
            //<Hello foo="shi" too="guo" {...props}/>
            //<Hello2/>
            //<LinkButton/>
            //<MyInputFocus/>
        }

    </div>,
    document.getElementById('app')
);

