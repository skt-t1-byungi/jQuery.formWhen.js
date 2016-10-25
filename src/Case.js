var $ = require('jquery');
var equal = require('deep-equal');

function attachHandler($form, caseObj) {
    $form.on("formWhen", function(event, valueObj) {

        if (caseObj.conditionCheck(valueObj)) {
            if (!caseObj.lastState) {
                caseObj.lastState = true;
                caseObj.trueHandlers.fireWith($form, [caseObj.fieldHelper, valueObj]);
            }
        } else {
            if (caseObj.lastState) {
                caseObj.lastState = false;
                caseObj.falseHandlers.fireWith($form, [caseObj.fieldHelper, valueObj]);
            }
        }
    });
}

var Case = function($form, fieldHelper, condition) {
    this.$form = $form;
    this.condition = condition;
    this.lastState = null;
    this.trueHandlers = $.Callbacks();
    this.falseHandlers = $.Callbacks();
    this.fieldHelper = fieldHelper;

    attachHandler($form, this);
};

Case.prototype = {
    then: function(trueHandler, falseHandler) {
        if ($.isFunction(trueHandler)) {
            this.trueHandlers.add(trueHandler);
        }

        if ($.isFunction(falseHandler)) {
            this.falseHandlers.add(falseHandler);
        }
        return this;
    },

    conditionCheck: function(valueObj, condition) {
        condition = condition || this.condition;

        if ($.isFunction(condition)) {
            return condition.call(this.$form, valueObj);
        }

        //or
        if ($.isArray(condition)) {
            for (var i = condition.length - 1; i >= 0; i--) {
                if (this.conditionCheck(valueObj, condition[i])) {
                    return true;
                }
            }
            return false;
        }

        //and
        if ($.isPlainObject(condition)) {
            for (var k in condition) {
                if (!equal(condition[k], valueObj[k])) {
                    return false;
                }
            }
            return true;
        }
        return this.condition;
    },
};

module.exports = Case;