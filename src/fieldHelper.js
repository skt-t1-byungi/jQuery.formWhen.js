var $ = require('jquery');

$.field = function(elem, name) {
    var $form = elem.jquery ? elem : $(elem),
        $inputs = $form.find(':input[name]').not(':button');

    if (!name) {
        return $inputs;
    }

    switch ($.type(name)) {
        case 'string':
        case 'number':
            return $inputs.filter('[name=' + name + ']');

        case 'array':
            if (name.length === 0) {
                break;
            }

            var $set = $();
            for (var i = name.length - 1; i >= 0; i--) {
                $set = $set.add($.field(elem, name[i]));
            }

            return $set;

        case 'function':
            return $.field(elem, name());

        case 'regexp':
            return $inputs.filter(function() {
                return name.test($(this).attr('name'));
            });
    }

    return null;
};