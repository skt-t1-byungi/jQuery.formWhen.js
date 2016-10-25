var $ = require('jquery');
require('jquery-serializeobject');

var Case = require('./Case.js');
require('./fieldHelper.js');
require('./defineFormWhenEvent.js');


$.fn.formWhen = function(defineFunction) {
    if (!$.isFunction(defineFunction)) {
        throw new Error('invalid define!');
    }

    if (this.length === 0) {
        return this;
    }

    var fieldHelper = (function(name) {
        return $.field(this, name);
    }).bind(this);

    var when = function(condition) {
        return new Case(this, fieldHelper, condition);
    };

    defineFunction(when.bind(this), fieldHelper);

    return this;
};