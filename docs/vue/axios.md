# vue-resource && axios

> vue 是渐进式的框架，就像zepto。本身只是提供了基础的api，请求的功能需要调用插件或者借助第三方的包才能使用。

## vue-resource

> vue 官方提供的ajax插件，但是已经停止维护了。
>
> 不过功能什么的都很全的，可以用用。

- 安装

`npm i vue-resource -S`

[官网地址](https://www.npmjs.com/package/vue-resource)

- 使用

> 引包
>
> `<script src="../node_modules/vue/dist/vue.js"></script>`
>
> `<script src="../node_modules/vue-resource/dist/vue-resource.js"></script>`
>
> 基于vue的插件，所以要在vue包后面引入

1. 通过`this.$http()`使用

- this.$http.请求方式(地址).then(回调)

```js
//直接通过this.$http开启ajax服务
//这个this就是vm实例
//this.$http.get(url).then(res => {})
this.$http
.get("http://vue.studyit.io/api/delproduct/" + id)
.then(function(res){
	if(res.body.status == 0){
	this.getData();
	}
})
```

2. 通过`Vue.http.get().then(res=>{})`

> 用法和上面一样

### post请求

```js
if(this.brandName.trim()){
  this.$http
  .post("http://vue.studyit.io/api/addproduct", {
      //使用vue-resource发送post请求的时候
      //参数需要是一个对象，对象中的属性名就是参数名
      //属性值就是参数值
      name: this.brandName
  }, {
      //如果发送的数据格式是个对象
      //那么需要在设置对象中加上如下的属性
      //将参数的对象以application/x-www-form-urlencoded （表单数据的格式）发送给后台
      emulateJSON: true
  })
  .then(function(res){
      if(res.body.status == 0){
          //如果后台返回添加成功
          //那么我们就重新从数据库中获取所有的列表数据进行展示
          this.getData();
          this.brandName = "";
      }
  })
}
```



## axios

> 第三方的插件包
>
> 不用在vue包之后引入，甚至可以在普通项目中使用

- 安装

`npm i axios -S`

- 官网

[axios](https://www.npmjs.com/package/axios)

### 使用

```js
axios({
  url:地址,
  method:'请求方式',
  data:{数据}
}).then(回调)
```

- 使用get请求直接在url地址后面通过?传参
- 但使用post请求要在data中传入参数
- 因为data中的参数是对象类型的，所以需要搞个中间件
### 默认设置

```js
axios.defaults.timeout = 100000; // 设置请求超时时间

// 设置content-Type
instance.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

// 转换请求参数
axios.defaults.transformRequest = data => {}
```
### 中间件

一般用请求/响应的拦截器

- 请求拦截

```js
axios.interceptors.request.use(config=>{
  // 根据后端需要的数据和请求头信息在这里转换
  return config;
})
```

- 响应拦截

```js
// 响应拦截器
instance.interceptors.response.use(
  // 请求成功
  res => (res.status === 200 ? Promise.resolve(res) : Promise.reject(res)),
  // 请求失败
  (error) => {
    const {
      response,
    } = error;
    if (response) {
      // 请求已发出，但是不在2xx的范围
      // 进行错误处理，比如 401 要授权 等等
      return Promise.reject(response);
    }
    // 在这里处理断网的情况
    return Promise.reject(error);
    // eg:请求超时或断网时，更新state的network状态
    // network状态在app.vue中控制着一个全局的断网提示组件的显示隐藏
    // 关于断网组件中的刷新重新获取数据，会在断网组件中说明
  },
);

```

## 请求方法

常见的请求方式有: `get` `post` `put` `delete` `patch`
在 axios 中使用会有一些区别
比如单独使用的 get post

```js
axios.get('/user', {
  params: { // params 指定 get 的参数
    id: 1
  }
})

axios.post('/user', {
  name: 'Fred',
  age: 12
})
```
### 封装
在项目中我们希望通过相同的传参方式去使用，所以会进行封装。

```js
function reqMethod(method, url, obj) {
  let headers = {};
  if (typeof (obj) === 'string') {
    headers = {'Content-Type': 'application/json;charset=UTF-8'};
  } else if (obj instanceof FormData) {
    headers = {'Content-Type': 'multipart/form-data'};
  } else {
    headers = {'Content-Type': 'application/x-www-form-urlencoded'};
  };
  let modeKey = ['post', 'put'].includes(method.toLowerCase()) ? 'data' : 'params';
  return new Promise((resolve, reject) => {
    const query = {
      method: method.toLowerCase(),
        url,
      [modeKey]: obj || {},
      headers: headers || {}
    }
    axios(query)
    .then(function(response) {
      resolve(response.data, url);
    })
    .catch(function(error) {
      reject(error);
    });
  });
};

```
- 使用

```js
reqMethod('get','http://xxx.com',{ id:1 })
reqMethod('post','http://xxx.com',{ id:1 })
```