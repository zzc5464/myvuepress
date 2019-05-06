
## phpStudy介绍

> phpStudy是一个PHP调试环境的程序集成包。
> 该程序包集成最新的Apache+PHP+MySQL+phpMyAdmin,安装非常的简单

<img :src="$withBase('/assets/server/phpstudy.png')" alt="phpstudy.png">



## phpStudy的安装

安装phpStudy，解压双击安装(**非中文路径**)，其它默认安装。

**推荐就安装在默认的目录下，一定不能有中文，否则肯定启动不起来。**

<img :src="$withBase('/assets/server/install.png')" alt="install.png">



## phpStudy的错误解决

如果phpStudy启动发生错误，参数下列几点。

### 关闭iis服务器

如果发现服务器启动不成功，很大原因是端口被占用了，因为windows默认会有一个iis服务器，只需要把iis服务器给禁用了即可。

```javascript
//控制面板-->程序-->程序与功能-->启用或关闭windows功能
```

<img :src="$withBase('/assets/server/iis.png')" alt="iis.png">



### 提示缺少vc9 库文件

在提供的ajax资料库中找到**phpStudy运行库**， 根据自己电脑操作系统的位数安装对应的vc9运行库即可。

<img :src="$withBase('/assets/server/vc9.png')" alt="vc9.png">



### 关闭防火墙

如果希望系统自己的服务器能够被别人访问。需要关闭防火墙。

```javascript
//控制面板--->系统和安全--->Windows 防火墙--->启动或者关闭windows防火墙
```
<img :src="$withBase('/assets/server/fhq.png')" alt="fhq.png">


## phpStudy的配置

### 修改网站目录与默认首页

<img :src="$withBase('/assets/server/index.png')" alt="index.png">

+ 默认首页一般不用修改，业界规范就是index.html作为默认的首页。
+ 修改网站目录时，网站目录一定不能中文，不然apache启动会失败。



### 虚拟主机配置

在一台web服务器上，我们可以通过配置虚拟主机，然后分别设定根目录，实现对多个网站的管理。

具体步骤如下：



**1.找到http.conf文件**

找到470行，去掉`#`号注释

```javascript
# Virtual hosts
Include conf/extra/httpd-vhosts.conf
```



**2.找到`httpd-vhosts.conf`文件**

在目录：D:\phpStudy\Apache\conf\extra下找到httpd-vhosts.conf文件

```javascript
# 默认的虚拟主机
<VirtualHost _default_:80>
  DocumentRoot "C:\www\study"
  <Directory "C:\www\study">
    Options +Indexes +FollowSymLinks +ExecCGI
    AllowOverride All
    Order allow,deny
    Allow from all
    Require all granted
  </Directory>
</VirtualHost>

# Add any other Virtual Hosts below
<VirtualHost *:80>
    ServerAdmin webmaster@dummy-host.example.com
    #根目录
    DocumentRoot "C:\www\show"
    #域名
    ServerName show.com
    #完整域名
    ServerAlias www.show.com
    ErrorLog "logs/dummy-host.example.com-error.log"
    CustomLog "logs/dummy-host.example.com-access.log" common
</VirtualHost>
    
<VirtualHost *:80>
    ServerAdmin webmaster@dummy-host.example.com
    #根目录
    DocumentRoot "C:\www\api"
    #域名
    ServerName api.com
    #完整域名
    ServerAlias www.api.com
    ErrorLog "logs/dummy-host.example.com-error.log"
    CustomLog "logs/dummy-host.example.com-access.log" common
</VirtualHost>
<VirtualHost *:80>
    ServerAdmin webmaster@dummy-host.example.com
    #根目录
    DocumentRoot "C:\www\study"
    #域名
    ServerName study.com
    #完整域名
    ServerAlias www.study.com
    ErrorLog "logs/dummy-host.example.com-error.log"
    CustomLog "logs/dummy-host.example.com-access.log" common
</VirtualHost>


```
