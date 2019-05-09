# ajax

前端的立身之本

## 跨域的方式

### 安装WampServer
- 安装wampserver，和普通软件安装无差别，除指定安装路径外，其它默认。
- 让电脑同时扮演客户端和服务器

### iframe
- 在还没有XHR的时候，就用这个标签实现异步加载。
```html
    //普通格式
    <iframe src="./myFrame.html"></iframe>

-----------------------分割线--------------------------------------------------
    <form action="./data.php" method="post" target="myframe">
        用户名：<input type="text" name="username"><br>
        密码：<input type="password" name="password">
        <input type="submit" value="提交">
    </form>
    <iframe width="0" height="0" frameborder="0" name="myframe"></iframe>

data.php内容
<?php 
    $username = $_POST['username'];
    $password = $_POST['password'];
    
    //连接数据库
    //添加数据当中
    
    $flag = 1;
    
    if($flag == 1){
        echo '用户名'.$username.'|密码'.$password;
    }else{
        echo 0;
    }
?>
<script type="text/javascript">
    parent.document.getElementById('showInfo').innerHTML = '注册成功！';
</script>
```
- 就是给主页面套一个子页面。

## 原生ajax
> - 即 Asynchronous Javascript And XML

- AJAX 不是一门的新的语言，而是对现有持术的综合利用

- 本质是在HTTP协议的基础上以异步的方式与服务器进行通信
## 使用
1. 定义一个xhr对象，做一下和ie的兼容。
 + 实例化一个XHR对象
2. 调用一个open方法，有三个参数 （准备，但还没做）
 + 用什么方式去提交这个数据
 + 调用地址
 + 异/同步  true/false
3. 执行一下回调
4. 发送
5. 以上四步完成才来做回调函数里的步骤
```javascript
            //初始化
            var xhr = null;
            if(window.XMLHttpRequest){
                xhr = new XMLHttpRequest();
            }else{
                xhr = new ActiveXObject("Microsoft.XMLHTTP");
            }
            //准备好了
            var url = './check.php?username='+username+"&password="+password;
            xhr.open('get',url,false);
            xhr.send(null);
            xhr.onreadystatechange = function(){
              
            }

            
```
- 在回调中做的处理
1. xhr.readyState == 4 
 + 表示已经准备好了
2. xhr.status == 200
 + 表示一切ok
3. xhr.responseText
 + 这里就是我们需要的数据，json格式的
 + xhr.responseXML返回的就是XML格式的数据。
```js
    if(xhr.readyState == 4){
        if(xhr.status == 200){
            alert(1);
            var data = xhr.responseText;
            if(data == 1){
            
            }else if(data == 2){
                
            }
        }
    };
```

### 发送get请求

XMLHttpRequest以异步的方式发送HTTP请求，因此在发送请求时，一样需要遵循HTTP协议。

```javascript
//使用XMLHttpRequest发送get请求的步骤
//1. 创建一个XMLHttpRequest对象
var xhr = new XMLHttpRequest;//构造函数没有参数的情况,括号可以省略
//2. 设置请求行
//第一个参数:请求方式  get/post
//第二个参数:请求的地址 需要在url后面拼上参数列表
xhr.open("get", "08.php?name=hucc");
//3. 设置请求头
//浏览器会给我们默认添加基本的请求头,get请求时无需设置
//4. 设置请求体
//get请求的请求体为空,因为参数列表拼接到url后面了
xhr.send(null);
```

+ get请求,设置请求行时,需要把参数列表拼接到url后面
+ get请求不用设置请求头
+ get请求的请求体为null



### 发送post请求

```javascript
var xhr = new XMLHttpRequest;
//1. 设置请求行 post请求的参数列表在请求体中
xhr.open("post", "09.php");
//2. 设置请求头, post请求必须设置content-type,不然后端无法获取到数据
xhr.setRequestHeader("content-type", "application/x-www-form-urlencoded");
//3. 设置请求体
xhr.send("name=hucc&age=18");
```

+ post请求,设置请求行时,参数列表不能拼接到url后面

