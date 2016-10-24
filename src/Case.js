var $ = require('jquery');

function attachHandler($form, caseObj) {
    $form.on("formWhen", function(event) {
        var valueObj = $form.serializeObject();

        if (caseObj.conditionCheck(valueObj)) {
            caseObj.trueHandlers.fireWith(this, [event]);
        } else {
            caseObj.falseHandlers.fireWith(this, [event]);
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
            return $.proxy(this.condition(valueObj), this.$form);
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

        }


        return this.condition;
    }
};

module.exports = Case;