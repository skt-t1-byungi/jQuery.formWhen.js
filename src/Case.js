var $ = require('jquery');
var equal = require('deep-equal');

function attachHandler($form, caseObj) {
    $form.on("formWhen", function(event, valueObj) {
        if (caseObj.conditionCheck(valueObj)) {
            caseObj.trueHandlers.fireWith($form);
        } else {
            caseObj.falseHandlers.fireWith($form);
        }
    });
}

var Case = function($form, condition) {
    this.$form = $form;
    this.condtion = condtion;
    this.trueHandlers = $.Callbacks();
    this.falseHandlers = $.Callbacks();

    attachHandler($form, this);
};

Case.prototype = {
    then: function(trueHandler, falseHandler) {
        if ($.isFunction(trueHandler)) {
            this.trueHandlers.add(trueHandler);
        }

        if ($.isFunction(falseHandler)) {
            this.falseHandlers.add(trueHandler);
        }
        return this;
    },

    conditionCheck: function(valueObj) {
        if ($.isFunction(this.condition)) {
            return $this.condition.call(this.$form, valueObj);
        }

        //or
        if ($.isArray(this.condition)) {
            for (var i = this.condition.length - 1; i >= 0; i--) {
                if (this.conditionCheck(this.condition[i])) {
                    return true;
                }
            }
            return false;
        }

        //and
        if ($.isPlainObject(this.condition)) {
            for (var k in this.condition) {
                if (!equal(this.condition[k], valueObj[k])) {
                    return false;
                }
            }
            return true;
        }

        return this.condition;
    }
};

module.exports = Case;