+ post必须设置请求头中的content-type为application/x-www-form-urlencoded

+ post请求需要将参数列表设置到请求体中.



### 详解
1. readyState 一共有五个状态 0-4
 + 刚创建完xhr对象为状态0
 + open 和 send 为 1
 + 总的来说就是回调函数内部执行234状态,外面则是0和1;
2. 意思
 + 0:xhr对象创建
 + 1: 已经准备好发送请求
 + 2:已经发送完成
 + 3:已经获取数据,还未解析
 + 4:获取了数据并且解析完了
3. xhr.status == 200 表示访问完成,还有很多其他状态比如404/503...
4. var data = xhr.responseText; 这个就是我们要的data


## 原生ajax的封装
- 思路：
  1. 创建ajax对象
  2. 配置open参数，包含：get/post、url、同/异步
  3. 配置send参数
  4. 回调参数的处理，成功/失败
```JS
function ajax(data){
    //第一步：创建xhr对象
    var xhr = null;
    if(window.XMLHttpRequest){//标准的浏览器
        xhr = new XMLHttpRequest();
    }else{
        xhr = new ActiveXObject('Microsoft.XMLHTTP');
    }
    //第二步：准备发送前的一些配置参数
    var type = data.type == 'get'?'get':'post';
    var url = '';
    if(data.url){
        url = data.url;
        if(type == 'get'){
            //处理url缓存
            url += "?" + data.data + "&_t="+new Date().getTime();
        }
    }
    var flag = data.asyn == 'true'?'true':'false';
    xhr.open(type,url,flag);

    //第三步：执行发送的动作
    if(type == 'get'){
       xhr.send(null);
    }else if(type == 'post'){
       xhr.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
       xhr.send(data.data);
    }

    //第四步：指定回调函数
    xhr.onreadystatechange = function(){
        if(this.readyState == 4){
            if(this.status == 200){
                if(typeof data.success == 'function'){
                    var d = data.dataType == 'xml'?xhr.responseXML:xhr.responseText;
                    data.success(d);
                }
            }else{
                if(typeof data.failure == 'function'){
                    data.failure();
                }
            }
        }
    }

}
```
- 通过传输一个对象来使用封装的ajax
```js
        btn.onclick = function(){
            var param = {
                url:'xx.com',
                type:'get',
                dataType:'json',
                success:function(data){
                    alert(data);
                }
            };
            ajax(param);
        }
```

## jQuery的ajax语法
- $.ajax({});
```js
            $.ajax({
                url:"xx.php",
                //传过来的数据类型:json,html,script....
                dataType:"text",
                type:"get",
                success:function(data){
                    alert(data);
                },
                error:function(e){
                    console.log(e);
                }
            });
```
## 跨域问题
- 跨域就是要获取到别的主机，比如一些功能接口的api
- 详见jsonp.md

### jsonp在jq中写法
```js
    $.ajax({
        type : "get",
        async: false,
        url : "./jsonp.php",
        dataType : "jsonp",
        jsonp: "qwe",
        //传递给请求处理程序或页面的，用以获得jsonp回调函数名的参数名(默认为:callback)
        jsonpCallback:"",
        //自定义的jsonp回调函数名称，默认为jQuery自动生成的随机函数名(类似：jQuery1102016820125747472048_1450147653563(["zhangsan", "lisi", "wangwu"]);)
        success : function(data){
            console.log(data);
        },
        error:function(){
            console.log('fail');
        }
    });
```

## Ajax全局事件

<img :src="$withBase('/assets/js/ajax全局事件.png')" alt="ajax全局事件">


- `ajaxStart`和`ajaxEnd` 都只会调用一次，分别是**请求队列**的头和尾
- 每一个ajax发送前都会触发`ajaxSend`
- 每一个ajax发送完成后都会触发`ajaxSuccess/ajaxError` 和`ajaxComplete`

#### 注册全局事件的写法

```js
$(document).ajaxStart()
```



## axios

vue 项目最常用的 `ajax` 库 ，同时他也支持 `node` 端

[详见](/vue/axios.html#axios)