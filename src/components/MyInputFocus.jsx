//dom操作demo
import React, { Component } from 'react';

export default class MyInputFocus extends Component {
    static defaultProps={
        autoPlay:false,
        maxLoops:10,
    }
    static propTypes = {
        autoPlay: React.PropTypes.bool.isRequired,
        maxLoops: React.PropTypes.number.isRequired,
    }
    state={
        userInput: '123'
    }

    //constructor(props) {
    //    super(props);
    //    //this.state={ userInput: '' };
    //}

    handleChange(e) {
        console.log(this.refs.theInput);
        console.log(this.refs.theInput.value);
        this.setState({ userInput: e.target.value });2
    }

    clearAndFocusInput() {
        this.setState({ userInput: '' }, () => {
            this.refs.theInput.focus();
        });
    }

    render() {
        return (
            <div>
                <div onClick={this.clearAndFocusInput.bind(this)}>
                    Click to Focus and Reset
                </div>
                <input
                    ref="theInput"
                    value={this.state.userInput}
                    onChange={this.handleChange.bind(this)}
                />
                <input
                    ref="theInput"
                    value='shiguoqing'/>
            </div>
        );
    }
}

//写在外面的写法
//MyInputFocus.defaultProps={
//    autoPlay:false,
//    maxLoops:10,
//}
//MyInputFocus.propTypes = {
//    autoPlay: React.PropTypes.bool.isRequired,
//    maxLoops: React.PropTypes.number.isRequired,
//}
