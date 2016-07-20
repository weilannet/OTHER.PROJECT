import React, {Component} from 'react';

let style={
    backgroundColor:'blue',
    fontSize:'50px',
    color:'red'
}

export default class Hello2 extends Component {
    static defaultProps = {
        autoPlay: false,
        maxLoops: 10,
    };// 注意这里有分号
    // 用构造函数的方式初始化state
    constructor(props){
        super(props);
        // 我们可以在构造函数中先对赋值给state的数据进行一些修改，然后再赋值
        this.state = {
            loopsRemaining: this.props.maxLoops,
        };
    }
    // 初始化state，一般不用这种方法
    //state = {
    //    loopsRemaining: this.props.maxLoops,
    //}

    componentWillMount(){
        console.log("componentWillMount2");
    }
    componentDidMount(){
        //要在虚拟dom已经渲染到真实dom树上之后加监听事件
        window.addEventListener('resize', function(){
            console.log("窗体大小发生了变化");
        });
        console.log("componentDidMount2");
    }
    shouldComponentUpdate(){
        console.log("shouldComponentUpdate2");
        return true;
    }
    componentWillUnmount(){
        //在组件生命周期离开的时候要把所有在组件生命周期中注册的方法取消掉
        window.removeEventListener('resize',function(){
            console.log("窗体大小发生了变化事件取消");
        });
    }
    // 用ES6语法定义一个自定义的方法体
    onClick=()=>{
        console.log("Hello2中的单击方法1");
    }
    render() {
        return (
            <div>
                <h1 style={style} onClick={this.onClick}>Hello world 2</h1>
            </div>
        )
    }
}