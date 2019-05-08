# 小知识点

## 动态绑定组件 `:is`

> 如果要在一个区域，根据不同条件展示不同的组件。
>
> 可以通过`<component :is='变量'></component>` ，来展示。

```js
let vm = new Vue({
    el:'#app',
    data:{
        see:'index',  // 展示子组件index
    },
    components:{
     // 多个子组件
        home:{
            template:'<div>home组件</div>'
        },
        index:{
            template:'<div>index组件</div>'
        },
        zzc:{
            template:'<div>zzc组件</div>'
        }
    }
})
```















