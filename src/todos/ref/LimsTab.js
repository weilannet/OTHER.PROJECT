/**
 * Created by gaoxin on 2016/7/27.
 */

import React, { Component } from 'react';
import { render } from 'react-dom';

export default class LimsTab extends Component {

  constructor(props) {
    super(props);
    this.state = {
      liked: false,
      actived:0
    };
    this.tabClick = this.tabClick.bind(this);
  }

  tabClick=(type,e)=>{
    //console.log(type);
    //console.log(e.target);

      this.setState({ actived: type });
      this.props.tabClick(type);
  }

  componentDidMount(){
    this.props.tabClick(0);
  }

  render() {
    return (
        <ul className="tab" key={Date.now()+Math.random()*1000}>
        <li className={ this.state.actived==0?'active':'' } onClick={this.tabClick.bind(this,0)}><i></i><span>待办</span></li>
        <li className={ this.state.actived==1?'active':'' }  onClick={this.tabClick.bind(this,1)}><i></i><span>已办</span></li>
        </ul>

    );
  }
}
