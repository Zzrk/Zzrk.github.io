# ES6 - Class 的基本语法
## 1. 简介
### 1.1 类的由来
ES6 的 class 可以看作只是一个语法糖，它的绝大部分功能，ES5 都可以做到，新的 class 写法只是让对象原型的写法更加清晰、更像面向对象编程的语法而已。
类的所有方法都定义在类的 prototype 属性上面。
Object.assign() 方法可以很方便地一次向类添加多个方法。
```javascript
class Point {
  constructor(){
    // ...
  }
}

Object.assign(Point.prototype, {
  toString(){},
  toValue(){}
});
```
类的内部所有定义的方法，都是不可枚举的。
ES5 中定义在构造函数原型上的方法（除了 constructor）都是可枚举的。

### 1.2 constructor 方法
constructor() 方法是类的默认方法，通过 new 命令生成对象实例时，自动调用该方法。一个类必须有 constructor() 方法，如果没有显式定义，一个空的 constructor() 方法会被默认添加。
constructor() 方法默认返回实例对象（即 this），完全可以指定返回另外一个对象。
类必须使用 new 调用，否则会报错。这是它跟普通构造函数的一个主要区别，后者不用 new 也可以执行。

### 1.3 类的实例
与 ES5 一样，实例的属性除非显式定义在其本身（即定义在 this 对象上），否则都是定义在原型上（即定义在 class 上）。
> __proto__ 并不是语言本身的特性，这是各大厂商具体实现时添加的私有属性，虽然目前很多现代浏览器的 JS 引擎中都提供了这个私有属性，但依旧不建议在生产中使用该属性，避免对环境产生依赖。生产环境中，我们可以使用 Object.getPrototypeOf 方法来获取实例对象的原型，然后再来为原型添加方法 / 属性。


### 1.4 取值函数（getter）和存值函数（setter）
与 ES5 一样，在“类”的内部可以使用 get 和 set 关键字，对某个属性设置存值函数和取值函数，拦截该属性的存取行为。
存值函数和取值函数是设置在（原型对象的）属性的 Descriptor 对象上的。

### 1.5 属性表达式
类的属性名，可以采用 [ 表达式 ]。

### 1.6 Class 表达式
```javascript
const MyClass = class Me {
  getClassName() {
    return Me.name;
  }
};
```
这个类的名字是 Me，但是 Me 只在 Class 的内部可用，指代当前类。在 Class 外部，这个类只能用 MyClass 引用。
如果类的内部没用到的话，可以省略 Me，也就是可以写成下面的形式。
```javascript
const MyClass = class { /* ... */ };
```
采用 Class 表达式，可以写出立即执行的 Class。
```javascript
let person = new class {
  constructor(name) {
    this.name = name;
  }

  sayName() {
    console.log(this.name);
  }
}('张三');

person.sayName(); // "张三"
```

### 1.7 注意点

1. 严格模式

类和模块的内部，默认就是严格模式，所以不需要使用 use strict 指定运行模式。

2. 不存在提升

类不存在变量提升（hoist），这一点与 ES5 完全不同。

3. name 属性

由于本质上，ES6 的类只是 ES5 的构造函数的一层包装，所以函数的许多特性都被 Class 继承，包括 name 属性。
name 属性总是返回紧跟在 class 关键字后面的类名。

4. Generator 方法

如果某个方法之前加上星号（*），就表示该方法是一个 Generator 函数。

5. this 的指向

类的方法内部如果含有 this，它默认指向类的实例。
```javascript
class Logger {
  printName(name = 'there') {
    this.print(`Hello ${name}`);
  }

  print(text) {
    console.log(text);
  }
}

const logger = new Logger();
const { printName } = logger;
printName(); // TypeError: Cannot read property 'print' of undefined
```
printName 方法中的 this，默认指向 Logger 类的实例。但是，如果将这个方法提取出来单独使用，this 会指向该方法运行时所在的环境（由于 class 内部是严格模式，所以 this 实际指向的是 undefined），从而导致找不到 print 方法而报错。
一个比较简单的解决方法是，在构造方法中绑定 this，这样就不会找不到 print 方法了。
```javascript
class Logger {
  constructor() {
    this.printName = this.printName.bind(this);
  }

  // ...
}
```
另一种解决方法是使用箭头函数。
```javascript
class Obj {
  constructor() {
    this.getThis = () => this;
  }
}

const myObj = new Obj();
myObj.getThis() === myObj // true
```
还有一种解决方法是使用 Proxy，获取方法的时候，自动绑定 this。
```javascript
function selfish (target) {
  const cache = new WeakMap();
  const handler = {
    get (target, key) {
      const value = Reflect.get(target, key);
      if (typeof value !== 'function') {
        return value;
      }
      if (!cache.has(value)) {
        cache.set(value, value.bind(target));
      }
      return cache.get(value);
    }
  };
  const proxy = new Proxy(target, handler);
  return proxy;
}

const logger = selfish(new Logger());
```

