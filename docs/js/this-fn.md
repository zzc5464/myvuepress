# this的指向

## 可以肯定的this指向

### 函数自调用

```js
function fn(){};
fn();
//指向window
```

### 对象调用

```js
var obj = {
  a:function(){}
}
obj.a();//指向obj
```

### 构造函数调用

```js
function Fn(){
  this.a = function(){}
}
var f = new Fn();
f.a();
//a函数的this指向实例对象
```

- 都是指向调用他们的对象
- 都是指向上一级对象

## 可以被更改的this指向

### call

- 借用别人的方法实现效果

```js
//将伪数组变成真数组
var feakerArr = {
  0:'aa',
  1:'bb',
  length:2
}
var trueArr = Array.prototype.splice.call(feakerArr);
//trueArr就接收到了返回的真数组，可以调用数组的方法
//类似的还有计算一个数组的max值，等等
```

- 实现继承

```js
function Animal(name){
  this.name = name;
  this.showName = function(){
    alert(this.name);
  }
}
//继承了Animal类
function Cat(name){
    Animal.call(this, name);
}
//cat类就可以调用animal类里面的方法了
var cat = new Cat("laowang");
cat.showName();//laowang
```



### apply

- call和apply功能是一样的，只是传参不同
- call的传参就想打电话，要一个个打，一个个传参
- apply就像主持会议，大家一起来开

### bind

1. 返回一个函数
2. 绑定this指向
3. 可以实现call同样的效果

```js
var obj1 = {
    our:function(){
        console.log("zzc");
    }
};
var obj2 = {
    age:18
};
console.log(obj1.our.bind(obj2));
/*
返回了一个函数
  ƒ (){
    console.log("zzc");
  }
*/
```

- 也可以进行传参

```js
var obj1 = {
    our:function(){
        console.log("zzc");
    },
    job:function(a,b,c,d) {
        return a+b+c+d;
    }
};
var obj2 = {
    age:18
};
var r = obj1.job.bind(obj2,1,2,3,4)();
console.log(r);
```

- 比较不一样的是，bind中传的实参如果比形参少，会占掉前面形参的位置，当函数调用的时候只会传后面没传的位置

> 具体看例子，比较绕

```js
var obj1 = {
    our:function(){
        console.log("zzc");
    },
    job:function(a,b,c,d) {
        a=a||1;
        b=b||1;
        c=c||1;
        d=d||1;
        return a+b+c+d;
    }
};
var obj2 = {
    age:18
};
//一共四个，bind的时候占用2个
var r = obj1.job.bind(obj2,1,2);
//函数调用的时候传的参数就是c，d的位置了
console.log(r(3,4));
```

- 原因应该是下面这样

```js
var obj1 = {
    our:function(){
        console.log("zzc");
    },
    job:function(a,b,c,d) {
        a=a||1;
        b=b||1;
        c=c||1;
        d=d||1;
        return a+b+c+d;
    }
};
var obj2 = {
    age:18
};

var r = obj1.job.bind(obj2,1,2)(3,4);
console.log(r);
```

- 用构造函数调用bind是无效的

## 实现 apply、call

> 就是将传入的第一个参数作为函数，将之后的参数传入进行调用
>
> 获取结果后删除第一个参数

```js
Function.prototype.myCall=function(context=window){
      context.fn = this;//此处this是指调用myCall的function
      let args=[...arguments].slice(1); // 获取除所有实参
      let result=content.fn(...args)
      //将this指向销毁
      delete context.fn;
      return result;
}

// context.fn 相当于slice
[].prototype.slice.myCall(newArr,1);

Function.prototype.myApply = function(context=window) {
    context.fn = this;
    let result;
    if(arguments[1]){
        result=context.fn(...arguments[1])
    }else{
        result=context.fn()
    }
    //将this指向销毁
    delete context.fn;
    return result;
}

```

## bind
先看 bind 实现了什么效果

```js

this.name = 'czz'
const obj = {
  name: 'zzc',
  fn() {
    console.log(this.name);
  }
}
obj.fn() // zzc
const { fn } = obj;
fn() // czz
// bind 之后，无论在哪个作用域下调用，this 都是固定的。
const bindObj = fn.bind(obj)
bindObj() // zzc

```
- 实现 bind

```js
// 自己实现 bind
Function.prototype.myBind = function (that,...rest) {
  const self = this; // 保留原 this
  function func(...argu) {
    return self.apply(this instanceof Function?this:that,[...rest,...argu])
  }
  // func.prototype = self.prototype;
  return func
}

this.name = 'cba' 
const obj = {
  name: 'abc',
  fn() {
    console.log(this.name);
  }
}

const {fn} = obj;
const bindFN = fn.myBind(obj) // 返回一个绑定了 obj 的函数
bindFN() // abc

```

## 实现 new

> 生成一个新对象

> 绑定原构造函数的原型对象

> 执行并返回这个新对象

> 如果函数没有返回对象类型Object(包含Functoin, Array, Date, RegExg, Error)，那么new表达式中的函数调用将返回该对象引用。


```js

function New(fn,...res) {
  const o = {}; // 生成新对象
  o.__proto__ = fn.prototype // 绑定构造函数的原型对象
  const obj = fn.apply(o,res) // 传参调用
  if ((typeof obj === "object" || typeof obj === "function") && obj !== null) {
      return obj;
  }
  return o
}
function B(name,age){
  this.name = name
  this.age = age
};
console.log(New(B,'zzc','16').name);
console.log(new B('zzc','16').name);

```

