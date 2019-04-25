## TS 进阶

## 类型的别名 `type`

```js
type strAria = string; // 给 string 类型定义了 strAria别名
const str: strAria = 'abc';

type fnAria = () => string;
function (callback:fnAria):void {
    callback();
}
```

## 字符串字面量类型

```js
type EventName = 'xm' | 'xh' | 'xb';
const str : EventName = 'xb'
const elseStr : EventName = 'xf' // error, 不在这几个名字当中
```

我们使用 `type` 定了一个字符串字面量类型 `EventNames`，它只能取三种字符串中的一种。

注意，**类型别名与字符串字面量类型都是使用 type 进行定义。**

## 元组

> 一个带有不同值的数组

```js
let confusion: [string,number] = ['a',1]; // 这就叫元组
```



```js
let confusion: [string, number];
confusion[0] = 'a'; // 可以只赋值给某一项
confusion[1] = 'b' // error , 元组的第2项必须为 number

// 如果直接给元组赋值，要完全提供其定义好的类型和长度
confusion = ['a',1]
```

## 越界的元素

当添加越界的元素时，它的类型会被限制为元组中每个类型的联合类型：

```ts
let xcatliu: [string, number];
xcatliu = ['Xcat Liu', 25]; // ok
xcatliu.push('http://xcatliu.com/'); // ok
xcatliu.push(true); // error, 不能添加非字符串和 number 的值
```

## 枚举 Enum

> 用于定义一个类型的值在一定的范围内
>
> 使用 `enum` 定义枚举
>
> 枚举的成员从0开始递增，并且key 和 value 会互相映射

```js
enum Colors { Red, Yellow, Blue }
Colors['Red'] === 0 // true  从0开始递增
Colors[0] === 'Red' // 相互映射

// 枚举事实上会编译成如下
var Color;
(function (Color) {
    Color[Color["Red"] = 0] = "Red";
    Color[Color["Yellow"] = 1] = "Yellow";
    Color[Color["Blue"] = 2] = "Blue";
})(Color || (Color = {}));
```

- 手动赋值

枚举的值是可以二次赋值的，被重新赋值的后一项会接着上一项的key递增

如果两个枚举值重复了，不会报错，但是值会被覆盖

可以为小数或者负数，递增步数仍然为 1

配合断言，可以让枚举不是数字

```js
enum Colors { Red = 1, Yellow, Blue }
Colors['Red'] = 2 // 重新赋值
Colors['Yellow'] // 3 下一项 + 1

Colors['Yellow'] = 1 // 此时 Red 和 Blue 值重复了， Colors[2] 只会取最后的值，因为覆盖了。
console.log(Colors[2] === "Red"); // false
console.log(Colors[2] === "Blue"); // true

// 负数
Colors['Red'] = 2.1
Colors['Yellow'] // 3.1
```

- 断言

```js
enum Colors { Red = 1, Yellow, Blue = <any>"S" }
Colors['Blue'] // 'S'
```

### 计算所得项

> 上面我们使用的枚举都是常数项
>
> 计算所得项就是通过计算赋值的枚举，只在编译阶段求值

```js
enum Colors { Red = 1, Yellow, Blue = 1 + 1 }

// 由于编译时求值 计算所得项的后一项如果没有赋值，会因为无法获得初始值报错
enum Colors { Red = 'asdasd'.length, Yellow, Blue } // error 

```

当满足以下条件时，枚举成员被当作是常数：

- 不具有初始化函数并且之前的枚举成员是常数(**单纯声明的时候**)。在这种情况下，当前枚举成员的值为上一个枚举成员的值加 `1`。但第一个枚举元素是个例外。如果它没有初始化方法，那么它的初始值为 `0`。
- 使用常数**枚举表达式初始化**。常数枚举表达式是 TypeScript 表达式的子集，它可以在编译阶段求值。当一个表达式满足下面条件之一时，它就是一个常数枚举表达式：
  - 数字字面量  =>  Red = 1
  - 引用之前定义的常数枚举成员（可以是在不同的枚举类型中定义的）如果这个成员是在同一个枚举类型中定义的，可以使用非限定名来引用
  - 带括号的常数枚举表达式
  - `+`, `-`, `~` 一元运算符应用于常数枚举表达式
  - `+`, `-`, `*`, `/`, `%`, `<<`, `>>`, `>>>`, `&`, `|`, `^` 二元运算符，常数枚举表达式做为其一个操作对象。若常数枚举表达式求值后为 NaN 或 Infinity，则会在编译阶段报错

所有其它情况的枚举成员被当作是需要计算得出的值。

- 被当成是常量的例子

```js
enum Colors { Red, Yellow, Blue }
// Colors['Red'] ==> 0 Colors['Yellow'] ==> 1 Colors['Blue'] ==> 2

enum Directions { 
	Up = 996,
    Down = Up,
    Left = Colors['Red'],
    Right = (1 + 1),
    UpLeft = 2 % 1,
    DownLeft = 'a' - 1， // 结果 NaN 报错
}
```

### 常数枚举

使用 `const enum` 定义的枚举

