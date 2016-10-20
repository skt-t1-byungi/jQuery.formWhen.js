var $ = require('jquery');
var makeWhen = require('./makeWhen');

$.fn.formWhen = function(defineFunction) {

    if (!$.isFunction(defineFunction)) {
        throw new Error('invalid define!');
    }

    if (this.length === 0) {
        return this;
    }

    var when = makeWhen(this);

    defineFunction(when);

    return this;
};