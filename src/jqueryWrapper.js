var $ = require('jquery');
var Case = require('./Case.js');

require('./initFormWhenEvent.js');

function when(condition) {
    return new Case(this, condition);
}

$.fn.formWhen = function(defineFunction) {

    if (!$.isFunction(defineFunction)) {
        throw new Error('invalid define!');
    }

    if (this.length === 0) {
        return this;
    }

    defineFunction($.proxy(when, this));

    return this;
};