let FastClick = require('fastclick');
module.exports = {
  
    componentWillMount() {
       this.attachFastClick();
        //document.addEventListener('DOMContentLoaded', this.attachFastClick, false);
    },
    componentWillUnmount() {
        //document.removeEventListener('DOMContentLoaded', this.attachFastClick);  
    },
    attachFastClick() {

        FastClick.attach(document.body);
    }
};