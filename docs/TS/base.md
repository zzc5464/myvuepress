# TypeScript (基础)

> TypeScript 是 JavaScript 的类型的超集，它可以编译成纯 JavaScript。编译出来的 JavaScript 可以运行在任何浏览器上。TypeScript 编译工具可以运行在任何服务器和任何系统上。TypeScript 是开源的。

以下内容均出自于 [TS入门教程](<https://ts.xcatliu.com/>)

## 尝试

 看了之后怎么搭个环境写一写？
 ```
 mkdir demo
 cd demo
 touch 1.ts
 ```
打开vscode，打开控制台，切换到问题 tab

欧了，开始尝试 ts 吧


## 基础类型

### boolean
```ts
let isDone: boolean = false;
// 使用构造函数 Boolean 创造的对象不是布尔值
```

### null & undefined

> 是所有类型的子类型
>
> void类型不能赋值给 number

```js
let u: undefined = undefined;
let n: null = null;
let num: number = undefined;
let u: undefined;
let num: number = u;
```

### void 类型
> 一般表示函数没有返回值。用在变量上没有什么卵用。
```ts
function warnUser(): void {
    console.log("This is my warning message");
}
let a: void = undefined
let a: void = 'undefined' // 报错，这是字符串
```
> 跟它相似的类型还有`undefined` 和 `null`
> 在不开启严格空检查的情况下 `--strictNullChecks`，他们可以赋值给所有已经定义过***其他类型***的变量。
> 也就是说他们是所有类型的子类型
```ts
let a: undefined = undefined
let a: null = null
```


### 数字 number
> TypeScript里的所有数字都是浮点数。 这些浮点数的类型是 number。支持十进制和十六进制字面量二进制和八进制字面量。

```ts
let decLiteral: number = 6;
let hexLiteral: number = 0xf00d;
// ES6 中的二进制表示法
let binaryLiteral: number = 0b1010;
// ES6 中的八进制表示法
let octalLiteral: number = 0o744;
let notANumber: number = NaN;
let infinityNumber: number = Infinity;
```
### 字符串 string
> 单双引`''` `""`，模板字符的都被视为字符串
```ts
let str:string = ''
```

## 数组类型

> 有多种声明数组的方式

-  最简单的方法是使用`类型 + []`来表示数组：
```ts
const arr: number[] = [1,2,3]
const arr2: string[] = ['1','2']
```
- 接口表示数组

```js
interface NumArr {
    [index: number]: number;
}
let numArr: NumArr = [1,2,3];
```

- any 类型数组

```js
let list:any[] = [1,"z",{}]
```


- 元组类型声明

```js
// 表示一个确定数组长度和类型的写法
const arr:[string,number] = ['2',3]
```

- 类数组

就是伪数组的定义

官方已给了各自的定义接口 `Arguments`, `NodeList`, `HTMLCollection`

```js
function sum() {
    let args: IArguments = arguments;
}
```



### 枚举 enum

> js中没有这类型，仿照强类型语言来的。值只能为数字，不定义默认值得情况为从0开始。

```ts
enum Color {Red, Green, Blue}
let c: Color = Color.Green;
// c = 1

enum Number {one = 10, two}
let c: Number = Number.two;
// c = 11
```

## any 类型(任意值)

> 指代所有的类型

```ts
let a: any = '123'
let a = 123; // 不声明默认 any
```


### never
> 表示永远不存在的值,一般会用来写抛出异常或推断为返回值为never的函数。（比如return一个其他的never类型）
```ts
function error(message: string): never {
    throw new Error(message);
}
error('a')
```
### object 类型
> 非简单类型
> 也就是除number，string，boolean，symbol，null或undefined之外的类型。
```ts
function create(o: object | null): void{
  console.log(o);
};
create({ prop: 0 }); // OK
create(null); // OK
create([]); // OK
create('a'); // error
```


## interface 接口

> 在 TypeScript 中，我们使用接口（Interfaces）来定义对象的类型。
>
> 对**对象**的描述
>
> 接口一般首字母大写。
>
> **赋值的时候，变量必须和接口保持一致**。
```js
interface Person {
    name: string;
    age: number;
}

let tom: Person = {
    name: 'Tom',
    age: 25
};
```

### 可选属性

> 不想完全匹配某个接口,通过`?`表示这个属性是可选的
>
> **仍然不允许添加未定义的属性**

```js
interface Person {
    name: string;
    age?: number;
}

let tom: Person = {
    name: 'Tom'
};
```

### 任意属性

> 让接口允许添加任意的属性值
>
> `[propName: string]: any;`

```js
interface Person {
    name: string;
    age?: number;
    [propName: string]: any;
}

let tom: Person = {
    name: 'Tom',
    gender: 'male'
};
```

> 一旦定义了任意属性， 那么确定属性和`?`可选属性都必须是任意属性的**子集**

```js
interface Person {
    name: string;
    age?: number;
    [propName: string]: string;
}

let p:Person = {
    name: 'zzc',
    age: 12, // error ， 定义了 propName 必须将值设定为 string 类型
    gender: 'male' ,
}
```



### 只读属性 readonly

> 相当于是常量了，初次赋值后不能重新赋值
> 做为变量使用的话用 `const`，若做为属性则使用`readonly`。
```ts
interface demo {
  readonly a: string; // readonly定以后不能改值
  b: number
}
let obj: demo = {
  a: 'ss',
  b: 1
}
obj.a = 'aa' // error
obj.b = 2 // success
```
**只读的约束存在于第一次给对象赋值的时候，而不是第一次给只读属性赋值的时候**

```js
interface Person {
    readonly id: number;
}
const tom: Person = {} // error
tom.id = 1 // error,
```

会报两次错，第一个是因为指定了 id，但没有给 id 赋值

第二个错是给只读属性id赋值了

#### ReadonlyArray

> 通过`ReadonlyArray`定义的数组，再也无法改变了。
```ts

let a: number[] = [1, 2, 3, 4];
let ro: ReadonlyArray<number> = [1,2,3];
a[0] = 10 // success
ro[0] = 12; // error!
ro.push(5); // error!
ro.length = 100; // error!
a = ro; // 注意！ 将readonly的值赋值给一个可变得数组也是不行的。
a = ro as Array<any> // 但是可以用断言重写

```



## 函数类型

> 常见的函数声明方式有： 函数声明 & 函数表达式
>
> 用 ts 定义函数要考虑它的输入和输出

- 函数声明方式定义

```js
function sum(a:number,b:number):number{
    return a+b
}
// 形参和实参数量要一致
sum(1) // error
sum(1,2) //3
sum(1,2,3) // error
```

- 函数表达式定义

```js
// 方式 1
let sum = function(a:number,b:number):number {
    return a + b;
}
// 方式二
let sum: (x: number, y: number) => number = function (x: number, y: number): number {
    return x + y;
};
```

方式一中只对等号右侧的匿名函数定义了类型，左边是ts通过类型推论定义出来的

方式二才是给 sum 定义类型，**其中的 `=>` 不是 es6的 `=>` ** ,它用来表示函数的定义，左边是输入类型，需要用括号括起来，右边是输出类型。

因为和 es6箭头函数可能造成混淆，最好用方式一；

### 可选参数

通过`?`给函数定义可选参数

**可选参数后面不允许再出现必须参数了**

如果给参数添加了默认值，ts 会自动识别为可选，且不受上一条规则的限制。

```js
function sum(a:number,b?:number){}
function sum(a?:number,b:number){} // error
function sum(a:number = 1,b:number){} // 默认值，识别为可选，且不报错
```

### ...rest

> 使用…rest获取剩余参数，使用数组类型去定义它
>
> 剩余参数必须是函数的最后一个参数

```js
function (a, ...items:any[]){}
function (...items:any[], a){} // error
```



### 函数的重载

> 重载允许一个函数接受不同数量或类型的参数时，作出不同的处理。
>
> 可以重复定义一个函数的类型

```js
function say(somthing:string):string;
function say(somthing:number):string;
// 以上是函数定义

// 以下是函数实现
function say(somthing:string|number):string|number {
    return somthing
}
```

> 注意，TypeScript 会优先从最前面的函数定义开始匹配，所以多个函数定义如果有包含关系，需要优先把精确的定义写在前面。

## 类型断言

> 类型断言（Type Assertion）可以用来手动指定一个值的类型。
>
> 断定这个变量的类型是啥
>
> **类型断言不是类型转换**
>
> 两种写法
>
> `<类型>值`  or `值 as 类型`
>
> 如果在 tsx 语法中使用，必须用 `as`
- 例子

> 联合类型可以指定一个变量为多种类型，此变量只能访问类型们的共有方法。
>
> 但一些情况下我们必须使用某一类型的方法或属性时，就可以用断言

```js
function say(something:number|string):void{
    alert(something.length) // 联合类型，报错
}
// ==> 使用断言, 在变量前加上 <类型>
function say(something:number|string):void{
    alert( (<string>something).length ) // success
}
```

断言成一个联合类型中不存在的类型是不允许的

```js
function say(something:number|string):void{
    alert(<boolean>something.length) // 联合类型没有 boolean ,error
}
```

## declare 声明

> 第三方库会暴露出一个变量，让我们在项目中直接使用。
>
> 但是 ts 编译时不知道这是啥，编译无法通过。
>
> 此时我们就要用 `declare var`  声明语句来定义他的类型

```js
 // 比如 jquery
$('div') // ERROR: Cannot find name 'jQuery'.

// ==> 使用 declare var 第三方库变量: (参数: string) => 返回类型
declare var $: (selector: string) => any;

$('#foo'); // success
```

> `declare var` 并不是真正的声明一个变量，编译完会删除，仅仅是定义类型。

### 声明文件

>  通常我们会把声明语句放到一个单独的文件（`*.d.ts`）中，这就是声明文件
>
> 声明文件必需以 `.d.ts` 为后缀
>
> 假如仍然无法解析，那么可以检查下 `tsconfig.json` 中的 `files`、`include` 和 `exclude` 配置，确保其包含了 `jQuery.d.ts` 文件。

```ts
// src/jQuery.d.ts

declare var jQuery: (selector: string) => any;
```

> 这只是非模块化项目中使用的例子

### 第三方声明文件

当然，jQuery 的声明文件不需要我们定义了，社区已经帮我们定义好了：[jQuery in DefinitelyTyped](https://github.com/DefinitelyTyped/DefinitelyTyped/tree/master/types/jquery/index.d.ts)。

我们可以直接下载下来使用，但是更推荐的是使用 `@types` 统一管理第三方库的声明文件。

`@types` 的使用方式很简单，直接用 npm 安装对应的声明模块即可，以 jQuery 举例：

```bash
npm i @types/jquery -D
```

可以在[这个页面](http://microsoft.github.io/TypeSearch/)搜索你需要的声明文件。

### 自定义声明文件

> 声明文件有以下方法
>
> - 全局变量：通过 `<script>` 标签引入第三方库，注入全局变量
> - npm 包：通过 `import foo from 'foo'` 导入，符合 ES6 模块规范
> - UMD 库：既可以通过 `<script>` 标签引入，又可以通过 `import` 导入
> - 模块插件：通过 `import` 导入后，可以改变另一个模块的结构
> - 直接扩展全局变量：通过 `<script>` 标签引入后，改变一个全局变量的结构。比如为 `String.prototype` 新增了一个方法
> - 通过导入扩展全局变量：通过 `import` 导入后，可以改变一个全局变量的结构
>
> 这里只记录 npm 导入的方法, 其他请看 [书写声明文件](<https://ts.xcatliu.com/basics/declaration-files.html>)

在给一个第三方库写声明文件之前，先查看这个库有没有声明文件。一般来说，npm 包的声明文件可能存在于两个地方：

1. 跟 npm 包绑在一起, `package.json` 中有`type` 字段，或者有 `index.d.ts` 声明文件。一般常用的包都有了，自己要发布 npm 包的时候最好也绑定在一起。
2. 发布到了@types](http://microsoft.github.io/TypeSearch/) 里,一般这种情况是作者没写，其他人写了发上去的。`npm install @types/foo --save-dev ` 直接通过安装。

如果都没有，才自己写。

声明文件存放的位置是有约束的，一般在两个位置。

1. 在`node_modules`  创建第三方库的声明文件，但这种一般不采纳。一般 `node_modules` 不会随我们的应用发布到服务器|git上。
2. 创建一个`types` 目录来写，要配合` tsconfig.json` 来使用。

```
# 项目结构
├── README.md
├── src
|  └── index.ts
├── types
|  └── foo
|     └── index.d.ts
└── tsconfig.json
```

- 配置

```json
{
    "compilerOptions": {
        "module": "commonjs",
        "baseUrl": "./",
        "paths": {
            "*" : ["types/*"]
        }
    }
}
```



> 不管采用了以上两种方式中的哪一种，我都*强烈建议*大家将书写好的声明文件（通过给原作者发 pr，或者直接提交到 `@types` 里）发布到开源社区中，享受了这么多社区的优秀的资源，就应该在力所能及的时候给出一些回馈。只有所有人都参与进来，才能让 ts 社区更加繁荣。

- export

npm 包写的声明文件 `declare` 不会声明一个全局变量，只有导出的时候才会应用类型声明。

```js
export const name: string; // 简单类型
export function getName(): string; // 函数
export class Animal { // class 声明
    constructor(name: string);
    sayHi(): string;
}

export interface Options { // 接口
    data: any;
}

// ===> 对应使用到项目中
import { name, getName, Animal, Directions, Options } from 'foo';
let myName = getName();
let cat = new Animal('Tom');
let options: Options = {
    data: {
        name: 'foo'
    }
}
```

- 混用 `declare`   `export`

> 通过 declare 定义多个变量，一次性导出

```js
declare const name: string;
declare function getName(): string;
declare class Animal {
    constructor(name: string);
    sayHi(): string;
}

export {
	name,
    getName,
    Animal,
}
```

- 导出默认值

> 只有 `function`、`class` 和 `interface` 可以直接默认导出，其他的变量需要先定义出来，再默认导出
>
> 针对默认导出，一般会把导出语句放在声明文件的最前面。

```js
export default function foo(): string;
export default interface Options {
    data: any
}
export default class Person {
    constructor(name: string);
    sayHi(): string;
}
declare const str:string;
export default str;
```

- #### `export namespace`

> `namespace` 本来是 TS 的模块化方案，随着 es6越来越屌基本已经不在 ts 中使用了。
>
> 但是声明文件中还是很常用的，表示变量是一个**包含了子属性的对象**类型。
>
> 像是`lodash` ,它是个对象，但提供了很多子属性方法如 `lodash.debunce`
>
> 如果对象拥有深层的层级，则需要用嵌套的 `namespace` 来声明深层的属性的类型：
>
> 总的来说,用来导出一个拥有子属性的对象。

```js
export namespace obj {
    const name: string;
    function fn(a:string,b?:nnumber):void;
    class Event {
        say(str:string):void
    };
    // 如果还有包含子属性的对象，就嵌套
    namespace sonObj {
        const foo: string;
    }
}
```

#### 声明合并

> 当一个变量，既是函数又是对象。可以组合多个语句声明。

```js
export function objAndFn(foo:string):any;
export namespace objAndFn {
    function fn(boo:number):void;
    const name:string;
}
```



#### 针对 `commonjs` 规范

用以下方式来导出：

```js
// 整体导出
module.exports = foo;
// 单个导出
exports.bar = bar;
```

在 ts 中，针对这种导出，有多种方式可以导入，第一种方式是 `const ... = require`：

```js
// 整体导入
const foo = require('foo');
// 单个导入
const bar = require('foo').bar;
```

第二种方式是 `import ... from`，注意针对整体导出，需要使用 `import * as` 来导入：

```ts
// 整体导入
import * as foo from 'foo';
// 单个导入
import { bar } from 'foo';
```

第三种方式是 `import ... require`，这也是 ts 官方推荐的方式：

```ts
// 整体导入
import foo = require('foo');
// 单个导入
import bar = require('foo').bar;
```

对于 `commonjs` 规范的库，需要使用 `export = 变量` 的语法写声明文件

准确地讲，`export =` 不仅可以用在声明文件中，也可以用在普通的 ts 文件中。实际上，`import ... require` 和 `export =` 都是 ts 为了兼容 AMD 规范和 commonjs 规范而创立的新语法

```js
export = foo;
declare function foo():string;
declare namespace foo {
    const bar: nnumber;
}
```

## 内置对象

> TS定义了 js 中内置对象的类型，在 [TypeScript 核心库的定义文件](https://github.com/Microsoft/TypeScript/tree/master/src/lib)中。
>
> 包括 ECMAscript、DOM、Bom 等
>
> 这些内置对象的类型在`.ts` 中都可以直接使用

```js
let b: Boolean = new Boolean(1);
let e: Error = new Error('Error occurred');
let d: Date = new Date();
let r: RegExp = /[a-z]/;
let body: HTMLElement = document.body;
let allDiv: NodeList = document.querySelectorAll('div');
document.addEventListener('click', function(e: MouseEvent) {
  // Do something
});
```

> 还会在该内置对象中定位错误

```js
Math.pow(10, '2'); // error 必须是两个 number 型
document.addEventListener('click', function(e) {
    console.log(e.targetCurrent);
    // error,  MouseEvent 类型不存在 targetCurrent属性
});

```

内置对象不包含 Node ，如果要使用

```
npm install @types/node --save-dev
```



## 可索引的类型

> 声明一个可以通过索引去获取值的类型
> 一般用来声明数组或者对象比如 `a[1]` `obj.a` `obj["a"]`
```ts
interface NumberArray {
  [index: number]: number;
}
// 用数字索引
let arr: NumberArray
arr = [1,2,3]
// 或者
arr = {
  0: 0,
  1: 1
}
// 用字符串索引
interface StringObj {
  [index:string]: string
}
let obj: StringObj
obj = {
  a: '1'
}
```

### 
### 继承接口
> 就是让接口可以被复用的一波操作。
> 一个接口可以继承多个接口
```js

interface Fa {
  name: string
}
interface Son extends Fa {
  age: number
}
let obj : Son
obj = {
  name: 'xxx',
  age: 1
}
// or
let obj = <Son>{}
```
> 继承多个
```js
interface Son extends Fa, LaoW{
  age: number
}
```

### 混合类型
> js本身是弱类型，所以有时候会需要一个变量内部包含了多种类型。比如一个对象可以同时作为函数和对象使用，并包含额外的属性。
```ts
interface Blend {
  name: string; // 简单声明一个name值为string
  (age:number): string; // 声明一个键类型number 值类型为string
  fn():void; // 声明一个返回值为空的
}
function getBlend(): Blend {
  let blend = <Blend>function (age:number){};
  blend.name = 'zs';
  blend.fn = function() {};
  return blend
}
```
### 接口继承类

## 类
> 这章是介绍面向对象编程

```ts
class Greeter {
    greeting: string;
    constructor(message: string) {
        this.greeting = message;
        console.log(this.greeting); // world
    }
    greet() {
        return "Hello, " + this.greeting;
    }
}
let greeter = new Greeter("world");
```
### 继承
> 基本继承
> 作为基类的类一般被叫做超类，继承的类叫做派生类
```ts
class Car {
  name: string = '大众';
  by() {
    console.log(this.name);
  }
}
class Baoma extends Car {
  name: string = '宝马'
}
let bm = new Baoma()
bm.by()
```
> 在子类`constructor`构造函数中***必须调用一下super***，它会执行基类的构造函数
> 在子类`constructor`构造函数调用this之前必须先调用super
```js
class FClass {
  name: string = '超类'
  constructor(name: string) { this.name = name; }
  setAge(age:number) {
    console.log(`${this.name} is ${age}`);
  }
}
class SClass extends FClass {
  constructor(name:string) {
    super(name)
  }
}
let f = new SClass('zzc')
f.setAge(20)
```
### 公共，私有与受保护的修饰符
> `public`可以被除自己之外的所以子类访问到
> ts中所有成员默认为`public`
> 当一个成员被标记成`private` 时，无法被外部访问
> 如果类的`constructor`声明成了`private`那就没办法`new` 和继承了。
> `protected` 受保护的，跟`private`基本一样，但它在子类中可以访问；
```ts
class FClass {
  name: string = '超类'
  private constructor(name: string) { this.name = name; }
  setAge(age:number) {
    console.log(`${this.name} is ${age}`);
  }
}
let f = new FClass() // error
class Son extends FClass {} // error
```
> protected  受保护的例子

```ts
class F {
  protected name: string;
  constructor(name: string) { this.name = name; }
  setAge(age:number) {
    console.log(`${this.name} is ${age}`);
  }
}
class Son extends F {
  constructor() {
    super('son')
  }
  getName() {
    super.name // 可以在子类访问
  }
}

let f = new F('super class')
let s = new Son()

console.log(s.name); // 不能在外部访问
console.log(s.getName()); // 但可以通过子类的方法return出来获取到
```
### 在类中使用readonly
> 在类中或者`constructor`都还可以更改`readonly`的值，但在外部就无法更改了。
```ts
class F {
  readonly a:number = 8
  constructor(age:number) {
    this.a = age
  }
}
let f = new F(9)
f.a = 10 // error 无法在外部更改

```
- 参数属性
> 在`constructor`用一句话定义并赋值一个属性
> 只要在参数前面加了**访问限定符**就可以直接给一个属性直接赋值
> `readonly` `protected` `public` `private`
> `static` 是私有的,所以不能加。
```ts
class F {
  readonly a:number = 8
  constructor(readonly b:number) {
    b = 10
  }
}
let f = new F(9)

console.log(f); // {a,b}
```
### 存取器 getter/setters
> 当一个属性只有get方法的时候，它就是只读的。
> 这也是一种外部改变静态属性的方法
```ts
// 当a = 'a' 时，内部的_a才会等于赋的值，否则报错。
class F {
  private _a:string;
  get a():string {
    return this._a
  }
  set a(newA:string) {
    if(newA === 'a') {
      this._a = newA
    }
    else {
      this._a = 'error'
    }
  }
}
let f = new F()

f.a = 'b'
console.log(f);
```
### 静态属性 static
> 它只挂在class本身，而不是通过new实例化后出来的对象
> 所以你可以通过 `类.static属性` 来调用，但不能用`this`
```ts
class F {
    static num: number;
    changeStatic() {
      F.num = 19;
    }
    constructor () {
      this.changeStatic()
      console.log(F.num);
    }
}
let f = new F();
```
### 抽象类 & abstract
> `abstract` 用来定义抽象类 和 在抽象类中定义抽象方法的
> 抽象类就是派生类的一个模板类，一般不会把它实例化，只是给子类继承用的。

```ts
abstract class Animal { // 抽象一个Animal类
    abstract makeSound(): void;  // 抽象一个方法，必须在子类实现它
    move(): void {
        console.log('roaming the earch...');
    }
    constructor () {

    }
}
class Son extends Animal {
  constructor() {
    super()
  }
  makeSound() { // 必须实现抽象类中的方法
    return false
  }
  haha() {
    console.log('error');
    
  }
}

let s:Animal // 可以指定抽象类为一个类型
s.haha() // 如果上面的声明了，那么调用抽象类中不存在的haha方法是不允许

s = new Animal() // 不可以new 抽象类
s = new Son()  //  正确
s.makeSound() // 正确
```
### 高级技巧
### 把类当做接口使用
> 声明类会创建两个东西： 类实例和构造函数。
> 因为类可以创建出类型，所以允许使用接口定义。
```ts
class F {
  a: number;
}


interface S extends F {
  b: number;
}

let s: S = {a:1,b:2}

console.log(s);

```


## 泛型 any
> 泛型就是任何类型
> 一般是想封装一个灵活复用的函数时使用，美中不足的是虽然指定了传参和`return`可以是所有类型，却无法知道传参和`return`是否为同样类型的东西
```ts
function identity(arg: any): any {
    return arg;
}
```
### 类型变量 
> 可以捕获传入的类型(如: `number`)
> `<T>`只是个习惯，里面的字母是随意的`<U> <X> ...`都可以
```ts
// 定义一个包含类型变量的函数
function name<T>(one:T):void {
  console.log(one);
}
// 使用的方式
name<string>('a')// 直接指定类型变量为 string
name(1) // 传入参数，让ts自动判断你要传参的类型
```
### 泛型变量
> 使用泛型的时候一定要明确一点，函数的参数是所有类型。
> 如下代码就是错的，因为它不一定是字符串或者数组
```ts
function name<T>(one:T):void {
  console.log(one.length); // error
}
```
> 如果要声明一个包含任意类型数据的数组
```ts
function name<T>(one:T[]):void {
  console.log(one.length);
}
function name1<T>(one:Array<T>):void{
  console.log(one.length);
}
```
### 泛型类型
> 变量名不用一致，只要数量和类型对应上就行
```ts
function name<T>(one:T):T {
  return one
}
let myName:<U>(one:U) => U = name;
```
### 泛型接口
> 用泛型接口定义一个泛型的函数
```ts
interface demo { // 定义一个带有类型变量参数为arg返回值为类型变量的接口
    <T>(one: T): T;
}
interface demo2 {
  <T>(two:T):void
}

function identity<T>(name: T): T {// 按照上面接口书写匹配的函数
    return name;
}

let myIdentity: demo = identity;// 匹配
let demo2:demo2 = function id2<T>(name:T):void{}
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
### 泛型约束
> 对泛型做一个黑名单限制，相当于加了个条件，除了约束之外的所有类型。
> 书写方式 `<T extends 接口>`。这里的接口就是我们给出的约束条件。
```ts
interface Len {
  length:number
}
function getArr<T extends Len>(arr:T):T {
  console.log(arr.length); // correct
  return arr
}
getArr('2') // correct
getArr(1) // error
// 不继承的情况下，就不能用length
function normalGetArr<T>(arr:T):T {
  console.log(arr.length); // error
  return arr
}
```

- 在泛型约束中使用类型参数
> 就是用一个泛型去约束另外一个泛型
```ts
function getArr(pa:T,k:K):void {
  console.log(pa[k]);
  
}
const arr = [1,2,3,4]
getArr(arr,'a') // error
getArr(arr,0) // correct 1
```

- 在泛型里使用类类型
```ts
function create<T>(c: {new(): T; }): T {
    return new c();
}
```

## 枚举 enum
> 枚举可以定义一些带名字的常量
> 如果不指定值，最前面的key值为0，后面的会每项 + 1
> 如果指定了值，并且为数字，那就在数字的基础上继续往后加
> 如果指定了其他类型的值，其他key必须指定值
> 又有字符串又有数字的枚举叫做 **异构枚举**
```ts
enum CONST {
  Up = 'up',
  Down=11,
  Left, //12
  Right // 13
}

enum ELSE {
  Up = 'up',
  Down=11,
  Left, //12
  Right // 13
}

function demo(...c:CONST[]):void {
  console.log(c); //  ['up',11,12,13]
  
}
function demo2(c:ELSE):void {
  console.log(c) // 'up'
  
}
demo(CONST.Up)
demo2(CONST.Up)
```
### 什么情况下`enum`被视为常量
1. 他是枚举的第一个成员并且没有赋值
```ts
enum Num {
  a // 0
}
```
2. 自己没有初始值，并且上一个值为数字
```ts
enum Num {
  a = 1,
  b // 2
}
```
3. 当这个成员是**常量枚举表达式**
> 那么问题来了什么叫**常量枚举表达式**
> + 它是字符串或者数字字面量
> + 对之前常量值得引用
> + 带括号`()`的枚举表达式
> + 带了一元运算符的
> + 被当做二元运算符`+, -, *, /, %, <<, >>, >>>, &, |, ^`的操作对象，如果求值后为`NaN` || `Infinity`,则编译报错。
```ts
enum Demo {
    // 被视作常量的成员
    A,
    B    = 1 << 1, // 被当做二元运算符
    C   = 1 << 2,
    D  = B | C, // 对之前常量值得引用 
    E = (1+2), // 带括号`()`的枚举表达式 带了一元运算符的
    F = 10 // 它是字符串或者数字字面量
}
```
### 联合枚举与枚举成员的类型
- 字面量枚举成员
> 被定义为字面量枚举成员的情况如下
1. 任何字符串字面量（例如： "foo"， "bar"， "baz"）
2. 任何数字字面量（例如： 1, 100）
3. 应用了一元 -符号的数字字面量（例如： -1, -100）
4. 没有赋值的情况
```ts
enum Demo {
  A = 'a',
  B = 2,
  C = -100,
  D // -99
}
console.log(Demo.D);
```
> 当所有枚举成员都拥有字面量枚举值时，它就带有了一种特殊的语义。
```ts
enum Demo {
  A = 'a',
  G = 'a',
  B = 2,
  C = -100,
  D // -99
}
interface INT {
  str: Demo.A,
  num: number
}
let test:INT = {
  str:Demo.G, // 但是直接指定'a'会报错
  num: 10
}
```
> 枚举里面的成员互相之间会有**联合类型**。互相知道对方的存在。
```ts
enum E {
    Foo,
    Bar,
}

function f(x: E) {
    if (x !== E.Foo || x !== E.Bar) {
        // x只能为 E.Foo，因此没理由再去检查它是否为 E.Bar
        // Error! Operator '!==' cannot be applied to types 'E.Foo' and 'E.Bar'.
    }
}
```
### 运行时的枚举
> 枚举是在运行时真正存在的对象。
```ts
enum E {
  X, Y, Z
}
function f(obj:{X :number}) {
  console.log(obj); 
  // {0: "X", 1: "Y", 2: "Z", X: 0, Y: 1, Z: 2}
}
f(E)
```
### 反向映射
> 可以通过枚举的角标找到枚举的名称
> 不会为字符串枚举成员生成反向映射。
```ts
enum Code {
  A
}
let a = Code.A;  // 角标 0
let Name = Code[a] // 通过0找到 "A"

```
### const枚举
> 常量枚举的代码在编译阶段会被删掉
> 无法被引用
```ts
const enum Code {
  A
}
let a = Code.A;
// let Name = A[a] // error 只能使用字符串文字来访问常量枚举成员。
```
### 外部枚举
> 外部枚举用来描述已经存在的枚举类型的形状。

```ts
declare enum Enum {
  A = 1,
  B,
  C = 2
}
```

## 类型推论
> 如果没有明确的指定类型，那么 TypeScript 会依照类型推论（Type Inference）的规则推断出一个类型。
```ts
let myFavoriteNumber = 'seven';
myFavoriteNumber = 7; // error

// 等价于 ==>
let myFavoriteNumber: string = 'seven';
myFavoriteNumber = 7;
```
**如果定义的时候没有赋值，不管之后有没有赋值，都会被推断成 any 类型而完全不被类型检查**：

```js
let myFavoriteNumber;
myFavoriteNumber = 'seven';
myFavoriteNumber = 7;
```



## 联合类型

> 表示变量可以是多种类型其中的一种
>
> 通过 `|` 分隔

```tsx
let numOrStr : string | number;
numOrStr = 7;
numOrStr = '7';
numOrStr = true; // false
```

>  当调用联合类型的方法时，只能调用俩类型中共有的方法。

```js
let numOrStr : string | number;
numOrStr.length // 报错  length 不是 number 的方法
numOrStr.toString() // 可以
```



## 类型兼容性

> **结构类型**是一种只使用其`key`来描述类型的方式
```ts
interface Named { // 这个叫结构类型
    name: string; // 使用key来描述类型
}
```
> 这和 C# / java等使用**名义类型**的语言不一样。
```ts
// 在ts中，这不会报错。
// 因为ts是通过Named.name来指定类型的。
interface Named { // 这个叫结构类型
    name: string; // 使用key来描述类型
}
let p:Named;
p = new Person()

```
### 关于可靠性的注意事项
> TS的允许某些在编译阶段无法确认其安全性的操作
> 如下,当x = 有name类型的Test接口时。将带有name键的y赋值给x不会报错。
> 函数中也会根据上下文进行推断。
> 这里要检查y是否能赋值给x，编译器检查x中的每个属性，看是否能在y中也找到对应属性。 在这个例子中，y必须包含名字是name的string类型成员。y满足条件，因此赋值正确。
```ts
interface Test {
  name: string
}
let x:Test
let y = {name: '张三',age: 12}
x = y
function Demo(x:Test) {
  console.log(x.name); // 函数会推断出x有name成员
  
}
```
### 比较两个函数
> 两个函数也可以互相赋值，有个规律就是多的不可以赋值给少的。
> 因为js本身就可以忽略多余的参数
```ts
let x = (a: number) => 0;
let y = (b: number, s: string) => 0;

y = x; // OK
x = y; // Error
```
- 返回值
> 同理，少的可以赋值给多的
> 强制源函数的返回值类型，必须与目标函数返回值类型一致
```ts
let x = () => ({name: 'Alice'});
let y = () => ({name: 'Alice', location: 'Seattle'});

x = y; // correct
y = x; // Error
```
### 函数参数双向协变
### 可选参数及剩余参数


### Symbols

> symbols是es6新增的类型，是一个构造函数。
>
> 通过它创建出来的值是不可改变且唯一的，
>
> 可以看做是一个常量,如下:

```ts
let key1 = Symbol('key')
let key2 = Symbol('key')
console.log(key1 === key2); // false
```

> 对象赋值

```ts
let sym = Symbol('sym')
const obj = {
  [sym]: 'C'
}
console.log(obj[sym]);
```



## 配置文件

> `tsconfig.json`文件要声明在项目的根目录。
>
> `tsconfig.json`文件中指定了用来编译这个项目的根文件和编译选项。
>
>  一个项目可以通过以下方式之一来编译：
>
> 1. 不输入文件的情况下调用`tsc`
>
>    - 编译器会一层层往上查找`tsconfig.json`文件。
>    - 且加上`--project 包含tsconfig.json目录`
> 2. 指定了输入文件，会忽略配置。
>

```json
{
    "compileOnSave": true, // 编辑器保存的时候会自动编译一下ts
    "compilerOptions": {
      // 如果不写compilerOptions，ts会启动默认配置
    },
    "files": [
      // path/文件名.ts
    ],
    "include": [
        "src/**/*"
    ],
    "exclude": [
        "node_modules",
        "**/*.spec.ts"
    ]
}
```

> 如果`files`和`include`都没有被指定，编译器默认包含当前目录和子目录下所有的TypeScript文件
>
> `exclude` 可以过滤被`include` 指定的文件
>
> `files` 直接指定的文件，无论如何都会被编译。
>
> `exclude` 不写也会默认排除掉`node_modules`里的文件
>
> `tsconfig.json`文件可以是个空文件，那么所有默认的文件都会以**默认配置选项**编译。
>
> 在命令行上指定的编译选项会覆盖在`tsconfig.json`文件里的相应选项。

### 默认引入的node_modules

>  `@types`，`typeRoots`和`types`
>
>  通过`compilerOptions` 配置`typeRoots`
>
>  如果不指定，默认会编译所有目录下的`node_modules/@types/`
>
>  指定`typeRoots`,则会编译指定目录中的包。
>
>

```json
{
   "compilerOptions": {
       "typeRoots" : ["./typings"]
       // 则回去编译根目录下./typings/ 下的包
       // 如果是单纯的不想编译node_modules/@types/
       // "typeRoots" : []
   }
}
```

### `extends` 继承

> 可以继承ts配置
>
> 关键字为`extends` 和`files、includes`同级 

```json
{
  "extends": "./tsconfig",
  "compilerOptions": {
    "strictNullChecks": false
  }
}
```

## webpack集成

### 安装

```sh
npm install ts-loader --save-dev
```

```js

module.exports = {
    entry: "./src/index.tsx",
    output: {
        filename: "bundle.js"
    },
    resolve: {
        // Add '.ts' and '.tsx' as a resolvable extension.
        extensions: ["", ".webpack.js", ".web.js", ".ts", ".tsx", ".js"]
    },
    module: {
        loaders: [
            // all files with a '.ts' or '.tsx' extension will be handled by 'ts-loader'
            { test: /\.tsx?$/, loader: "ts-loader" }
        ]
    }
};

```