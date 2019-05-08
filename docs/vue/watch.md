
# watch

`vue` 实例中的 `watch` ，可以监听数据的变化。

`handler` 监听对象的函数

`deep`表示深层次监听，不是true的话无法监听对象

`immediate`表示立即开始监听

**监听引用类型的对象，只能知道它是否更新了。但无法知道它更新后的值。**

```js
var vm = new Vue({
  el: '#app',
  data: {
      msg: '100',
      person:{
        one:1,
        two:2
      }
  },
  methods: {},
  watch: {
    msg(nv, ov) {
        console.log("监听数据");
    },
    person: {
      handler(nv, ov) {
          console.log('监听对象');
      },
      deep: true,
      immediate: true
    }
  }
})
```

[可以用来监听路由](/vue/router.html#监听路由)