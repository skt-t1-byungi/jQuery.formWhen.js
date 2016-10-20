var $ = require('jquery');

var makeHandlerContainer = require('./makeHandlerContainer.js');
var makeFields = require('./makeFields.js');

module.exports = function($form) {

    var container = makeHandlerContainer($form);
    var fields = makeFields($form);

    return function(condFunction, trueHandler, falseHandler) {

        if (!$.isFunction(condFunction)) {
            return;
        }

        container.add(function(event, values) {

            if (condFunction(values) && $.isFunction(trueHandler)) {
                return trueHandler(fields, event);
            }

            if ($.isFunction(falseHandler)) {
                return falseHandler(fields, event);
            }
        });
    };
};