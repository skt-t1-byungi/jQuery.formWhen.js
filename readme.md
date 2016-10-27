jQuery.formWhen.js
==============================
jQuery Interactive Form Helper

Browser support
---
IE 9 <= *


Description
---
폼값에 따라 동적으로 변화는 폼을 만들어야한다. 
조건들이 복잡할 수록 코드가 복잡해진다. 
양방향 데이터 바인딩처럼 값과 조건에만 집중하고 싶었다. 

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
```js
$form = $("form").formWhen(function(when, field){

    when(...).then(...);

    console.log(this === $form); //true
    console.log(field('input1') === this.find('[name=input1]')); //true
});
```

### when(condtion: object|array|function(serializeObject))
이벤트 발생하는 condtion을 정의합니다.

#### function condtion
```js
$("form").formWhen(function(when, field){
    when(function(v){
        return v.input1 === "val1" && v.select1 === "val2";
    }).then(...);
});
```
function으로 정의힙니다. v는 form의 serializeObject입니다.

#### object condtion
```js
$("form").formWhen(function(when, field){
    when({input1:"val1", select1:"val2"}).then(...);
});
```
object로 정의합니다. form의 serializeObject에 contain인지 확인합니다.


#### array condtion
```js
$("form").formWhen(function(when, field){
    when([
        {input1:"val1"},
        {input1:"val2"}
    ]).then(...);

    //same way.
    //
    // function(v){
    //     return v.input==="val1" || input1 === 'val2';
    // }
});
```
array로 정의합니다. 배열 원소끼리는 일종의 `or`관계입니다.

### then(trueHandler: function(field, serializeObject), falseHandler: function(field, serializeObject))
이벤트를 바인딩합니다. when조건이 true면 trueHandler을, false면 falseHandler을 트리거합니다.
```js
var $form = $("form").formWhen(function(when/* , field */){

    when(...)
        .then(function(field, v){
            //this === $form
            this.find("[name=input1]").css("background", "red").val(v.select3);
        }, function(field, v){
            field("input1").css("background", "none").val("");
        })
        .then(...); //support method chaining

});
```
각 핸들러에는 field헬퍼와 serializeObject을 인자로 제공합니다. falseHandler만 바인딩할 때에는 `.then(null, falseHandler)`.

### field(name: array|function|regex|string|number) 
jquery 래핑된 폼 필드를 쉽게 갖고 오는 헬퍼입니다.