常数枚举与普通枚举的区别是，它会在编译阶段被删除，并且不能包含计算成员。

```js
const enum Color {Red, Green, Blue = "blue".length};// error 不能包含计算成员
```

## 外部枚举

使用 `declare enum` 定义的枚举类型

`declare` 定义的类型只会用于编译时的检查，编译结果中会被删除。

外部枚举与声明语句一样，常出现在声明文件中。

同时使用 `declare` 和 `const` 也是可以的：

## 类与接口 implements

类用于面向对象

接口用于对象形状的描述

不同的类之间某一部分可能行为一致，那么为了不重复写两个一样的接口，可以使用` implements` 实现重用`interface`

`implements` 中文译为 "实现"

比如有个狗类，有个猫类，它们都有 eat 这个方法，实现的形状一致

```js
interface Behavior {
    eat(food: string): void
}

class Dog implements Behavior {
  eat(foot) {}    
}
class Cat implements Behavior {
  eat(foot) {}
}

class habaDog extends Dog implements Behavior {
  // 此时哈巴狗继承了狗类，就有了 eat 方法   
}
```

- 多个实现

```js
interface Behavior { // 行为接口
  eat(food: string): void
}

interface Appearance { // 外表接口
  fur:string
}

class Dog implements Behavior {
  eat(foot) {}    
}

class habaDog extends Dog implements Behavior, Appearance {
    fur = ''  
}
```

### 接口继承

> 接口也是可以继承接口的
>
> 继承老爸姓名

```js
interface Fa {
  surname: string
}

interface Son extends Fa {
  name: string
}

const obj: Son = {
  surname : 'z',
  name: 'zc'
}
```

### 接口继承class

> 用于将某个 class 定义为类型，并往上再添加类型。

```js
class Fa {
  constructor() {}
  suck(){

  }
}

interface Son extends Fa {
  suck():void;
  name: string;
}

```

## 泛型

> 指在定义函数、接口或类的时候，不预先指定具体的类型，而在使用的时候再指定类型的一种特性。
>
> 使用 `<T>` 代表类型的变量, T 只是约定用法，可以任意指定。

```js

function getArrVal<T>(something:T):Array<T> {
  return [something];
}

getArrVal<string>('z') // ['z'] 使用时再指定类型
getArrVal('z') // 不写也没事 ts 会推论出来

// 接口型定义
interface Test<T> {
  num : T
}
let o : Test<string> = {
  num: '1'
}
```

- 可以一次性定义多个泛型

```js
interface Test<T,U> {
  name?: T,
  num : U
}
let o : Test<string,number> = {
  num: 1
}

function Test<T,U> (a:T,b:U):void { // 函数定义
  console.log(a,b);
  
}
Test<string,number>('1',1)
```

### 泛型约束

泛型无法知道具体的类型，所以无法操作它的属性和方法

```js
function Test<T> (a:T):void {
  console.log(a.length);  // error
}
Test<string>('1')
```

当你明确知道泛型中有哪些属性方法时，可以通过 `extends` 进行泛型约束,写在声明函数名的后面

```js
interface hasLengthProp {
    length : number;
}
function Test<T extends hasLengthProp>(a:T):void {
    console.log(a.length);
}
```

- 泛型可以约束泛型

相当于泛型的继承

```js
function test<T extends U,U>(a:T,b:U):void {
    console.log(a);
}

test({a:1,b:2,c:3},{a:1,b:2})
```

### 泛型接口

在接口中定义泛型,如果接口中只定义了一个匿名函数的类型，直接赋值即可。

```js
interface Test {
  <T>(name:T):void
}
let say:Test; // 直接赋值

say = function<T>(name:T):void {
  console.log(name);
}
say('haha')
```

如果接口中包含多个属性，这个接口就是一个对象的描述

```js
interface Test {
  demo<T>(name:T):void;
  a:string;
}
let say:Test; // 对象的描述

say.demo = function<T>(name:T):void {
  console.log(name);
}
say.demo('haha')
```

### 泛型类

> 就是在泛型里面使用类型变量
> 类那节说过，类有两部分：静态部分和实例部分。 **泛型类指的是实例部分的类型**，所以类的静态属性不能使用这个泛型类型
```ts
class Name<T>{
  num:T;
  constructor(num:T) {
    this.num = num
  }
  add:(x:T,y:T) => T;
}
let addName = new Name<number>(10)
addName.num = 10
addName.add = (x:number,y:number) => {
  return 1+2
}
```

### 泛型默认值

> 当代码中没有直接指定，并且类型推论也没有成功时，默认值会生效

```js
function say<T = any>(name: T):void {
    alert(name)
}
say<string>('1') // ok
say(true) // ok
```

## 声明合并

就是说声明两个同样的接口、类或者函数，会进行合并操作。

**合并的属性的类型必须是唯一的**

```js
interface Alarm {
    price: number;
     alert(s: string): string;
}
interface Alarm {
    weight: number;
    alert(s: string, n: number): string;
}
===> 相当于
interface Alarm {
    price: number;
    weight: number;
   	alert(s: string, n: number): string;
}
```

