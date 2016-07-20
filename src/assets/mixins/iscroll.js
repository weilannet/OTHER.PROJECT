let IScroll = require('assets/js/libs/iscroll-lite.js');
module.exports = {
    _iscroll: null,
    setIScroll(element) {
        //alert(3)
        this._iscroll = new IScroll(element, {
            click: true
        });
    },
    destroyIScroll() {
        this._iscroll && this._iscroll.destroy();
        this._iscroll = null;
    }
};