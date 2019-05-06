# 服务器

> 能够提供某种服务的机器（计算机）称为服务器
>
> 能够提供某种服务的人称为服务机

## 服务器软件

> 使计算机具备提供某种服务能力的应用软件，称为服务器软件，
> 通过安装相应的服务软件，然后进行配置后就可以使计算具备了提供某种服务的能力。

常见的服务器软件有：

1. 文件服务器：Server-U、FileZilla、VsFTP等（FTP是File Transfer Protocol文件传输协议）；
2. 数据库服务器：oracle、mysql、SQL server、DB2、ACCESS等；
3. 邮件服务器：Postfix、Sendmail等；
4. **HTTP服务器**：Apache、Nginx、IIS、Tomcat、NodeJS等；



## 服务器类型

1. 按**服务类型**可分为：文件服务器、数据库服务器、邮件服务器、Web服务器等；
2. 按**操作系统**可分为：Linux服务器、Windows服务器等；
3. 按**应用软件**可分为 Apache服务器、Nginx 服务器、IIS服务器、Tomcat服务器、weblogic服务器、WebSphere服务器、boss服务器、 Node服务器等；





## HTTP服务器

即网站服务器，主要提供文档(文本、图片、视频、音频)浏览服务，一般安装Apache、Nginx服务器软件。

HTTP服务器可以结合某一编程语言处理业务逻辑，由此进行的开发，通常称之为**服务端开发**。 

常见的运行在服务端的编程语言包括 php、java、.net、Python、Ruby、Perl等。  



## 服务器总结

1. 服务器说白了就是计算机，通过安装了某些软件，就可以提供某些特定的服务器。
2. 根据服务器软件的功能，名称，安装的系统这些不同的标准，可以对服务器划分成不同的类型。
3. HTTP服务器主要提供网站浏览服务，通常需要结合某种编程语言进行开发，我们通常称之为服务器开发。
4. 专业的服务器与计算机的区别
   1. 稳定性：服务器要求7*24不间断运行。
   2. 性能：服务器能够同时响应更多客户端的请求。
   3. 价格：服务器价格通常比普通计算机贵很多。


# 客户端

> 具有向服务器**索取服务**能力的终端，叫做客户端。

+ 客户端：电脑、平板、手机安装了客户端软件，就可以称为客户端
+ 客户端：安装客户端软件，**索取服务**的一方
+ 服务器：安装服务器软件，**提供服务**的一方



## 客户端软件


对于前端工程师而言，主要接触到的客户端软件就是**浏览器**，当然也可能会涉及大一些app开发。

以浏览器为宿主环境，结合 HTML、CSS、Javascript等技术，而进行的一系列开发，通常称之为**前端开发**。


## 网络基础

### ip地址

所谓IP地址就是给每个连接在互联网上的主机分配的一个32位地址。(就像每部手机能正常通话需要一个号码一样)

通过ip就可以找到具体的某一台计算机。

例 `192.168.1.110`

查看本机IP地址 `ping`、`ipconfig`、`ifconfig`（linux）

```javascript
ping 192.168.1.110  //查看和某个同学的电脑是否连通
```

### 域名

由于IP地址基于数字，不方便记忆，于是便用域名来代替IP地址，域名是一个IP地址的“面具”

查看域名对应的IP地址 `ping`

```javascript
ping jd.com  //可以获取到京东的ip
```

### DNS服务器

DNS（Domain Name System）因特网上作为域名和IP地址相互映射的一个分布式数据库， 能够使用户更方便的访问互联网，而不用去记住能够被机器直接读取的IP数串。

简单的说就是记录IP地址和域名之间对应关系的服务。

查找优先级 本机hosts文件、DNS服务器

ipconfig /flushdns 刷新DNS



<img :src="$withBase('/assets/server/04-DNS解析.gif')" alt="04-DNS解析">



### 端口

端口号是计算机与外界通讯交流的出口，每个端口对应不同的服务。

现实生活中，银行不同的窗口办理不同的业务。

