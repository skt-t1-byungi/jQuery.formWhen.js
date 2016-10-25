jQuery.formWhen.js
==============================
Interactive jQuery Form Helper

Browser support
---
IE 9 <= *

What?
---
### before
```js
var $form = $("form");
var $select = $form.find("[name=select]");

var $input1 = $form.find("[name=input1]").change(function(){
    var val = $(this).val();

    if(val === "val1"){
        $select.fadeIn();
    }else{
        $select.fadeOut();
    }
});
```

### after
```js
$("form").formWhen(function(when, field){
    when({input1: "val1"})
        .then(function(){
            field("select").fadeIn();
        }, function(){
            field("select").fadeOut();
        });
});
```

There is no difference? more complex, There is a difference.

Usage
---
### when(condtion: object|array|function(serializeObject))

#### then(trueHandler: function(field, serializeObject), falseHandler: function(field, serializeObject))

### field(name: array|function|regex|string|number) 

