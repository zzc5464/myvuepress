# 面试题

## 实现 Promise

```js
function myPromise(constructor) {
  const that = this;
  that.status = 'pending';
  that.successVal = undefined; // 成功时返回值
  that.errorVal = undefined; // 失败时返回值
    
  function resolve(value) {
    if(that.status === 'pending') { // 这里的判断表示状态不可逆
      that.status = 'success';
      that.successVal = value;
    }
  }
  function reject(error) {
    if(that.status === 'pending') {
      that.status = 'fail';
      that.errorVal = error;
    }
  }

  //捕获构造异常
  try{
      constructor(resolve,reject);
  }catch(e){
      reject(e);
  }
}
// 指定原型上的 then 方法，根据状态返回响应结果
myPromise.prototype.then = function (onFullfilled,onRejected) {
     let self=this;
   switch(self.status){
      case "success":
        onFullfilled(self.successVal);
        break;
      case "fail":
        onRejected(self.errorVal);
        break;
      default:       
   }
}

var p=new myPromise((resolve,reject) => {resolve(1)});
p.then((x) => {console.log(x)}) // 1
```




> 防抖(Debouncing)和节流(Throttling)

> 这俩都是为了处理高频事件，比如鼠标的连续点击、页面大小缩放、onscorll 等

## 防抖

调用间隔少于传入的限制时间，前一个调用函数失效。

```js
function debounce(fn,wait=50) {
    let timer;
    return function() {
        if(timer) clearTimeout(timer)
        timer = setTimeout(()=> {
            fn.apply(this,arguments)
        },wait)
    }
}
function say(name) {
  console.log('zzc');
  
}
const debounceSay = debounce(say,500);

debounceSay();
debounceSay();
debounceSay();// 仅此生效
```



## 节流

> 让一个函数在固定的时间间隔调用。
>
> 比如指定为1秒内可调用一次，那么在一秒内不会再执行任何次数

```js
function throttle(fn, wait) {
  let prev = new Date();
  return function () {
    const args = arguments;
    const now = new Date();
    if ( (now - prev) > wait) {
      fn.apply(this, args);
      prev = new Date();
    }
  }
}
```
