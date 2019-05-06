
# PHP基础

> 文件以.php后缀结尾，所有程序包含在`<?php 这里是代码 ?>`
> 避免使用中文目录和中文文件名 
>
> php页面无法直接打开需要运行在服务器环境当中

***注意：学习php的目的是辅助学习ajax，因为我们需要了解一点后台的知识。*** 



## php初体验


[phpstrorm下载地址](http://www.jetbrains.com/phpstorm/)



```php
<?php
  	//echo 相当于document.write
    echo "hello world";
?>
```

输入中文乱码问题：如果使用echo输出中文，会乱码。

***在php的语法中，末尾必须加分号，不然就报错了（最后一行可以不加分号）***

```php
<?php
    //content-Type:text/html;返回内容是一个HTML文档，这样设置后，就能识别HTML标签了。
    //charset=utf-8 设置编码集
    header("content-Type:text/html;charset=utf-8");
    echo "hello world";
    echo "<br/>";
    echo "大家好，我是zzc";
?>
```



```javascript
//思考：浏览器访问html文件与访问php文件时，过程是怎么样的？
```



## 变量

> php是一门弱类型语法，变量的类型可以随意改变。
> 变量其实就是存储数据的容器

**变量的命名规则**

```php
//1. 不需要关键字进行声明，变量在第一次赋值的时候被创建。
//2. 必须以$符号开始
//3. $后面的命名规则与js的变量命名规则一致。
$name = "zzc";
echo $name;
```



## 数据类型

### 简单数据类型

**字符串** 

```php
$str = "zzc";
echo $str;
```

**整数** 

```php
$num = 100;
echo $num;
```

**浮点型** 

```php
$float = 11.11;
echo $float;
```

**布尔类型** 

```php
$flag = true;
//当布尔类型值为true时，输出1
echo $flag;
$flag = false;
//当布尔类型为false时，输出空字符串
echo $flag;
```

**php的拼串** 

```php
//1. 在php中，+号只有算数的功能，并不能拼串
//2. 在php中，拼串使用.
$name = "zzc";
echo "大家好，我是" . $name . "，今年18岁";
```

**php中的单引号与双引号**

```php
//1. 字符串的定义可以使用单引号，也可以使用双引号
$name = "zzc";
$desc = '很帅';
//2. 在单引号中，完全当做字符看待
//3. 在双引号中，能够识别变量。如果有变量格式的字符串，可以直接解析

$name = "zzc";//zzc
echo $name;
$desc = '很帅';
echo $desc;//很帅

$str = '$name 很帅';//$name 很帅
echo $str;

$str = "$name 很帅";//zzc 很帅
echo $str;
```



### 数组

> 在php中，数组分为两种，索引数组和关联数组

**索引数组（类似与JS中的数组）**

```php
$arr = array("张飞","赵云","马超");
echo $arr;//echo只能打印基本数据类型
echo $arr[0];//张飞
```

**关联数组（类似与JS中的对象）** 

```php
//属性名必须用引号引起来
$arr = array("name"=>"zhangsan", "age"=>18);
echo $arr["name"];
```

**输出语句** 

```php
//1. echo 输出简单数据类型
//2. print_r 输出数据结构，一般用于输出复杂类型。
print_r($arr);//print_r是一个函数，不要忘记小括号
//3. var_dump 输出完整的数据结构，包括类型，一般用于精准调试
var_dump($arr);
```



### 对象

> 在php以及其他高级语言中，都有类的概念，表示一类对象，跟js中构造函数类似。

**对象我们学习过程中用不到，了解即可。无需深究**

```php
//定义一个类（类似js的构造函数）
class Person {
  public $name = "小明";
  public $age = 12;
  private $sex = "男";
}

$zs = new Person;
print_r($zs);//打印对象的结构信息
echo $zs->name;//对象中取值用 ->
echo $zs->age;
echo $zs->sex;//私有属性，无法获取
```

### 函数

```php
<?php
    header("content-Type:text/html;charset=utf-8");
    //php中函数的语法与js中函数的语法基本一样，不同点在于
    //1. 函数名大小写不敏感
    //2. 函数的参数可以设置默认值
    function sayHello ($name="周杰伦") {
        echo "大家好，我是$name";
        echo "<br>";
    }
    sayHello();//不传参数，会使用默认值
    sayHello("zzc");//传参数，默认值不生效，和less差不多。
?>
```



## 语句

### 判断语句

基本上来说，所有语言的if..else语法都是一样

```php
$age = 17;
if ($age >= 18) {
  echo "终于可以看电影了,嘿嘿嘿";
} else {
  echo "哎，还是回家学习把";
}
```



### 循环语句

**遍历索引数组** 

```php
$arr = array("张三", "李四", "王五", "赵六", "田七", "王八");
//获取数组的长度： count($arr)
for($i = 0; $i < count($arr); $i++) {
  echo $arr[$i];
  echo "<br>";
}
```

**遍历关联数组** 

```php
//遍历关联数组
$arr = array(
  "name"=>"zs",
  "age"=>18,
  "sex"=>20
);
foreach($arr as $key => $value) {
  echo $key . "=" . $value . "<br>";
}
```

## 表单处理

> 表单（form）：表单用于收集用户输入信息，并将数据提交给服务器。是一种常见的与服务端数据交互的一种方式

```javascript
//1. action：指定表单的提交地址
//2. method:指定表单的提交方式，get/post，默认get
//3. input的数据想要提交到后台，必须指定name属性，后台通过name属性获取值
//4. 想要提交表单，不能使用input:button 必须使用input:submit
```

**php获取表单数据** 

```
 //$_GET是系统提供的一个变量，是一个数组，里面存放了表单通过get方式提交的数据。
 //$_POST是系统提供的一个变量，是一个数组，里面存放了表单通过post方式提交的数据。
```



**php相关**

- 文件上传时，`$_GET`与`$_POST`都无法获取到文件信息，通过`$_FILES`才能获取到，这是一个数组。
- 上传文件时，文件会临时保存在服务器上，如果文件最终没有保存，那么临时文件会被删除，保证服务器安全。
- `sleep(10)`可以让代码延迟10秒钟才执行。
- `move_uploaded_file($path, $newPath);`可以保存临时图片

```php
$path = $_FILES['upload']['tmp_name'];
$newPath = "./uploads/test.png";
//第一个参数：临时文件的路径
//第二个参数：保存的文件路径
move_uploaded_file($path, $newPath);

echo "<img src='./uploads/test.png'>";
```



## PHP常用函数

```javascript
//获取数组的长度
echo count($arr);
//判断数组是否包含某个key
echo array_key_exists("name", $arr);
//判断数组是否包含某个值
echo in_array("zs", $arr);
```



## 动态页面

> 静态页面：页面的内容和结构都是写死，不会变化的，是是实实在在存在与服务器上的一个html页面。
>
> 动态页面：页面的内容会根据数据库中的数据变化，存在与服务器端的是一个php或者jsp页面，用户访问时，会实时的进行改变。

### 使用php动态渲染页面

```php
<?php
  //这个属性是可以通过数据库进行获取的
  $person = array(
    "name"=>"zzc",
    "gender"=>"男1",
    "hobby"=>"女1"
  )
?>
<p>姓名：<span><?php echo $person['name'];  ?></span></p>
<p>性别：<span><?php echo $person['gender']; ?></span></p>
<p>爱好：<span><?php echo $person['hobby'] ?></span></p>
```

以前很长一段时间的开发模式就是这样的，前端工程师先把html页面写好，后端程序员把html页面后缀改成php页面，然后将数据渲染出来。

### include

> include （或 require）语句会获取指定文件中存在的所有文本/代码/标记，并复制到使用 include 语句的文件中。包含文件很有用，如果您需要在网站的多张页面上引用相同的 PHP、HTML 或文本的话。

```php
$arr = array('张三','李四','王五','赵六');
include '04-render-for.html';
```


## 总结

我们使用php动态渲染页面时，有很多比较麻烦的地方。

+  在前端写好页面以后，需要后台进行修改，意味这后端程序员也需要懂前端的知识，其实渲染的工作应该交给前端来做。
+  前端没有写好页面的话，后端无法开始工作，需要等待前端的页面完成之后才能开始工作，拖延项目的进度。
+  这种渲染，属于同步渲染，页面加载速度比较慢，会影响后面的内容能够的渲染速度。