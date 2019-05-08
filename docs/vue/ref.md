# ref和$refs
- `ref`是一个属性，可以绑定在vue实例管辖的任意标签中。
- 绑定后可以在实例中通过`this.$refs`调用,是一个对象
- 如果实在要操作dom，最好用这个方式
- 可以做任何形式的传值，但是耦合比较严重最好不要

```html
 <div id='app'>
   //绑定一个ref
        <button ref='btn' @click='getTag'>{{msg}}</button>
    </div>
    <script src='./node_modules/vue/dist/vue.js'></script>
    <script>
        var vm = new Vue({
            el: '#app',
            data: {
                msg: '我是按钮啊'
            },
            methods: {
                getTag() {
                  //按钮点击后就能获得这个标签
                    console.log(this.$refs);
                }
            },
        })
    </script>
```