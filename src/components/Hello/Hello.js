//import './hello.css';
//import './hello.scss';
////import React, {Component} from 'react';
//var React = require('react');
//let style={
//    backgroundColor:'blue'
//}

//ES6语法
//export default class Hello extends Component {
//
//    render() {
//        return (
//            <div>
//                <h1 style={style}>Hello world</h1>
//                <img/>
//            </div>
//        )
//    }
//}

 //ES5写法，用React.createClass创建模块
import './Hello.css';
//import './Hello.scss';

var React = require('react');

// 内联样式
let style={
    backgroundColor:'blue'
}

var Hello = React.createClass({
    getInitialState() {
        console.log("getInitialState");
        return { liked: false };
    },
    getDefaultProps(){
        console.log("getDefaultProps");
    },
    componentWillMount(){
        console.log("componentWillMount");
    },
    componentDidMount(){
        const _that=this;
        setTimeout(function(){
            _that.setState({liked:true})
        },5000)
        console.log("componentDidMount");
    },
    shouldComponentUpdate(){
        console.log("shouldComponentUpdate");
        return true;
    },
    render: function() {
        console.log("render");
        return(
            <div>
                <h1 style={style}>Hello world</h1>
                <br/>
                <img/>
            </div>
        )
    }
});

module.exports = Hello;