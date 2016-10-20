$(function() {

    $('form').formWhen(function(when) {

        when(function(v) {
            return v.dream == 1;
        }, function(field) {
            field('name').hide();
        }, function(field) {
            field('name').show();
        });

        when(isNotEqual, hideSelectGroup, showSelectGroup);

    });

});