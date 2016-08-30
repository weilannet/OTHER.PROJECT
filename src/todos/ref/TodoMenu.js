/**
 * Created by gaoxin on 2016/7/27.
 */

import React, { Component } from 'react';
import { render } from 'react-dom';
let LimsLink = require('components/LimsLink');

export default class TodoMenu extends Component {

  constructor(props) {
    super(props);

  }
  onJsApi=(e)=>{
    this.props.onJsApi(e);
  }
  render() {
    return (
        <div id="todos-menu">
          <LimsLink className="link-item"
                    onJsApi={this.onJsApi}
                    to={{ pathname: '/todotab', query:{type:1}}}>
            <div className="menu menu_analysis"><span>分析任务审核</span><i></i></div>
          </LimsLink>

          <LimsLink className="link-item"
                    onJsApi={this.onJsApi}
                    to={{ pathname: '/todotab', query:{type:2 }}}>
            <div className="menu menu_coa"><span>合格证审核</span><i></i></div>
          </LimsLink>

          <LimsLink className="link-item"
                    onJsApi={this.onJsApi}
                    to={{ pathname: '/todotab', query:{type:0 }}}>
            <div className="menu menu_coa"><span>消息管理</span><i></i></div>
          </LimsLink>

        </div>

    );
  }
}
