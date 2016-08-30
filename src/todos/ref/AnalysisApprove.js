/**
 * Created by gaoxin on 2016/8/2.
 */


import React, { Component } from 'react';
import { render } from 'react-dom';


export default class AnalysisApprove extends Component {

  constructor(props) {
    super(props);
    this.state = {
      value: '',
      actived: true
    };
  }

  checkedClick=(e)=>{
    this.setState({ actived: !this.state.actived });
  }

  handleChange=(e)=>{

    this.setState({value: this.refs.txtcontent.value});

  }

  submitForm= (e)=>{

    var _isApprove = this.state.actived?'pass':'reject';

    var _contet= this.state.value;

    this.props.submitForm(_isApprove, _contet);

  }

  render() {
    return (
        <div className="todo-approve" id="todo-approve">
          <div className="checkboxs">
            <span onClick={this.checkedClick} className={ this.state.actived?'active':'' } >同意</span>
            <span onClick={this.checkedClick} className={ this.state.actived?'':'active' }>拒绝</span>
          </div>

          <textarea className="textinput"  value={this.state.value}
                ref="txtcontent"    onChange={this.handleChange.bind(this)} placeholder="请输入审批意见!"></textarea>
          <br/>
          <button className="button" onClick={this.submitForm}>提交</button>


        </div>

    );
  }
}
