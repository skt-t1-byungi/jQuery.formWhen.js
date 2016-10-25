$('form').formWhen(function(when, formField) {

    when({ input1: "val1" }).then(function(field, v) {
        field('select1').fadeIn();
    }, function(field, v) {
        this.find('[name=select1]').fadeOut();
    });

    var caseWhen = when(function(v) {
        return v.select2 == 'sel2' && v.select3 == 'sel3'
    }).then(function(field, v) {
        field('input4').css('background', 'yellow');
    }, function(field, v) {
        field('input4').css('background', 'none');
    })

    caseWhen.then(function() {
        this.find('[name=input4]').val('색깔이 바꼈당!!!');
    });

    when({ input3: 'init' })
        .then(function(field) {
            field(/^sel/).val('sel1');
        });

    when([
            { input1: "val2", select1: "sel1" },
            function(v) {
                return v.select3 == "sel2";
            },
            { input4: "test", },
            [
                { input1: "val1", select1: "sel3" },
                function(v) {
                    return v.content === 'test1';
                }
            ]
        ])
        .then(function() {
            formField(["select3", "input3"]).css("background", "red");
        }, function() {
            formField(["select3", "input3"]).css("background", "none");
        })

});