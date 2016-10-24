var $ = require('jquery');
var equal = require('deep-equal');
var debounce = require('debounce');

var trigger = fucntion(event) {
    var $form = $(event.delegateTarget),
        old = $form.data('_formWhenOld'),
        current = $form.serializeObject();

    if (old && !equal(old, current)) {
        $form.data('_formWhenOld', current); //save old data
        $form.trigger('formWhen', [current]);
    }
}

$.event.special.formWhen = {
    setup: function() {
        var $form = $(this);

        $form.on('change.formWhen', '[name]:not(:text, textarea)', trigger);
        $form.on('input.formWhen', '[name]:text, [name]textarea', debounce(trigger, 200));
    },

    teardown: function() {
        $(this).off('.formWhen');
    },
};