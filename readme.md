jQuery.formWhen.js
==============================
jQuery Interactive Form Helper

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
### formWhen(define: function(when, field))

### when(condtion: object|array|function(serializeObject))

#### then(trueHandler: function(field, serializeObject), falseHandler: function(field, serializeObject))

### field(name: array|function|regex|string|number) 


Description
---
폼값에 따라 동적으로 변화는 폼을 만들어야한다. 
조건들이 복잡할 수록 코드가 복잡해진다. 
양방향 데이터 바인딩처럼 조건에만 집중하고 싶었다. 