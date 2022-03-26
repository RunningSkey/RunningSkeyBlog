# js 继承的多种模式

先创建一个 Person 父类 供使用

```js
function Person() {
  this.name = name;
  this.age = age;
  this.sayName = function () {
    console.log("我的名字是" + this.name);
  };
}

Person.prototype.eat = function () {
  console.log("我会吃饭");
};
Person.prototype.name = "Person";
```

## 1. 原型链继承

::: tip 原理
子类构造函数的原型对象 prototype 指向 父类的一个实例对象
:::

#### 缺点

- 子类的所有实例 共享父类实例的属性
- 无法向父类构造函数传参数
- 继承单一

#### 优点

- 简单

```js
function Women1(body) {
  this.body = body;
}
Women1.prototype = new Person("张三", 20);
const instance1 = new Women1("美");

console.log(instance1);
instance1.eat();
```

![](/assets/img/5.png)

::: tip 结论
可以看到子类实例 继承了 父类的属性、方法和父类原型上的属性、方法
:::



## 2. 借用构造函数继承(经典继承)

::: tip 原理
在子类构造函数中 临时将父类构造函数中this指向 子类构造函数将要创建的对象 
:::

#### 缺点

- 没有继承 父类原型上的属性、方法 只继承了父类构造函数中的属性、方法
- 每次创建子类实例时 都会调用父类的构造函数(无法复用)

#### 优点

- 可以向父类构造函数传参

```js {2}
function Women2(body,age,name) {
  Person.call(this,age,name);//临时改变this指向 向父类传参
  this.body = body;
}
const instance2 = new Women2("美","刘亦菲",18);

console.log(instance2);
instance2.eat();
```

![](/assets/img/6.png)

::: tip 结论
可以看到子类实例 继承了 父类的属性、方法；
但是没有继承 父类原型上的属性、方法
:::



## 3. 组合继承(原型链继承 + 借用构造函数继承)

::: tip 原理
结合原型链继承和借用构造函数继承 
:::

#### 缺点

- 调用了连词父类的构造函数
- 重写了子类的构造函数

#### 优点

- 可以向父类构造函数传参
- 可以继承父类的属性、方法和父类原型上的属性、方法

```js {2,5}
function Women3(body,age,name) {
  Person.call(this,age,name);//借用构造函数继承
  this.body = body;
}
Women3.prototype = new Person("张三",20);//原型链继承
const instance3 = new Women3("美","刘亦菲",18);

console.log(instance3);
instance3.eat();
```

![](/assets/img/7.png)

::: tip 结论
可以看到子类实例 继承了 父类的属性、方法和父类原型上的属性、方法；
而且可以重新传参
:::





## 4. 原型式继承(实例继承)

::: tip 原理
基于原型链继承 封装成一个函数返回
:::

#### 缺点

- 同原型链继承

#### 优点

- 创建子类时不用关注子类的类名
- 其他同原型链继承

```js
function createInstance(obj,body){
  function Women4(body) {
    this.body = body;
  }
  Women4.prototype = obj;
  return new Women4(body);
}

const sup = new Person("张三",20);
const instance4 = createInstance(sup,"美");

console.log(instance4);
instance4.eat();
```

![](/assets/img/8.png)
 
::: tip 结论
可以看到子类实例 继承了 父类的属性、方法和父类原型上的属性、方法；

它和原型链继承一样
:::

::: warning 提示
es5 增加的[Object.create()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/create) 是原型式继承的实现
:::



## 5. 寄生式继承

::: tip 原理
基于原型式继承 再封装一个函数 增强对象的属性 再返回新的对象
:::

#### 缺点

- 同原型式继承

#### 优点

- 同原型式继承
- 可增强实例属性

```js {13,14}
function createInstance2(obj,body){
  function Women5(body) {
    this.body = body;
  }
  Women5.prototype = obj;
  return new Women5(body);
}

const sup2 = new Person("张三",20);

function subObject(sup,body){
  const newObj = createInstance2(sup2,obj);
  //增强对象属性
  newObj.name = "刘亦菲";
  return newObj;
}

const instance5 = subObject(sup2,"美");

console.log(instance5);
instance5.eat();
```

![](/assets/img/9.png)
 
::: tip 结论
可以看到子类实例 继承了 父类的属性、方法和父类原型上的属性、方法；

它和原型链继承、原型式继承一样，子类实例继承了父类实例的无用属性
:::



## 6. 寄生组合式继承

::: tip 原理
通过寄生式实现继承，通过借用构造函数来继承属性
:::

#### 缺点

- 同原型式继承

#### 优点

- 同原型式继承
- 可增强实例属性
- 子类实例不用继承父类实例的无用属性

```js {7,10,11,14,15}
function createInstance3(obj){
  function Women6() {
  }
  Women6.prototype = obj;
  return new Women6();
}
const con = createInstance3(Person.prototype);//原型式继承

function Sub(age,name){
  //借用构造函数
  Person.call(this,age,name);//子类就继承了父类的构造函数的属性
}

Sub.prototype = con;//子类继承了父类的实例,父类的原型对象
con.constructor = Sub;//修复con.constructor 指向


const instance6 = new Sub(18,"刘亦菲");
const instance7 = new Sub(19,"刘亦菲2");

console.log(instance6,instance7);
instance6.eat();
```

![](/assets/img/10.png)
 
::: tip 结论
可以看到子类实例 继承了 父类的属性、方法和父类原型上的属性、方法；

它和原型链继承、原型式继承一样
但是他并不用继承父类实例的无用属性

目前是最理想的继承模式
:::


## 7. es6继承

```js
class Women7 extends Person{
  constructor(age,name,body){
    super(age,name);
    this.body = body;
  }
}

const instance8 = new Women7('刘亦菲',18,'美');
console.log(instance8);
instance8.eat();
```
![](/assets/img/11.png)
::: tip 结论
es6 继承可以说是寄生组合式的官方实现 但是他们之间还是有区别
:::

## es5继承和es6继承的区别

::: warning 差异
es5的继承实质： 
1. 先创建子类的实例对象
2. 再将父类的方法添加到子类实例对象上 (Person.call(this))

es6的继承实质是：
1. 先创建父类的实例对象this
2. 再在子类的构造函数内添加this对象 (子类构造函数无this对象)
所以必须先调用super()方法
:::