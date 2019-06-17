# 云开发

## 概念总览

api分为小程序端和服务器端，两套 api 都可以直接操作数据库。区别在于服务端可以直接连 wxjdk，以及对数据库的批量增删。
只有服务器端可以直接创建集合
服务端统一只返回 promise

- 数据库

> 前端可以直接操作数据库,也就是在前端做了一层 node 层。如果业务量不大可以前端直接梭哈，无需关心服务器和数据库怎么搭建的。

- 云函数

**可以直接操作数据库为什么还要云函数？**
云函数可以处理一些比较关键的逻辑，比如算钱之类的，它运行在服务端，比较安全。最重要的是它能直接调用微信 sdk 的接口，不用再鉴权那一套了。
或者运算量很大的，如批量删除、新增之类的函数。

- 云调用

> 云调用是云开发提供的**基于云函数**使用小程序开放接口的能力，支持在云函数调用服务端开放接口，如发送模板消息、获取小程序码等操作都可以在云函数中完成

也就是微信提供给小程序的 sdk 接口。

## 开始

云开发一定要用 openid 来创建项目。
在 `project.config.json` 中新增了字段

```json
"cloudfunctionRoot": "cloudfunctions/", // 放云函数的目录，路径自己指定。
```

用 openid 创建项目后进入小程序编辑器，左侧点击**云开发**按钮就可以直接开通云开发。

> 注：AppID 首次开通云环境后，需等待大约 10 分钟方可正常使用云 API，在此期间官方后台服务正在做准备服务，如尝试在小程序中调用云  API 则会报 cloud init error：{ errMsg: "invalid scope" } 的错误

免费可以使用两套环境，一般指定为`dev` 和 `prod`



## 数据库操作

### 基本概念
云开发使用的是类似于 `mongodb` 的数据库
数据的包含关系如下: 

库 -> 集合 -> 记录 -> 字段

比如有一个学校的数据库(db),有一个班级信息表(集合): 

```json
// 学校数据库中的班级集合
[ // 记录
  { 
    "_id": "Wzh76lk5_O_dt0vO", // 字段
    "name": "zzc",
  },
  {
    "_id": "Wzh76lk5_O_dt0v1", // 自动添加的 id
    "name": "ccz",
  }
]
```

### 引用

- 数据库的引用

```js
const db = wx.cloud.database(); // 所有操作数据库的方法都在此
// 如果你想连开发环境的数据库
const db = wx.cloud.database({
  env: 'test-123' // 这个环境名根据创建云开发时的 id 填写
})
```
- 集合的引用

```js
// 获取一个学校的集合，返回的是数组
db.collection('school'); 

// 获取指定集合的某个 id 数据，返回对象
db.collection('school').doc('集合中的某一个 _id') 
```

### 查

```js
db.collection('school').get({
  // 这俩是分页
  skip: 0, // 从头开始取
  limit: 10, // 默认值是 20
}).then(res => {
  // 数据在 res.data
})
```

### 增

```js
//  给 user 表新增一条数据
const user = db.collection('user')
user.add({
  data: {
    name: 'czz',
    age: 11
  }
}).then(res => {
  console.log(res)
})
```

### 改

#### update
顾名思义是根据某个 id 更新里面的记录，除了`_id` 其他都能改
```js
user.doc('dec80a9e5d00b03304189d5d194612e9').update({
  data: {
    name: 'cxx',
    age: Math.floor(Math.random() * 99)
  }
})
.then(res => {
  console.log('update',res)
})

```

- 批量修改的例子

```js

user.where({
  name: 'cxx'
}).get({limit:10}).then(({ data }) => {
  console.log(data)
  data.forEach( (item) => {
    const {_id} = item
    user.doc(_id).update({
      data: {
        name: 'bbc'
      }
    }).then(console.log)
  });
})
```

#### set

不仅能更新数据，还可以在当前 `_id` 没有时变为新增数据。

```js
user.doc('zzc5464').set({
  data: {
    name: '潮',
    age: 25
  }
}).then(console.log)
```

- 批量 set
```js
// 注意 id 一定要为string
const data = ['1','2','3','4','5'];
data.forEach((item) => {
  user.doc(item).set({
    data: {
      name: `新增数据${item}`,
      age: item
    }
  }).then(console.log)
});
```

### 删

- 批量删除

```js

user.where({
  name: 'bbc'
}).get().then(({data}) => {
  console.log(data)
  data.forEach(element => {
    const {_id} = element;
    user.doc(_id).remove().then(console.log)
  });
})

```
### where

之前已经用到过了，就是写查询条件的
不过它支持正则表达式来查询哦

```js
user.where({
  name: /^zzc$/
}).get().then(console.log)

```
### 查询总数
```js

// 查询集合总数
user.count().then(console.log)
user.where({
  name: 'zzc'
}).count().then(console.log)

```

### 排序查询

```js

// 排序查询
user.orderBy('age','asc').get().then(console.log) // 大 -> 小
user.orderBy('age','desc').get().then(console.log) // 反

```

### 返回指定字段

```js

// 只返回指定字段 + _id
user.field({
  name: true
}).get().then(console.log) 

```

