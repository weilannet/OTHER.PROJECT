/**
 * Created by gaoxin on 2016/8/2.
 */


import React, { Component } from 'react';
import { render } from 'react-dom';


export default class CoaApprove extends Component {

  constructor(props) {
    super(props);
    this.state = {
      value: '',
      actived: 1
    };
  }

  checkedClick=(type,e)=>{
    this.setState({ actived: type });
  }

  handleChange=(e)=>{
    this.setState({value: this.refs.txtcontent.value});

  }

  submitForm= (e)=>{

    var _isApprove = this.state.actived;
    var _contet= this.state.value;

    this.props.submitForm(_isApprove, _contet);

  }

  render() {
    return (
        <div className="todo-approve" id="todo-approve">
          <div className="checkboxs">
            <span onClick={this.checkedClick.bind(this,1)} className={ this.state.actived==1?'active':'' } >同意</span>
            <span onClick={this.checkedClick.bind(this,2)} className={ this.state.actived==2?'active':'' }>拒绝</span>
            <span onClick={this.checkedClick.bind(this,3)} className={ this.state.actived==3?'active':'' }>废弃</span>
          </div>

          <textarea className="textinput"  value={this.state.value}
                    ref="txtcontent"     onChange={this.handleChange} placeholder="请输入审批意见!"></textarea>
          <br/>
          <button className="button" onClick={this.submitForm}>提交</button>


        </div>

    );
  }
}