查看端口占用情况 netstat -an

常见端口号 80、8080、3306、21、22



### 本地hosts

> Hosts是一个没有扩展名的系统文件，可以用记事本等工具打开，其作用就是将一些常用的网址域名与其对应的IP地址建立一个关联“数据库”，当用户在浏览器中输入一个需要登录的网址时，系统会**首先自动从Hosts文件中寻找对应的IP地址**，一旦找到，系统会立即打开对应网页，如果没有找到，则系统会再将网址提交DNS域名解析服务器进行IP地址的解析。

## 请求与请求报文

**get请求的请求报文详解** 

```javascript
//--------------------------请求行--------------------------------
// GET  请求方式
// /day02/01.php?username=hucc&password=123456    请求路径+参数（注意点）
// HTTP/1.1 HTTP的版本号
GET /day02/01.php?username=hucc&password=123456 HTTP/1.1

//--------------------------请求头--------------------------------
// Host:主机地址
Host: www.study.com
// HTTP1.1版本默认开启，建立过连接后，TCP连接不会断开，下次连接可以继续使用（底层，不用管）
Connection: keep-alive
//chrome浏览器自己增加的，不用管
Upgrade-Insecure-Requests: 1
//浏览器的代理字符串（版本信息）
User-Agent: Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.96 Safari/537.36
//浏览器端可以接受的类型。
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,`*/*`;q=0.8
//从哪个页面发出的请求
Referer: http://www.study.com/day02/01-login.html
//检查浏览器支持的压缩方式
Accept-Encoding: gzip, deflate, sdch
//浏览器支持的语言，优先中文。
Accept-Language: zh-CN,zh;q=0.8,en;q=0.6

//----------------------------请求体-------------------------------------
//get请求没有请求体，但是参数会拼接到请求行中
```



**POST请求的请求报文** 

```javascript
//-----------------------请求行---------------------------------------------
POST /day02/01.php HTTP/1.1

//-----------------------请求头--------------------------------------------
Host: www.study.com
Connection: keep-alive
//传递的参数的长度。
Content-Length: 29
Cache-Control: max-age=0
Origin: http://www.study.com
Upgrade-Insecure-Requests: 1
User-Agent: Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.96 Safari/537.36
//内容类型：表单数据，如果是post请求，必须指定这个属性。
Content-Type: application/x-www-form-urlencoded
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,`*/*`;q=0.8
Referer: http://www.study.com/day02/01-login.html
Accept-Encoding: gzip, deflate
Accept-Language: zh-CN,zh;q=0.8,en;q=0.6

//------------------------请求体------------------------------------------
username=hucc&password=123456
```



**GET请求与POST请求的对比** 

+ GET请求没有请求体，因为GET请求的参数拼接到地址栏中了
+ POST请求有请求体，就是传递的参数
+ POST请求需要指定content-type属性。



## 响应与响应报文

```javascript
//---------------------状态行（响应行）-------------------------------
//HTTP/1.1  HTTP版本
//200 响应的状态
	//200表示成功
	//304表示读缓存
	//404表示找不到资源
	//500表示服务端错误
HTTP/1.1 200 OK

//----------------------响应头-----------------------------------------------
Date: Thu, 22 Jun 2017 16:51:22 GMT
Server: Apache/2.4.23 (Win32) OpenSSL/1.0.2j PHP/5.4.45
X-Powered-By: PHP/5.4.45
Content-Length: 18
Keep-Alive: timeout=5, max=100
Connection: Keep-Alive
//内容类型，告诉浏览器该如何解析响应结果
Content-Type: text/html;charset=utf-8
//-----------------------响应体------------------------------------------------
用户登录成功
```



通常来说，我们不会用抓包工具来查看请求和响应，太麻烦了，可以直接使用谷歌浏览器来查看请求报文和响应报文。

谷歌浏览器会对报文进行一定的格式化，看起来虽然不是原生的报文，但是使用起来更加的方便简洁。
