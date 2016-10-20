var $ = require('jquery');

/**
 * 인풋타입마다 이벤트타입 다르게 적용.
 */
function isValidEventType($el, eventType) {
    var isKeyUpElement = $el.is(':text, textarea');

    if (isKeyUpElement && eventType !== 'keyup') {
        return false;
    }

    if (!isKeyUpElement && eventType === 'change') {
        return false;
    }

    return true;
}

/**
 * @links http://stackoverflow.com/a/1186309
 */
function toObject(a) {
    var o = {};
    $.each(a, function() {
        if (o[this.name] !== undefined) {
            if (!o[this.name].push) {
                o[this.name] = [o[this.name]];
            }
            o[this.name].push(this.value || '');
        } else {
            o[this.name] = this.value || '';
        }
    });
    return o;
}

module.exports = function($form) {
    var container = $.Callbacks();

    $form.on('keyup change', ':input[name]:not(:button)', function(event) {

        if (!isValidEventType($(this), event.type)) {
            return;
        }

        container.fireWith($form, [event, toObject($form.serializeArray())]);
    });

    return container;
};