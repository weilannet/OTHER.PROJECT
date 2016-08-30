/**
 * Created by gaoxin on 2016/8/2.
 */

import React, { Component } from 'react';
import { render } from 'react-dom';
import { Link } from 'react-router'

export default class AnalysisInfo extends Component {

  constructor(props) {
    super(props);

  }

  render() {
    let createItem = (item, index) => {
      if (item.is_show)
      {
        return (
            <li key={Date.now()+Math.random()*1000}>
              <span>{item.text}</span>
              <span>{item.value}</span>
            </li>

        );
      }
    };

    return (
        <div className="todo-info" id="todo-info">
          <ul>
            { this.props.data.map(createItem)}
          </ul>

          <Link to={{ pathname: '/todoapprove', query:{type:1,data:encodeURIComponent(JSON.stringify(this.props.data))}}}>点我进入审核</Link>
        </div>

    );
  }
}