### command
> 获取数据库查询及更新指令，列表见 API 列表中的 [command 列表](https://developers.weixin.qq.com/miniprogram/dev/wxcloud/reference-client-api/database/#command)。

之前的`where` 查询数据库，只能用对象的方式，而且值只能为全等才匹配。
使用 command 下的指令可以做条件判断查询。

#### 比较类指令

- `_.eq` 全等

```js
const _ = db.command;

const _ = db.command
user.where({
  age: _.eq('2')
}).get().then(console.log)

```

其余指令用法大多一致，不提供例子了。

- `_.neq` 不等
- `_.lt` 小于
- `_.lte` 小于等于
- `_.gt` 大于
- `_.gte` 大于等于
- `_.in` 在给定的条件内查找

```js

user.where({
  age: _.in([1,50])
}).get().then(console.log)

```

- `_.nin` 在不在给定的条件内查找
- `_.and` 多个条件一起查找

```js
// 大于 25 并小于 100
user.where({
  age: _.gt(25).and(_.lt(100))
}).get().then(console.log)

```

- `_.or` 或

```js
// 大于 25 或小于 -25
user.where({
  age: _.gt(25).or(_.lt(-25))
}).get().then(console.log)

```

#### 更新类指令

- `_.set` 将某字段对象整个更新

比如创建一个 _id为 zzc5465 的人，他有个爱玛士的袋子，并有 1000 块钱。
后来他用 1000 + 爱玛士的袋子，换了一个酷奇的袋子。

```js

user.doc('zzc5465').set({
  data: {
    name: 'test',
    age: 119,
    bucket: {
      money: 1000,
      name: '爱玛士'
    }
  }
}).then(console.log)
user.doc('zzc5465').update({
  data: {
    bucket: _.set({
      name: '酷奇'
    })
  }
}).then(console.log)


```

- `_.remove` 删除某个字段
后来那人的包被偷了，他就没袋子了。
```js

user.doc('zzc5465').update({
  data: {
    bucket: _.remove()
  }
})

```

- `_.inc` 自增某个字段的值

```js

user.doc('zzc5464').update({
  data: {
    age: _.inc(10)
  }
}).then(console.log)

```

- `_.mul` 将某字段乘以值

```js

user.doc('zzc5464').update({
  data: {
    age: _.mul(2)
  }
}).then(console.log)

```
- `_.push` 给为数组格式的字段 push，如果没有则新增此字段

```js
user.doc('zzc5464').update({
  data: {
    // tag:_.push('帅')
    // tag:_.push('帅','酷')
    tag: _.push(['帅','酷'])
  }
}).then(console.log)
```

- `_.pop` 从数组尾部删除
- `_.shift` 头部删除
- `_.unshift` 头部添加

### 获取服务器时间

可以用来新增某些需要时间字段时调用
是 db 下方法，不是集合的。
只能用来给数据库新增，没办法直接用。
储存起来是 `new Date` 格式的时间 `Wed Jun 12 2019 17:15:06 GMT+0800 (CST)`
```js
for (let index = 0; index < 18; index++) {
  user.add({
    data: {
      name: `新增数据${index}`,
      age: index,
      createTime: db.serverDate()
    }
  }).then(console.log)
  
}
```
- 偏移量

可以设置正负时间偏移量，单位是毫秒。

```js
 db.serverDate({
   offset: - (60 * 60 * 1000)
 })
```

### 地理位置
> 使用有特殊的配置

## 储存

云开发提供了一套储存功能的 api，都是可以直接调用。
它们都是由 `wx.cloud` 命名
都可以配置来指定来操作哪一环境的文件


### 上传文件

`wx.cloud.uploadFile`

```js
wx.chooseImage({
  count:1,
  sizeType: ['compressed'],
  success: ({tempFilePaths}) => {
    wx.cloud.uploadFile({ // 上传图片
      cloudPath: 'dev/assets/test.png', // 在云存储中的位置
      filePath: tempFilePaths[0], // 要上传的文件路径
      config: {
        env: 'dev-df536f' // 环境 id
      },
    }).then(console.log)
  }
})

```

### 下载

- 获取临时文件路径

`wx.cloud.downloadFile`

```js

wx.cloud.downloadFile({
  fileID: 'cloud://dev-df536f.6465-dev-df536f/dev/assets/test.png'
}).then(({tempFilePath,statusCode}) => {
  // tempFilePath 临时文件路径
})

```
- 获取真实文件路径，可以是多个

```js

wx.cloud.getTempFileURL({
  fileList: ['cloud://xxx', 'cloud://yyy'],
  success: res => {
    // get temp file URL
    console.log(res.fileList)
  },
  fail: err => {
    // handle error
  }
})

```

### 删除文件

`wx.cloud.deleteFile`

```js
wx.cloud.deleteFile({
  fileList: [], // 批量删除文件
  config: {
    env: '' // 也可以传环境
  }
})
```

## 云函数
只有这一个接口，主要通过参数`name`去指定调用你在云函数文件中编写的函数。
比如我们有个云函数`sum`

- 调用

```js
wx.cloud.callFunction({
  name: 'sum',
  data: {
    a: 10,
    b:20
  }
}).then(res => {
  console.log(res);
})

```