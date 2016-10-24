$(function() {

    $('form').formWhen(function(when) {

        when({ dream: 2, name: "sss" })
            .then(function() {
                $.field(this, 'name').show();
            }, function() {
                $.field(this, 'name').hide();
            });

        when(function(v) {
                return v.dream == 2 && name == "sss";
            })
            .then(function() {
                $.field(this, 'name').show();
            }, function() {
                $.field(this, 'name').hide();
            });

        when(isNotEqual).then(hideSelectGroup, showSelectGroup);
    });

});