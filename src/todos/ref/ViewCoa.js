/**
 * Created by gaoxin on 2016/7/27.
 */

import React, { Component } from 'react';
import { render } from 'react-dom';

export default class ViewCoa extends Component {

  constructor(props) {
    super(props);

  }
  shouldComponentUpdate(nextProps, nextState) {

    if (this.props.todoType == nextProps.todoType&&this.props.todoDone == nextProps.todoDone) {
      return false;
    }
    return true;
  }
  render() {

    let createRow = (item, index) => {

      if (item.is_show && item.is_main) {
        return (
            <li key={Date.now()+Math.random()*1000}>
              <span>{item.text}</span><span>{item.value}</span></li>
        )
      }
    }
    return (
        <div id="list-data" className="list-data" key={Date.now()+Math.random()*1000}>
          <div className="title">
            <span>待办类型</span>
            <span>合格证审批</span>
          </div>
          <ul className="content">
            {this.props.item.map(createRow)}
          </ul>
        </div>

    );
  }
}
