import React, {Component} from 'react';

var Button = React.createClass({
    contextTypes: {
        color: React.PropTypes.string
    },
    render: function() {
        return (
            <button style={{background: this.context.color}}>
                {this.props.children}
            </button>
        );
    }
});

var Message = React.createClass({
    render: function() {
        return (
            <div>
                {this.props.text} <Button>Delete</Button>
            </div>
        );
    }
});

var MessageList = React.createClass({
    childContextTypes: {
        color: React.PropTypes.string
    },
    getChildContext: function() {
        return {color: "purple"};
    },
    render: function() {
        var children = this.props.messages.map(function(message) {
            return <Message key={Date.now()+Math.random()} text={message.text} />;
        });
        return <div>{children}</div>;
    }
});

module.exports=MessageList;