## 2. 静态方法
如果在一个方法前，加上 static 关键字，就表示该方法不会被实例继承，而是直接通过类来调用，这就称为“静态方法”。
如果静态方法包含 this 关键字，这个 this 指的是类，而不是实例。
父类的静态方法，可以被子类继承。
静态方法也是可以从 super 对象上调用的。

## 3. 实例属性的新写法
实例属性除了定义在 constructor() 方法里面的 this 上面，也可以定义在类的最顶层。

## 4. 静态属性
```javascript
class Foo {
}

Foo.prop = 1;
Foo.prop // 1
```
目前，只有这种写法可行，因为 ES6 明确规定，Class 内部只有静态方法，没有静态属性。现在有一个[提案](https://github.com/tc39/proposal-class-fields)提供了类的静态属性，写法是在实例属性的前面，加上 static 关键字。
```javascript
// 新写法
class Foo {
  static prop = 1;
}
```

## [5. 私有方法和私有属性](https://wangdoc.com/es6/class.html#%E7%A7%81%E6%9C%89%E6%96%B9%E6%B3%95%E5%92%8C%E7%A7%81%E6%9C%89%E5%B1%9E%E6%80%A7)
私有方法和私有属性，是只能在类的内部访问的方法和属性，外部不能访问。这是常见需求，有利于代码的封装，但 ES6 不提供，只能通过变通方法模拟实现。

子类从父类继承的私有属性，也可以使用 in 运算符来判断。
in 运算符对于 Object.create()、Object.setPrototypeOf 形成的继承，是无效的，因为这种继承不会传递私有属性。

## 6. 静态块
ES2022 引入了[静态块](https://github.com/tc39/proposal-class-static-block)（static block），允许在类的内部设置一个代码块，在类生成时运行一次，主要作用是对静态属性进行初始化。
每个类只能有一个静态块，在静态属性声明后运行。静态块的内部不能有 return 语句。
静态块内部可以使用类名或 this，指代当前类。
静态块还有一个作用，就是将私有属性与类的外部代码分享。
```javascript
let getX;

export class C {
  #x = 1;
  static {
    getX = obj => obj.#x;
  }
}

console.log(getX(new C())); // 1
```

## 7. new.target 属性
new 是从构造函数生成实例对象的命令。ES6 为 new 命令引入了一个 new.target 属性，该属性一般用在构造函数之中，返回 new 命令作用于的那个构造函数。如果构造函数不是通过 new 命令或 Reflect.construct() 调用的，new.target 会返回 undefined，因此这个属性可以用来确定构造函数是怎么调用的。
```javascript
function Person(name) {
  if (new.target !== undefined) {
    this.name = name;
  } else {
    throw new Error('必须使用 new 命令生成实例');
  }
}

// 另一种写法
function Person(name) {
  if (new.target === Person) {
    this.name = name;
  } else {
    throw new Error('必须使用 new 命令生成实例');
  }
}

var person = new Person('张三'); // 正确
var notAPerson = Person.call(person, '张三');  // 报错
```
Class 中子类继承父类时，new.target 会返回子类。
利用这个特点，可以写出不能独立使用、必须继承后才能使用的类。
```javascript
class Shape {
  constructor() {
    if (new.target === Shape) {
      throw new Error('本类不能实例化');
    }
  }
}

class Rectangle extends Shape {
  constructor(length, width) {
    super();
    // ...
  }
}

var x = new Shape();  // 报错
var y = new Rectangle(3, 4);  // 正确
```

# ES6 - Class 的继承
## 1. 简介
extends 关键字
ES5 的继承机制，是先创造一个独立的子类的实例对象，然后再将父类的方法添加到这个对象上面，即“实例在前，继承在后”。ES6 的继承机制，则是先将父类的属性和方法，加到一个空的对象上面，然后再将该对象作为子类的实例，即“继承在前，实例在后”。这就是为什么 ES6 的继承必须先调用 super() 方法，因为这一步会生成一个继承父类的 this 对象，没有这一步就无法继承父类（也无法在 constructor 中使用 this）。
实例对象同时是两个类的实例（instanceof 返回 true），这与 ES5 的行为完全一致。
除了私有属性，父类的所有属性和方法，都会被子类继承，其中包括静态方法。
如果父类定义了私有属性的读写方法，子类就可以通过这些方法，读写私有属性。

## 2. Object.getPrototypeOf()
Object.getPrototypeOf() 方法可以用来从子类上获取父类。
可以使用这个方法判断，一个类是否继承了另一个类。
```javascript
class Point { /*...*/ }

class ColorPoint extends Point { /*...*/ }

Object.getPrototypeOf(ColorPoint) === Point
// true
```

## 3. super 关键字

1. super 作为函数调用时，代表父类的构造函数（只能用在子类的构造函数中，用在其他地方会报错）。

ES6 要求，子类的构造函数必须执行一次 super 函数。
```javascript
class A {}

class B extends A {
  constructor() {
    super();
  }
}
```
super 内部的 this 指的是子类的实例，因此 super() 在这里相当于 A.prototype.constructor.call(this)。

2. super 作为对象时，在普通方法中，指向父类的原型对象（定义在父类实例上的方法或属性无法通过 super 调用）；在静态方法中，指向父类。

在子类普通方法中通过 super 调用父类的方法时，方法内部的 this 指向当前的子类实例。
在子类的静态方法中通过 super 调用父类的方法时，方法内部的 this 指向当前的子类，而不是子类的实例。
都相当于 super.方法名.call(this)
使用 super 的时候，必须显式指定是作为函数、还是作为对象使用，否则会报错（如直接 console.log(super)）。

## 4. 类的 prototype 属性和__**proto__**属性
大多数浏览器的 ES5 实现之中，每一个对象都有__proto__属性，指向对应的构造函数的 prototype 属性。Class 作为构造函数的语法糖，同时有prototype 属性和__proto__属性，因此同时存在两条继承链。
（1）子类的__proto__属性，表示构造函数的继承，总是指向父类。
（2）子类 prototype 属性的__proto__属性，表示方法的继承，总是指向父类的 prototype 属性。
```javascript
class A {
}

class B extends A {
}

B.__proto__ === A // true
B.prototype.__proto__ === A.prototype // true
```
这样的结果是因为，类的继承是按照下面的模式实现的。
```javascript
class A {
}

class B {
}

// B 的实例继承 A 的实例
Object.setPrototypeOf(B.prototype, A.prototype);

// B 继承 A 的静态属性
Object.setPrototypeOf(B, A);

const b = new B();

Object.setPrototypeOf = function (obj, proto) {
  obj.__proto__ = proto;
  return obj;
}
```
extends 关键字后面可以跟多种类型的值。
```javascript
class B extends A {
}
```
上面代码的 A，只要是一个有 prototype 属性的函数，就能被 B 继承。由于函数都有 prototype 属性（除了 Function.prototype 函数），因此 A 可以是任意函数。
```javascript
class A extends Object {
}

A.__proto__ === Object // true
A.prototype.__proto__ === Object.prototype // true
```
第一种，子类继承 Object 类。这种情况下，A 其实就是构造函数 Object 的复制，A 的实例就是 Object 的实例。
```javascript
class A {
}

A.__proto__ === Function.prototype // true
A.prototype.__proto__ === Object.prototype // true
```
第二种，不存在任何继承。这种情况下，A 作为一个基类（即不存在任何继承），就是一个普通函数，所以直接继承 Function.prototype。但是，A 调用后返回一个空对象（即 Object 实例），所以A.prototype.__proto__指向构造函数（Object）的 prototype 属性。
### 4.1 实例的__proto属性
子类实例的__proto__属性的__proto__属性，指向父类实例的__proto__属性。也就是说，子类的原型的原型，是父类的原型。

## [5. 原生构造函数的继承](https://wangdoc.com/es6/class-extends.html#%E5%8E%9F%E7%94%9F%E6%9E%84%E9%80%A0%E5%87%BD%E6%95%B0%E7%9A%84%E7%BB%A7%E6%89%BF)
ECMAScript 的原生构造函数大致有下面这些。

- Boolean()
- Number()
- String()
- Array()
- Date()
- Function()
- RegExp()
- Error()
- Object()

ES6 允许继承原生构造函数定义子类，这是 ES5 不能实现的。
注意，继承 Object 的子类，有一个[行为差异](https://stackoverflow.com/questions/36203614/super-does-not-pass-arguments-when-instantiating-a-class-extended-from-object)。
```javascript
class NewObj extends Object{
  constructor(){
    super(...arguments);
  }
}
var o = new NewObj({attr: true});
o.attr === true  // false
```
上面代码中，NewObj 继承了 Object，但是无法通过 super 方法向父类 Object 传参。这是因为 ES6 改变了 Object 构造函数的行为，一旦发现 Object 方法不是通过 new Object() 这种形式调用，ES6 规定 Object 构造函数会忽略参数。

## [6. Mixin 模式的实现](https://wangdoc.com/es6/class-extends.html#mixin-%E6%A8%A1%E5%BC%8F%E7%9A%84%E5%AE%9E%E7%8E%B0)
