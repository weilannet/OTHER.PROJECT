webpackJsonp([0,4],{

/***/ 0:
/*!********************************!*\
  !*** ./src/message/message.js ***!
  \********************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _react = __webpack_require__(/*! react */ 1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _reactDom = __webpack_require__(/*! react-dom */ 38);
	
	var _reactDom2 = _interopRequireDefault(_reactDom);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	__webpack_require__(/*! assets/style/reset.css */ 168);
	__webpack_require__(/*! assets/style/common.less */ 170);
	
	__webpack_require__(/*! ./message.less */ 172);
	
	var style = {
	  backgroundColor: 'blue',
	  fontSize: '50px',
	  color: 'red'
	};
	
	var Hello2 = function (_Component) {
	  _inherits(Hello2, _Component);
	
	  // 注意这里有分号
	  // 用构造函数的方式初始化state
	
	  function Hello2(props) {
	    _classCallCheck(this, Hello2);
	
	    // 我们可以在构造函数中先对赋值给state的数据进行一些修改，然后再赋值
	
	    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Hello2).call(this, props));
	
	    _this.onClick = function () {
	      console.log("Hello2中的单击方法1");
	    };
	
	    _this.state = {
	      loopsRemaining: _this.props.maxLoops
	    };
	    return _this;
	  }
	  // 初始化state，一般不用这种方法
	  //state = {
	  //    loopsRemaining: this.props.maxLoops,
	  //}
	
	  _createClass(Hello2, [{
	    key: 'componentWillMount',
	    value: function componentWillMount() {
	      console.log("componentWillMount2");
	    }
	  }, {
	    key: 'componentDidMount',
	    value: function componentDidMount() {
	      //要在虚拟dom已经渲染到真实dom树上之后加监听事件
	      window.addEventListener('resize', function () {
	        console.log("窗体大小发生了变化");
	      });
	      console.log("componentDidMount2");
	    }
	  }, {
	    key: 'shouldComponentUpdate',
	    value: function shouldComponentUpdate() {
	      console.log("shouldComponentUpdate2");
	      return true;
	    }
	  }, {
	    key: 'componentWillUnmount',
	    value: function componentWillUnmount() {
	      //在组件生命周期离开的时候要把所有在组件生命周期中注册的方法取消掉
	      window.removeEventListener('resize', function () {
	        console.log("窗体大小发生了变化事件取消");
	      });
	    }
	    // 用ES6语法定义一个自定义的方法体
	
	  }, {
	    key: 'render',
	    value: function render() {
	      return _react2.default.createElement(
	        'div',
	        { className: 'message' },
	        _react2.default.createElement(
	          'div',
	          { style: style, onClick: this.onClick },
	          'Hello world 2'
	        )
	      );
	    }
	  }]);
	
	  return Hello2;
	}(_react.Component); /**
	                     * Created by gaoxin on 2016/6/8.
	                     */
	
	
	Hello2.defaultProps = {
	  autoPlay: false,
	  maxLoops: 10
	};
	exports.default = Hello2;
	_reactDom2.default.render(_react2.default.createElement(
	  'div',
	  null,
	  _react2.default.createElement(Hello2, null)
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

/***/ 172:
/*!**********************************!*\
  !*** ./src/message/message.less ***!
  \**********************************/
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ }

});
//# sourceMappingURL=message.js.map