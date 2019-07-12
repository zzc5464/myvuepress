# 控制台调试技巧

## $

### $

> $相当于一个`document.queryselect`,可以快速的选择需要的元素。
>
> `$('li')  $('.demo')`

## console

### .table

> 可以将数组/对象类型的数据，打印成一个表格展示出来。

### .assert

```js
let flag = false
console.assert(flag,'判断一个变量是否为真')
如果传入的值为false,会打印第二个参数的内容。
并得到报错信息。
```

### .time

```js
// 控制台打印出一个时间段
console.time() // 开始
console.timeEnd()  // 结束
```

### log({})

> 每次打印值的时候，不知道谁是谁。
>
> 可以将变量加到`{}` 中去，其实是用了Es6的对象字面量
>
> `console.log({a,b})`
>
> or
>
> `console.table({a,b})`

## 操作

### H

> 在控制台`element` 中选择想要隐藏的节点,按下`h`键。可以切换当前元素的显示状态。

### 拖动

> 在控制台`element` 中，可以用鼠标拖动任意元素放置到不同位置。
>
> 或者使用`[⌘] + [⬆]  or [⌘] + [⬇]` , 将选中的节点进行小单位的上下。
>
> 调试完后还可以使用 `[⌘] + [z]` 撤回

### NetWork

> 点击某一个请求，右键选择`Replay XHR` 可以重新发送请求。

### Element

> 右键一个element节点，选择`expand recursively` ，可以展开所有的子节点。



## 命令菜单

> `[⌘] + [shift] + [p]`
>
> 可以唤起命令菜单
>
> [功能](https://juejin.im/post/5c0ee12551882545e24ef291)

## await console

> 将console在控制台转化为异步的
>
> 一些有意思的功能

```js
// 看设备的电池信息
console.table(await navigator.getBattery())
// 查看媒体功能
query = {type:'file',audio:{contentType: "audio/ogg"}}
console.table(await navigator.mediaCapabilities.decodingInfo(query))
```

## 样式编辑

[看图例](https://juejin.im/post/5c137ac3f265da617974b675)

## 条件断点

> 当调试for代码的时候，只是想要某一个值运行结果，可以给那个断点添加条件判断
>
> 1. 加断点
> 2. 右击并选择`Edit breakpoint`
> 3. 在弹出的框中输入条件判断

## 快捷键

- `[⌘] + [shift] + [D]` 切换控制台的位置
- `[⌘] + [ [ ] or [ ] ]` 切换控制台的面板

### 

