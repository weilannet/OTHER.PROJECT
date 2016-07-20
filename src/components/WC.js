import React, {Component} from 'react';
import ReactDOM from 'react-dom';

var proto = Object.create(HTMLElement.prototype, {
    createdCallback: {
        value: function() {
            var mountPoint = document.createElement('span');
            this.createShadowRoot().appendChild(mountPoint);

            var name = this.getAttribute('name');
            var url = 'https://www.google.com/search?q=' + encodeURIComponent(name);
            ReactDOM.render(<a href={url}>{name}</a>, mountPoint);
        }
    }
});
document.registerElement('x-search', {prototype: proto});


export default class WC extends React.Component{
    render() {
        return <div>Hello <x-search>{this.props.name}</x-search>!</div>;
    }
}