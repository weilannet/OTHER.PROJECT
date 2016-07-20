//单击事件和参数传递
import React, { Component } from 'react';
import { render } from 'react-dom';

export default class LinkButton extends Component {
    constructor(props) {
        super(props);
        this.state = {liked: false};
    }

    handleClick(param,pm2,pm3,e) {
        console.log(param);
        console.log(pm2);
        console.log(pm3);
        console.log(e);
        //可以手动修改，但是不符合规范
        //this.state = {liked: true};
        //console.log(this.state);
        this.setState({ liked: !this.state.liked });
    }
    //handleClick=(param,pm2,pm3,e)=>{
    //    console.log(param);
    //    console.log(pm2);
    //    console.log(pm3);
    //    console.log(e);
    //    this.setState({ liked: !this.state.liked });
    //}

    render() {
        const text = this.state.liked ? 'like' : 'haven\'t liked';
        return (
            <p onClick={this.handleClick.bind(this,23,"dfdf",function(){})}>
                You {text} this. Click to toggle.
            </p>
        );
    }
}



