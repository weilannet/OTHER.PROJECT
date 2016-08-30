webpackJsonp([1,4],{

/***/ 0:
/*!******************************!*\
  !*** ./src/result/result.js ***!
  \******************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _reactRouter = __webpack_require__(/*! react-router */ 173);
	
	//import React, {Component} from 'react';
	//import ReactDOM from 'react-dom';
	//import { Router, Route, Link,IndexRoute,hashHistory,browserHistory} from 'react-router'
	
	__webpack_require__(/*! assets/style/reset.css */ 168);
	__webpack_require__(/*! assets/style/common.less */ 170);
	
	__webpack_require__(/*! ./result.less */ 234);
	
	var React = __webpack_require__(/*! react */ 1);
	var ReactDOM = __webpack_require__(/*! react-dom */ 38);
	
	
	var App = React.createClass({
	  displayName: 'App',
	  render: function render() {
	    return React.createElement(
	      'div',
	      null,
	      React.createElement(
	        'h1',
	        null,
	        'App'
	      ),
	      React.createElement(
	        'ul',
	        null,
	        React.createElement(
	          'li',
	          null,
	          React.createElement(
	            _reactRouter.Link,
	            { to: '/about' },
	            'About'
	          )
	        ),
	        React.createElement(
	          'li',
	          null,
	          React.createElement(
	            _reactRouter.Link,
	            { to: '/inbox' },
	            'Inbox'
	          )
	        ),
	        React.createElement(
	          'li',
	          null,
	          React.createElement(
	            _reactRouter.Link,
	            { to: '/inbox1' },
	            'Inbox111111111111'
	          )
	        )
	      ),
	      this.props.children
	    );
	  }
	});
	
	var About = React.createClass({
	  displayName: 'About',
	  render: function render() {
	    return React.createElement(
	      'h3',
	      null,
	      'About'
	    );
	  }
	});
	
	var Inbox = React.createClass({
	  displayName: 'Inbox',
	  render: function render() {
	    return React.createElement(
	      'div',
	      null,
	      React.createElement(
	        'h2',
	        null,
	        'Inbox'
	      ),
	      React.createElement(
	        'ul',
	        null,
	        React.createElement(
	          'li',
	          null,
	          React.createElement(
	            _reactRouter.Link,
	            { to: '/inbox/messages/2' },
	            '2'
	          )
	        ),
	        React.createElement(
	          'li',
	          null,
	          React.createElement(
	            _reactRouter.Link,
	            { to: '/inbox/messages/3' },
	            '3'
	          )
	        )
	      ),
	      this.props.children || "Welcome to your Inbox"
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
	
	var Message = React.createClass({
	  displayName: 'Message',
	
	  componentDidMount: function componentDidMount() {
	    setTimeout(function () {
	      _reactRouter.browserHistory.push('/about');
	    }, 5000);
	  },
	  render: function render() {
	    return React.createElement(
	      'h3',
	      null,
	      'Message ',
	      this.props.params.id
	    );
	  }
	});
	
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
	
	ReactDOM.render(React.createElement(
	  'div',
	  null,
	  React.createElement(
	    _reactRouter.Router,
	    { history: _reactRouter.hashHistory },
	    React.createElement(
	      _reactRouter.Route,
	      { path: '/', component: App },
	      React.createElement(_reactRouter.IndexRoute, { component: Dashboard }),
	      React.createElement(_reactRouter.Route, { path: 'about', component: About, onLeave: function onLeave() {
	          console.log("离开了about路由页面");
	        }, onEnter: function onEnter() {
	          console.log("进入about路由页面");
	        } }),
	      React.createElement(
	        _reactRouter.Route,
	        { path: 'inbox', component: Inbox },
	        React.createElement(_reactRouter.Route, { path: 'messages/:id', component: Message })
	      )
	    ),
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

/***/ 234:
/*!********************************!*\
  !*** ./src/result/result.less ***!
  \********************************/
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ }

});
//# sourceMappingURL=result.js.map