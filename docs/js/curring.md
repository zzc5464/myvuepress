## 柯里化

- ES5 版

被柯里化函数包裹的函数，在形参未传完之前会提前执行结果，并返回一个能够接受剩余形参的函数

柯里化通过闭包实现

> 柯里化（Currying）是把接受多个参数的函数变换成接受一个单一参数（最初函数的第一个参数）的函数，并且返回接受余下的参数且返回结果的新函数的技术。

**函数柯里化的主要作用和特点就是参数复用、提前返回和延迟执行。**

```js

function curry(fn, args) {
    var length = fn.length; // 生成 curry 函数的形参
    var args = args || []; // 初始化时传进来的参数,必须是数组
    return function(){
        // newArgs 是合并初始化的实参和形参
        newArgs = args.concat(Array.prototype.slice.call(arguments));
        if (newArgs.length < length) { // 如果参数不够，返回一个 curry 的函数
            return curry.call(this,fn,newArgs);
        }else{// 否则执行完毕
            return fn.apply(this,newArgs);
        }
    }
}
function func(a,b,c){ // 一个普通的函数
  return a+b+c;
}
let cf = curry(func)  // 初始化一个 curry 函数
// 调用
cf(1) // 返回 curry 函数
cf(1)(2)(3) // 6
cf(1,2)(3) // 6
```

是否执行完成并返回结果，只取决于初始化的函数是否调用完形参。

如果在初始化的时候传入了实参,那就会被`concat` ，末位淘汰掉最后的参数

```js
let cf2 = curry(func,[10]) // 10即成为第一个参数,c被弃用了
cf2(1,2)(3) // error 传了3 会报错
cf2(1)(2) // 13
```

- es6版本

```js
const curry = (fn, arr = []) => (...args) => (
  arg => arg.length === fn.length
    ? fn(...arg)
    : curry(fn, arg)
)([...arr, ...args])
```

