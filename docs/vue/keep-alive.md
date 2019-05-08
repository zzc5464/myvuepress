# keep-alive

> 主要用于保留组件状态或避免重新渲染
>
> 也就是说，会保存切换掉的组件，优化性能。
>
> `<keep-alive>` 包裹动态组件时，会缓存不活动的组件实例，而不是销毁它们
>
> 当组件在 `<keep-alive>` 内被切换，它的 `activated` 和 `deactivated` 这两个生命周期钩子函数将会被对应执行。

> `keep-alive` 其实是一个抽象组件，并不会真正的渲染到页面上。

```vue
<keep-alive>
    <component :is='see'></component>
</keep-alive>
<button @click='see = "home"'>切换组件</button>

<script>
  // js
    let vm = new Vue({
        el:'#app',
        data:{
            see:'index',
        },
        components:{
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
</script>
```

```vue
<keep-alive>
    <router-view :is='see'></router-view>
</keep-alive>
```

> **注意:**
>
> 只有切换单个组件才能够缓存。
>
> 所以只有在里面写`v-if`才有用，`v-for` 没有意义。

```html
<keep-alive>
  <comp-a v-if="a > 1"></comp-a>
  <comp-b v-else></comp-b>
</keep-alive>
```

### `keep-alive`的`include` 和`exclude` 

> 用来有条件的缓存切换的组件
>
> 可以写用`，` 分割的字符串、正则、数组
>
> 用字符串分割的不用加`：` 

```html
<!-- 逗号分隔字符串 -->
<keep-alive include="a,b"></keep-alive>
<!-- 正则表达式 要用: -->
<keep-alive :include="/a|b/"></keep-alive>
<!-- 数组 要用: -->
<keep-alive :include="['a', 'b']"></keep-alive>
<!-- 常见的和路由一起用 -->
<keep-alive>
	<router-view></router-view>
</keep-alive>

```


