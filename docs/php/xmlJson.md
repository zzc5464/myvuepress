# 数据交互

> 浏览器端只是负责用户的交互和数据的收集以及展示，真正的数据都是存储在服务器端的。我们现在通过ajax的确可以返回一些简单的数据（一个字符串），但是在实际开发过程中，肯定会会设计到大量的复杂类型的数据传输，比如数组、对象等，但是每个编程语言的语法都不一样。因此我们会采用通过的数据交换格式（XML、JSON）来进行数据的交互。

## XML

**什么是XML**

- XML 指可扩展标记语言（EXtensible Markup Language）
- XML 是一种标记语言，很类似 HTML
- XML 的设计宗旨是传输数据，而非显示数据
- XML 标签没有被预定义。您需要自行定义标签。



**语法规范**

+ 第一行必须是版本信息
+ 必须有一个根元素（有且仅有一个）
+ 标签不可有空格、不可以数字或.开头、大小写敏感
+ 不可交叉嵌套，都是双标签，如果是单标签，必须闭合
+ 属性双引号（浏览器自动修正成双引号了）
+ 特殊符号要使用实体
+ 注释和HTML一样

```xml
<students>
    <student>
        <name>张三</name>
        <age>18</age>
        <gender>男</gender>
        <desc>路人甲</desc>
    </student>
    <student>
        <name>李四</name>
        <age>20</age>
        <gender>男</gender>
        <desc>路人乙</desc>
    </student>
</students>
```

**php获取xml文件的内容**

```php
//注意，如果需要返回xml数据，需要把content-type改成text/xml,不然浏览器以text/html进行解析。
header('content-type:text/xml;charset=utf-8');
//用于获取文件的内容
//参数：文件的路径
$result = file_get_contents("data.xml");
echo $result;
```

**html解析xml**

```javascript
//获取服务端返回的xml数据，需要使用xhr.responseXML，这是一个document对象，可以使用DOM中的方法查找元素。
var data = xhr.responseXML;
//获取所有的学生
var students = data.querySelectorAll("student");
```

缺点：虽然可以描述和传输复杂数据，但是其解析过于复杂并且体积较大。





## JSON数据

JSON(JavaScript Object Notation, JS 对象标记) 是一种轻量级的数据交换格式。它基于 ECMAScript 规范的一个子集，采用完全独立于编程语言的文本格式来存储和表示数据。

+ 数据在名称/值对中
+ 数据由逗号分隔(最后一个健/值对不能带逗号)
+ 花括号保存对象，方括号保存数组
+ 键使用双引号

```javascript
    var obj = {a: 'Hello', b: 'World'}; //这是一个对象，注意键名也是可以使用引号包裹的
    var json = '{"a": "Hello", "b": "World"}'; //这是一个 JSON 字符串，本质是一个字符串
```
**JSON数据在不同语言进行传输时，类型为字符串，不同的语言各自也都对应有解析方法，需要解析完成后才能读取**

#### php处理json

- php关联数组==> json

```php
// php的关联数组
$obj = array(
  "a"=>"hello",
  "b"=>"world",
  "name"=>"胡聪聪"
);
//json字符串
$json = json_encode($obj);
echo $json;
```

- json===>php对象

```php
$json = '{"a": "Hello", "b": "World"}';//json字符串
//第一个参数：json字符串
//第二个参数：
	//false，将json转换成对象(默认)
	//true：将对象转换成数组(推荐)
$obj = json_decode($json,true);
echo $obj['a'];

//通过json文件获取到的内容就是一个json字符串。
$data = file_get_contents("data.json");
//将json转换成数组
$result = json_decode($data, true);
print_r($result);
```




####  JS处理json

+ JS对象 ==> JSON字符串 JSON.stringify(obj)
```javascript
    //obj是一个js对象
    var obj = {a: 'Hello', b: 'World'}
    //result就变成了一个json字符串了
    var result = JSON.stringify(obj);// '{"a": "Hello", "b": "World"}'
```


+ JSON字符串 ==> JS对象  JSON.parse(obj)
```javascript
    //json是一个json字符串
    var json = '{"a": "Hello", "b": "World"}';
    //obj就变成了一个js对象
    var obj = JSON.parse(json);// {a: 'Hello', b: 'World'}
```


#### eval

eval() 函数可计算某个字符串，并执行其中的的 JavaScript 代码。eval的参数是一个字符串，这个字符串是需要执行的表达式或者语句。

```javascript
console.log(eval("{}"));//undefined，因为{}备当成了代码块
console.log(eval("({})"));//obj，因为{}用()引起来了。

//使用这个方法，也可以将一个json字符串转换成js对象。
var json = '{"name":"zs", "age":18, "sex":"男"}';
var obj = eval("(" + json + ")");
console.log(obj);
```

注意：eval函数的功能非常的强大，但是实际使用的情况并不多。

- eval形式的代码难以阅读
- eval形式的代码无法打断点，因为本质还是还是一个字符串
- 在浏览器端执行任意的 JavaScript会带来潜在的安全风险，恶意的JavaScript代码可能会破坏应用

