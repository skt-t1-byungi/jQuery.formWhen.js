var $ = require('jquery');

module.exports = function($form) {
    var $inputs = $form.find(':input[name]').not(':button');

    var fields = function(selector) {
        if (!selector) {
            return $inputs;
        }

        switch ($.type(selector)) {
            case 'string':
            case 'number':
                return $inputs.filter('[name=' + selector + ']');

            case 'array':
                if (selector.length === 0) {
                    break;
                }

                var $set = $();

                for (var i = selector.length - 1; i >= 0; i--) {
                    $set = $set.add(fields(selector[i]));
                }
                return $set;

            case 'function':
                return fields(selector());

            case 'regexp':
                return $inputs.filter(function() {
                    return selector.test($(this).attr('name'));
                });
        }
    };

    return fields;
};