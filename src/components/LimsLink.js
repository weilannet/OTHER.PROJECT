/**
 * Created by gaoxin on 2016/7/21.
 */

let React = require('react');
let ReactDOM = require('react-dom');
//重写LINK组件
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
  clickHandle: function (ev) {
     //如果是APP模式，并且设置了jsAPI,则调用该JSAPI，传入PATHNAME和QUERY

    ev.preventDefault();

    if (LimsConfig.isApp && this.props.onJsApi) {
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
module.exports=LimsLink;